import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, access, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { inside, options, removeOwnedClone, run, sampler, markdown } from './benchmark.mjs';

test('CLI validates concurrency, paths, refs and credential-free URLs', () => {
  for (const args of [
    ['--parallel', '0'], ['--parallel', '1.2'], ['--sample-ms', '99'],
    ['--ref=--evil'], ['--repo', 'https://token@github.com/org/repo.git'],
    ['--work', process.cwd()], ['--report', 'report.txt'],
  ]) assert.throws(() => options(args));
  assert.equal(options(['--parallel', '4']).parallel, 4);
  assert.equal(options(['--repo', 'git@github.com:org/repo.git']).repo, 'git@github.com:org/repo.git');
  assert.equal(inside(path.resolve('a'), path.resolve('ab')), false);
  assert.equal(inside(path.resolve('a'), path.resolve('a', 'b')), true);
});

test('cleanup refuses missing or mismatched ownership and preserves files', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'nx-cleanup-test-'));
  try {
    await mkdir(path.join(temp, 'checkout'));
    await writeFile(path.join(temp, 'checkout', 'valuable.txt'), 'preserve');
    await assert.rejects(removeOwnedClone(temp, 'test'));
    await writeFile(path.join(temp, 'owner.json'), JSON.stringify({ token: 'other', work: temp }));
    await assert.rejects(removeOwnedClone(temp, 'test'), /ownership/);
    assert.equal(await readFile(path.join(temp, 'checkout', 'valuable.txt'), 'utf8'), 'preserve');
    await removeOwnedClone(temp, 'other');
    await assert.rejects(access(path.join(temp, 'checkout')));
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test('sampler exposes system RAM/CPU and reports unavailable disk honestly', async () => {
  const stop = await sampler(100);
  await new Promise((resolve) => setTimeout(resolve, 120));
  const metrics = await stop();
  assert.ok(metrics.samples >= 2);
  assert.ok(metrics.ramPeak > 0);
  assert.ok(metrics.cpuMean === null || (metrics.cpuMean >= 0 && metrics.cpuMean <= 100));
  if (process.platform !== 'linux') {
    assert.equal(metrics.diskBytes, null);
    assert.ok(metrics.warnings.some((warning) => warning.includes('unavailable')));
  }
});

test('failed install retains logs/report, removes only owned checkout and returns failure', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'nx-failure-test-'));
  try {
    const source = path.join(temp, 'source');
    await mkdir(source);
    await writeFile(path.join(source, 'package.json'), JSON.stringify({
      name: 'intentional-install-failure', version: '1.0.0', private: true,
      scripts: { preinstall: 'node -e "process.exit(17)"' },
    }));
    await writeFile(path.join(source, 'package-lock.json'), '{"lockfileVersion":3,"packages":{}}');
    await writeFile(path.join(source, 'workload.json'), '{"apps":10,"libraries":100}');
    await writeFile(path.join(source, 'benchmark.config.json'), '{"migration":{"nx":"22.3.0"}}');
    execFileSync('git', ['init', source], { stdio: 'ignore' });
    execFileSync('git', ['-C', source, 'add', '.']);
    execFileSync('git', ['-C', source, '-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'fixture'], { stdio: 'ignore' });
    const report = path.join(temp, 'report.md');
    const work = path.join(temp, 'owned');
    const result = await run({ repo: source, ref: 'HEAD', work, report, parallel: 2, 'sample-ms': 100 });
    assert.equal(result.status, 'failed');
    assert.notEqual(result.steps.find((step) => step.name === 'install-baseline').exitCode, 0);
    assert.equal(result.steps.at(-1).name, 'cleanup');
    assert.equal(result.steps.at(-1).exitCode, 0);
    await assert.rejects(access(path.join(work, 'checkout')));
    assert.ok((await readFile(report, 'utf8')).includes('**failed**'));
    assert.ok(JSON.parse(await readFile(path.join(temp, 'report.json'), 'utf8')).errors.length);
    await access(path.join(source, 'package.json'));
    const original = await readFile(report, 'utf8');
    const collision = await run({ repo: source, ref: 'HEAD', work, report, parallel: 2, 'sample-ms': 100 });
    assert.equal(collision.status, 'failed');
    assert.equal(await readFile(report, 'utf8'), original);
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test('markdown distinguishes absent measurements from zero', () => {
  const report = markdown({
    status: 'failed', environment: {}, steps: [{ name: 'failure', seconds: 0.1 }],
    errors: ['expected failure'],
  });
  assert.match(report, /unavailable/);
  assert.doesNotMatch(report, /NaN/);
});
