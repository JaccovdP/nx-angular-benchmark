# Nx Angular benchmark

A deterministic Nx workspace containing **10 Angular applications and 100 Angular libraries**, plus a dependency-free Node benchmark runner for Windows and Linux.

The applications are synthetic compiler/bundler workloads, not a useful product. All libraries contain standalone Angular components, reactive state, templates, styles and 64 deterministic data records. Ten layered dependency chains share a common base library. Every library is imported transitively by an application, with rendered components and data used at runtime. Libraries are source-based Angular projects, compiled as part of application builds rather than separate publishable packages. Applications actually use RxJS, date-fns and lodash-es through those libraries.

## Requirements

- **Node 22.12 or newer within Node 22**, with npm 10 or 11; use the **same exact Node/npm versions** on compared systems. Node 22.18.0 / npm 10.9.3 are the development environment.
- Git on `PATH`; enough RAM/storage for simultaneous Angular builds and two dependency installs.
- Normal Git credentials with read access to this private repository. Use Git Credential Manager, `gh auth setup-git`, or SSH agent authentication. Do not put access tokens in repository URLs, config, or reports.
- Network access to GitHub and the npm registry. Only benchmark repositories you trust: npm lifecycle scripts and migration code execute locally.

PowerShell can select an unsigned `npm.ps1` before `npm.cmd`; use `npm.cmd` in the commands below if your policy blocks it. The standalone runner invokes npm's JavaScript entrypoint directly on Windows and does not change execution policy.

## Benchmark from outside a checkout

Obtain **just** `tools/benchmark.mjs` (for example via GitHub's file download) and save it outside the disposable work directory. It only uses Node built-ins; no initial `npm install` is required. The runner, reports and invocation directory must remain outside `--work`.

PowerShell:

```powershell
node C:\bench\benchmark.mjs --repo https://github.com/JaccovdP/nx-angular-benchmark.git --ref main --parallel 2 --work C:\bench\run-001 --report C:\bench\results\run-001.md
```

Linux:

```sh
node /home/me/bench/benchmark.mjs --repo git@github.com:JaccovdP/nx-angular-benchmark.git --ref main --parallel 2 --work /home/me/bench/run-001 --report /home/me/bench/results/run-001.md
```

`--work` must not already exist, and its parent must exist. Report/log names must also be unused. Each invocation gets its own exclusive work directory and ownership token. Omit `--work` and `--report` for unique default names (temporary work directory, report in the invocation directory).

Prefer `--ref <full-commit-SHA>` for comparisons. `main`, tags and branch names are accepted, but are resolved and recorded as exact commits on each run. The runner makes a real full clone (not a shallow clone) followed by a detached checkout of the requested ref. Git authentication must be configured beforehand; benchmark child processes cannot prompt for terminal input.

`--parallel N` controls **concurrent Nx application tasks**, not a strict CPU thread count. Each Angular/esbuild process can use multiple threads. `--sample-ms 1000` controls resource sampling; minimum 100 ms. Start with parallelism 2 and increase only if the machine has sufficient memory.

### Measured sequence

1. Record Node/npm/Git and machine information.
2. `git clone --no-checkout`, then detached checkout and commit resolution.
3. `npm install --no-audit --no-fund` on the checked-in baseline lockfile (**not** `npm ci`).
4. Build all applications with `nx run-many --target=build --all --parallel=N --skip-nx-cache`.
5. `nx migrate nx@22.3.0`, then explicitly plan `@angular/core@21.0.0` and `@angular/cli@21.0.0` from the original baseline versions with package target overrides. Merge/deduplicate and record all actual generated migration tasks; do not skip Angular migrations just because Nx's optional package updates did not schedule them.
6. Normalize migrated manifest ranges to declared exact comparison pins, then run a second `npm install`.
7. `nx migrate --run-migrations=migrations.json` and record resolved installed versions.
8. Remove prior build/cache output and build all applications again under the upgraded toolchain.
9. In `finally`, delete the verified runner-owned disposable checkout, **including** migration edits, untracked outputs, dependencies and caches.

An ordinary step failure stops later workload steps but still runs cleanup and writes a failed report. Exit status is nonzero on any failure, including cleanup. Ctrl+C/SIGTERM requests process-tree termination and cleanup (with forceful termination after five seconds). Hard process kills, machine shutdowns and filesystem permission errors cannot guarantee cleanup; the report records failures when the process can still run. Never manually point the runner at a valuable existing checkout.

The owner receipt remains in the otherwise empty work directory; use a **new work name** on the next run. Reports are Markdown plus sibling JSON and a `.logs` directory, all outside cleanup scope. The JSON contains generated migration tasks, exact declared/installed package versions, lockfile SHA-256 values, command arrays, exit codes and sampled measurements. Reports may contain local paths and machine details; review before sharing.

### Metrics and cache semantics

Every command and cleanup has monotonic wall-clock duration. Sampler setup, process startup and sampler finalization are included. CPU/RAM samples use low-overhead Node OS counters on both platforms:

| Metric | Definition |
|---|---|
| CPU mean/peak | System-wide utilization across all logical CPUs, 0-100%, arithmetic mean/maximum of interval samples; not process-tree CPU |
| RAM mean/peak | System total minus free RAM, in GiB; includes other processes and potentially OS file cache, not process RSS |
| Linux block I/O | Read + write sector-counter delta for whole `/sys/block` devices, excluding loop/ram/dm/md; bytes, not utilization; includes unrelated system I/O and possibly virtual disks |
| Windows block I/O | **Unavailable**, explicitly reported; no fabricated zero values |

Peaks are sampled and can miss short spikes; brief commands may have only a final sample. Linux `/proc`/`/sys` availability or device changes can make disk metrics unavailable, with warnings.

Nx daemon, local task cache and remote caching are disabled. Angular persistent caching is explicitly disabled in `angular.json`; builds also run with `CI=true`. Prior build directories are removed before the migrated build. These are **cold task builds**, not cold machine runs. **OS page caches, npm's download cache, network/proxy caches and tool download caches are not cleared.** Installs on a warmed npm cache are not directly comparable with first-time downloads. The second install intentionally reuses baseline dependencies because upgrading an installed workspace is part of the workload.

Keep commit/lockfile, runtime versions, parallelism, npm cache policy, power plan, thermal conditions and machine activity comparable. Use multiple runs and compare their distributions; the runner does not invent an aggregate score from unrelated metrics.

## Pinned baseline and migration target

| Package family | Baseline | Target |
|---|---|---|
| Nx and `@nx/*` | 21.3.2 | 22.3.0 |
| Angular / CLI / build / devkit | 20.0.6 | 21.0.0 |
| TypeScript | 5.8.3 | 5.9.3 |
| RxJS | 7.8.1 | 7.8.2 |
| date-fns | 3.6.0 | 4.1.0 |
| lodash-es | 4.17.21 | unchanged |

These are deliberately historical versions for benchmarking, **not a recommended production dependency baseline**. Installation may print upstream deprecation/security warnings. Do not deploy the generated applications or store secrets in them.

The published package peer dependencies support these pairings: Angular 20.0 requires TypeScript `>=5.8 <5.9`; Angular 21.0 requires `>=5.9 <6`; both accept Node 22.12+. Nx 21.3.2 accepts Angular `<21`; Nx 22.3.0 accepts Angular `<22`.

References: [Nx/Angular compatibility](https://nx.dev/docs/kb/angular-nx-version-matrix), [Angular/Node/TypeScript compatibility](https://angular.dev/reference/versions), and exact npm registry package manifests for `@nx/angular` and `@angular/build`.

## Workspace development and reproducible growth

```powershell
npm.cmd install
npm.cmd test
npm.cmd run build
npm.cmd run generate
```

The equivalent Linux commands use `npm`. Generated projects and `package-lock.json` are checked in, so benchmark runs **do not generate** the workload before installation.

`benchmark.config.json` defines app count, library count, rows per library and exact migration versions. `tools/generate.mjs` deterministically writes projects and TypeScript path aliases; `workload.json` records counts and graph edges. Re-running generation with unchanged configuration must produce no diff. Increasing **only** the library count preserves existing library files; changing application count deliberately redistributes chains. Generation does not delete old projects: grow in a new branch later, or explicitly remove obsolete generated projects when shrinking. No larger comparison branch is created here.

Tests use Node's built-in test runner: graph/count/reproducibility checks, CLI validation, ownership protection, metrics definitions and a real disposable Git clone with an intentionally failed npm install to verify report retention and cleanup.
