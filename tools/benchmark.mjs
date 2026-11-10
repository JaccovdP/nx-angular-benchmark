#!/usr/bin/env node
// Standalone: copy this file outside the repository; no npm dependencies required.
import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { access, mkdir, readFile, readdir, realpath, rm, lstat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { parseArgs } from 'node:util';

export function inside(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

export function options(args) {
  const { values } = parseArgs({
    args, options: {
      repo: { type: 'string', default: 'https://github.com/JaccovdP/nx-angular-benchmark.git' },
      ref: { type: 'string', default: 'main' },
      work: { type: 'string' }, report: { type: 'string' },
      parallel: { type: 'string', default: '2' },
      'sample-ms': { type: 'string', default: '1000' },
      help: { type: 'boolean', default: false },
    },
  });
  if (values.help) return values;
  for (const [key, min] of [['parallel', 1], ['sample-ms', 100]]) {
    if (!/^\d+$/.test(values[key]) || !Number.isSafeInteger(Number(values[key])) || Number(values[key]) < min) {
      throw new Error(`--${key} must be an integer >= ${min}`);
    }
  }
  if (values.ref.startsWith('-') || /[\r\n\0]/.test(values.ref)) throw new Error('Invalid git ref');
  // Credentials belong in the git credential helper, never in the report or argv.
  if (!/^https:\/\/[^/@:]+(?:\/[^?#]+)+$/.test(values.repo) &&
      !/^git@[^:]+:[^?#]+$/.test(values.repo)) {
    throw new Error('--repo must be a credential-free HTTPS or git@host:path URL');
  }
  const run = `nx-benchmark-${Date.now()}-${randomUUID().slice(0, 8)}`;
  values.work = path.resolve(values.work ?? path.join(os.tmpdir(), run));
  values.report = path.resolve(values.report ?? path.join(process.cwd(), `${run}.md`));
  if (!values.report.endsWith('.md')) throw new Error('--report must end with .md');
  if (inside(values.work, values.report) || inside(values.work, process.cwd()) ||
      inside(values.work, fileURLToPath(import.meta.url))) {
    throw new Error('Report, runner and current directory must be outside --work');
  }
  values.parallel = Number(values.parallel);
  values['sample-ms'] = Number(values['sample-ms']);
  return values;
}

const cpu = () => os.cpus().reduce((sum, item) => {
  sum.idle += item.times.idle;
  sum.total += Object.values(item.times).reduce((a, b) => a + b, 0);
  return sum;
}, { idle: 0, total: 0 });

async function diskSnapshot() {
  if (process.platform !== 'linux') {
    return { unavailable: 'Block-device I/O sampler is Linux-only; disk metrics unavailable on this platform.' };
  }
  const devices = (await readdir('/sys/block')).filter((name) => !/^(loop|ram|dm-|md)/.test(name));
  const lines = (await readFile('/proc/diskstats', 'utf8')).trim().split('\n');
  let bytes = 0;
  for (const line of lines) {
    const fields = line.trim().split(/\s+/);
    if (devices.includes(fields[2])) bytes += (Number(fields[5]) + Number(fields[9])) * 512;
  }
  if (!devices.length) return { unavailable: 'No eligible block devices in /sys/block.' };
  return { bytes, devices };
}

export async function sampler(interval) {
  const samples = [];
  const warnings = new Set();
  let previous = cpu();
  let disk;
  try { disk = await diskSnapshot(); } catch (error) { warnings.add(`Disk sampler: ${error.message}`); }
  if (disk?.unavailable) warnings.add(disk.unavailable);
  function sample() {
    const next = cpu();
    const elapsed = next.total - previous.total;
    samples.push({
      cpu: elapsed > 0 ? 100 * (1 - (next.idle - previous.idle) / elapsed) : null,
      ram: os.totalmem() - os.freemem(),
    });
    previous = next;
  }
  const timer = setInterval(sample, interval);
  return async () => {
    clearInterval(timer);
    sample();
    let diskBytes = null;
    try {
      const end = await diskSnapshot();
      if (disk?.bytes !== undefined && end.bytes !== undefined &&
          disk.devices.join() === end.devices.join() && end.bytes >= disk.bytes) {
        diskBytes = end.bytes - disk.bytes;
      } else if (process.platform === 'linux') warnings.add('Disk device set changed or counters unavailable.');
    } catch (error) { warnings.add(`Disk sampler: ${error.message}`); }
    const cpuSamples = samples.map((s) => s.cpu).filter((n) => n !== null);
    return {
      samples: samples.length,
      cpuMean: cpuSamples.length ? cpuSamples.reduce((a, b) => a + b, 0) / cpuSamples.length : null,
      cpuPeak: cpuSamples.length ? Math.max(...cpuSamples) : null,
      ramMean: samples.reduce((sum, s) => sum + s.ram, 0) / samples.length,
      ramPeak: Math.max(...samples.map((s) => s.ram)),
      diskBytes, diskDevices: disk?.devices, warnings: [...warnings],
    };
  };
}

async function npmCommand() {
  const candidates = [path.dirname(process.execPath), ...(process.env.PATH ?? '').split(path.delimiter)];
  for (const directory of candidates) {
    const cli = path.join(directory, 'node_modules', 'npm', 'bin', 'npm-cli.js');
    try { await access(cli); return [process.execPath, cli]; } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error;
    }
  }
  if (process.platform !== 'win32') return ['npm'];
  throw new Error('Cannot locate npm-cli.js beside Node or PATH entries. Install standard Node with npm.');
}

export async function removeOwnedClone(work, token) {
  const owner = JSON.parse(await readFile(path.join(work, 'owner.json'), 'utf8'));
  if (owner.token !== token || owner.work !== work) throw new Error('Cleanup ownership check failed');
  if ((await lstat(work)).isSymbolicLink() || await realpath(work) !== work) {
    throw new Error('Cleanup refused: work directory is a link or moved');
  }
  const clone = path.join(work, 'checkout');
  let stat;
  try { stat = await lstat(clone); } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }
  if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error('Cleanup refused: checkout is not an owned directory');
  await rm(clone, { recursive: true, force: false, maxRetries: 5, retryDelay: 1000 });
}

const display = (n, digits = 2) => n === null || n === undefined || !Number.isFinite(n) ? 'unavailable' : n.toFixed(digits);
const cell = (s) => String(s).replaceAll('|', '\\|').replaceAll('\n', ' ');
export function markdown(result) {
  return `# Nx Angular benchmark

Status: **${result.status}**

Started: ${result.started}

Repository: ${result.repo}; requested ref: ${result.ref}; resolved commit: ${result.commit ?? 'unresolved'}

Concurrent application tasks: ${result.parallel}; sample interval: ${result.sampleMs} ms

## Environment and reproducibility

\`\`\`json
${JSON.stringify(result.environment, null, 2)}
\`\`\`

## Steps

| Step | Exit | Seconds | CPU mean % | CPU peak % | RAM mean GiB | RAM peak GiB | Block I/O GiB |
|---|---:|---:|---:|---:|---:|---:|---:|
${result.steps.map((s) => `| ${cell(s.name)} | ${s.exitCode ?? 'error'} | ${display(s.seconds)} | ${display(s.metrics?.cpuMean)} | ${display(s.metrics?.cpuPeak)} | ${display(s.metrics?.ramMean / 2 ** 30)} | ${display(s.metrics?.ramPeak / 2 ** 30)} | ${display(s.metrics?.diskBytes == null ? null : s.metrics.diskBytes / 2 ** 30)} |`).join('\n')}

## Measurement definitions and cache policy

CPU is **system-wide**, averaged across logical CPUs (0-100%), sampled from cumulative OS CPU counters; means are arithmetic sample means, not process-tree CPU.
RAM is **system-wide used RAM** (total minus free), not application RSS; OS filesystem cache can count as used. Peaks are sampled, not continuous.
Linux block I/O is read + write sector-counter delta for whole devices in /sys/block, excluding loop, ram, dm and md devices to avoid common layered-device double counting. It includes other system activity and is not process I/O or disk utilization. Virtual disks may be included.
Windows disk I/O is explicitly unavailable. Short steps may have only a final sample.
Durations use a monotonic clock and include sampler initialization/finalization and process startup.
Nx daemon, local/remote task cache and Angular persistent build cache are disabled. The baseline and migrated builds have their own fresh build directories. OS page caches, npm download caches, tool downloads and registry/network conditions are **not cleared**. A cold task build is not a cold machine/npm install.
Compare only matching commit, lockfile, Node/npm, parallelism, hardware and cache/network conditions; avoid unrelated machine activity.

## Versions, workload and commands

\`\`\`json
${JSON.stringify({ versions: result.versions, workload: result.workload, migration: result.migration, steps: result.steps.map(({ name, command, exitCode, signal, error, metrics }) => ({ name, command, exitCode, signal, error, samples: metrics?.samples, diskDevices: metrics?.diskDevices })) }, null, 2)}
\`\`\`

## Warnings and failures

${[...new Set(result.steps.flatMap((s) => s.metrics?.warnings ?? [])), ...(result.errors ?? [])].map((s) => `- ${cell(s)}`).join('\n') || 'None.'}

Logs and machine-readable report: ${cell(result.logDirectory)} (preserved outside disposable checkout).
Cleanup deletes only this invocation's ownership-verified checkout, including dependencies, caches, migration changes and build outputs; the original repository is never reset or cleaned. The owner receipt remains.
`;
}

export async function run(config) {
  const token = randomUUID();
  const work = config.work;
  const clone = path.join(work, 'checkout');
  const logDirectory = `${config.report.slice(0, -3)}.logs`;
  const result = {
    status: 'running', started: new Date().toISOString(), repo: config.repo, ref: config.ref,
    parallel: config.parallel, sampleMs: config['sample-ms'], logDirectory,
    environment: { node: process.version, npm: null, git: null, platform: process.platform, arch: os.arch(),
      os: `${os.type()} ${os.release()}`, cpus: os.cpus().length, cpuModel: os.cpus()[0]?.model,
      totalRamBytes: os.totalmem(), runner: '1.0.0' },
    steps: [], errors: [], versions: {},
  };
  let owned = false;
  let reportReserved = false;
  let jsonReserved = false;
  let active;
  let interrupted = false;
  let killTimer;
  async function terminate(child, force = false) {
    if (!child?.pid) return;
    if (process.platform === 'win32') {
      await new Promise((resolve) => {
        const killer = spawn('taskkill', ['/PID', String(child.pid), '/T', ...(force ? ['/F'] : [])], { windowsHide: true });
        killer.on('error', (error) => { result.errors.push(`Process-tree termination: ${error.message}`); resolve(); });
        killer.on('close', resolve);
      });
    } else {
      try { process.kill(-child.pid, force ? 'SIGKILL' : 'SIGTERM'); } catch (error) {
        if (error.code !== 'ESRCH') result.errors.push(`Process-tree termination: ${error.message}`);
      }
    }
  }
  const interrupt = () => {
    interrupted = true;
    void terminate(active);
    if (!killTimer) killTimer = setTimeout(() => { void terminate(active, true); }, 5000);
  };
  const env = {
    ...process.env, CI: 'true', NX_DAEMON: 'false', NX_SKIP_NX_CACHE: 'true',
    NX_NO_CLOUD: 'true', NX_SKIP_REMOTE_CACHE: 'true', NX_INTERACTIVE: 'false',
    NG_CLI_ANALYTICS: 'false', NG_BUILD_CACHE: '0',
  };
  async function step(name, command, cwd = clone, capture = false) {
    if (interrupted && name !== 'cleanup') throw new Error('Benchmark interrupted');
    const entry = { name, command, exitCode: null };
    result.steps.push(entry);
    const start = performance.now();
    const stop = await sampler(config['sample-ms']);
    const log = createWriteStream(path.join(logDirectory, `${String(result.steps.length).padStart(2, '0')}-${name}.log`));
    let output = '';
    try {
      await new Promise((resolve, reject) => {
        const child = spawn(command[0], command.slice(1), {
          cwd, env, windowsHide: true, detached: process.platform !== 'win32',
          stdio: ['ignore', 'pipe', 'pipe'],
        });
        active = child;
        const onLogError = (error) => { void terminate(child, true); reject(error); };
        log.once('error', onLogError);
        for (const stream of [child.stdout, child.stderr]) {
          stream.on('data', (data) => {
            log.write(data);
            if (capture) output += data.toString();
          });
        }
        child.on('error', reject);
        child.on('close', (code, signal) => {
          active = undefined;
          entry.exitCode = code;
          entry.signal = signal;
          if (code === 0) resolve();
          else reject(new Error(`${name} exited with ${code ?? signal}; see ${log.path}`));
        });
      });
      if (interrupted) throw new Error('Benchmark interrupted');
      return output.trim();
    } catch (error) {
      entry.error = error.message;
      throw error;
    } finally {
      await new Promise((resolve) => log.end(resolve));
      entry.metrics = await stop();
      entry.seconds = (performance.now() - start) / 1000;
    }
  }
  process.on('SIGINT', interrupt);
  process.on('SIGTERM', interrupt);
  try {
    // Both namespaces must be new. No pre-existing report/logs or checkout is overwritten.
    await mkdir(path.dirname(config.report), { recursive: true });
    await writeFile(config.report, '', { flag: 'wx' });
    reportReserved = true;
    await writeFile(`${config.report.slice(0, -3)}.json`, '', { flag: 'wx' });
    jsonReserved = true;
    await mkdir(logDirectory);
    await mkdir(work);
    owned = true;
    const canonical = await realpath(work);
    if (canonical !== work) throw new Error('Work path must be canonical, without links');
    await writeFile(path.join(work, 'owner.json'), JSON.stringify({ token, work }), { flag: 'wx' });
    const npm = await npmCommand();
    result.environment.npm = await step('npm-version', [...npm, '--version'], work, true);
    result.environment.git = await step('git-version', ['git', '--version'], work, true);
    await step('clone', ['git', 'clone', '--no-checkout', '--', config.repo, clone], work);
    await step('checkout', ['git', 'checkout', '--detach', config.ref]);
    result.commit = await step('resolved-ref', ['git', 'rev-parse', 'HEAD'], clone, true);
    result.workload = JSON.parse(await readFile(path.join(clone, 'workload.json'), 'utf8'));
    const settings = JSON.parse(await readFile(path.join(clone, 'benchmark.config.json'), 'utf8'));
    result.migration = settings.migration;
    for (const value of Object.values(settings.migration)) {
      if (!/^\d+\.\d+\.\d+$/.test(value)) throw new Error('Migration targets must be exact release versions');
    }
    result.versions.baseline = JSON.parse(await readFile(path.join(clone, 'package.json'), 'utf8'));
    result.versions.baselineLockSha256 = createHash('sha256').update(await readFile(path.join(clone, 'package-lock.json'))).digest('hex');
    await step('install-baseline', [...npm, 'install', '--no-audit', '--no-fund']);
    result.versions.baselineInstalled = JSON.parse(await step('baseline-dependencies', [...npm, 'ls', '--depth=0', '--json'], clone, true));
    const nx = [process.execPath, path.join(clone, 'node_modules', 'nx', 'bin', 'nx.js')];
    const build = [...nx, 'run-many', '--target=build', '--all', `--parallel=${config.parallel}`, '--skip-nx-cache', '--outputStyle=static'];
    await step('build-baseline', build);
    const target = settings.migration;
    const overrides = Object.fromEntries(Object.keys({
      ...result.versions.baseline.dependencies, ...result.versions.baseline.devDependencies,
    }).filter((name) => name.startsWith('@angular/') || name.startsWith('@angular-devkit/')).map((name) => [name, target.angular]));
    Object.assign(overrides, { typescript: target.typescript, 'date-fns': target['date-fns'], rxjs: target.rxjs });
    await step('plan-migration', [...nx, 'migrate', `nx@${target.nx}`,
      `--to=${Object.entries(overrides).map(([name, version]) => `${name}@${version}`).join(',')}`]);
    const migrationFile = path.join(clone, 'migrations.json');
    result.migration.generated = JSON.parse(await readFile(migrationFile, 'utf8'));
    if (!Array.isArray(result.migration.generated.migrations) || !result.migration.generated.migrations.length) {
      throw new Error('Expected actual generated migration tasks; none found');
    }
    // Keep scheduled migrations, but replace semver ranges with the declared comparison pins.
    const migratedPath = path.join(clone, 'package.json');
    const migrated = JSON.parse(await readFile(migratedPath, 'utf8'));
    for (const section of ['dependencies', 'devDependencies']) {
      for (const name of Object.keys(migrated[section] ?? {})) {
        if (name === 'nx' || name.startsWith('@nx/')) migrated[section][name] = target.nx;
        else if (overrides[name]) migrated[section][name] = overrides[name];
      }
    }
    await writeFile(migratedPath, `${JSON.stringify(migrated, null, 2)}\n`);
    await step('install-migrated', [...npm, 'install', '--no-audit', '--no-fund']);
    await step('run-migrations', [...nx, 'migrate', '--run-migrations=migrations.json']);
    result.versions.migrated = JSON.parse(await readFile(migratedPath, 'utf8'));
    result.versions.migratedInstalled = JSON.parse(await step('resolved-dependencies', [...npm, 'ls', '--depth=0', '--json'], clone, true));
    result.versions.migratedLockSha256 = createHash('sha256').update(await readFile(path.join(clone, 'package-lock.json'))).digest('hex');
    await rm(path.join(clone, 'dist'), { recursive: true, force: true });
    await rm(path.join(clone, '.angular'), { recursive: true, force: true });
    await rm(path.join(clone, '.nx'), { recursive: true, force: true });
    await step('build-migrated', build);
    result.status = 'success';
  } catch (error) {
    result.status = interrupted ? 'interrupted' : 'failed';
    result.errors.push(error.stack ?? error.message);
  } finally {
    clearTimeout(killTimer);
    if (active) await terminate(active, true);
    if (owned) {
      const start = performance.now();
      const entry = { name: 'cleanup', command: ['remove ownership-verified disposable checkout'], exitCode: null };
      result.steps.push(entry);
      const stop = await sampler(config['sample-ms']);
      try {
        await removeOwnedClone(work, token);
        entry.exitCode = 0;
      } catch (error) {
        entry.error = error.message;
        result.errors.push(`Cleanup failed: ${error.message}`);
        result.status = 'failed';
      }
      entry.metrics = await stop();
      entry.seconds = (performance.now() - start) / 1000;
    }
    process.off('SIGINT', interrupt);
    process.off('SIGTERM', interrupt);
    // Only write if this invocation reserved the report, never overwrite a collision.
    if (reportReserved) {
      await writeFile(config.report, markdown(result));
      if (jsonReserved) await writeFile(`${config.report.slice(0, -3)}.json`, `${JSON.stringify(result, null, 2)}\n`);
    }
  }
  return result;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const config = options(process.argv.slice(2));
    if (config.help) {
      console.log('node benchmark.mjs [--repo URL] [--ref REF] [--parallel 2] [--work NEW-DIRECTORY] [--report OUTSIDE.md] [--sample-ms 1000]');
    } else {
      const result = await run(config);
      console.log(`${result.status}: ${config.report}`);
      for (const error of result.errors) console.error(error);
      process.exitCode = result.status === 'success' ? 0 : 1;
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
