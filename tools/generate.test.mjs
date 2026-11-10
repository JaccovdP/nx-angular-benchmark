import test from 'node:test';
import assert from 'node:assert/strict';
import { workload } from './generate.mjs';

const config = { apps: 10, libraries: 100, rowsPerLibrary: 64 };

test('default workload is deterministic with all libraries reachable in an acyclic graph', () => {
  const first = workload(config);
  assert.deepEqual(first, workload(config));
  const manifest = JSON.parse(first.files.get('workload.json'));
  const apps = Object.keys(manifest.graph).filter((name) => name.startsWith('app-'));
  const libs = Object.keys(manifest.graph).filter((name) => name.startsWith('lib-'));
  assert.equal(apps.length, 10);
  assert.equal(libs.length, 100);
  assert.equal(Object.keys(first.paths).length, 100);
  const reached = new Set();
  function visit(name, stack = new Set()) {
    assert.ok(!stack.has(name), `Cycle at ${name}`);
    assert.ok(manifest.graph[name], `Missing project ${name}`);
    reached.add(name);
    for (const dependency of manifest.graph[name]) visit(dependency, new Set([...stack, name]));
  }
  apps.forEach((name) => visit(name));
  assert.equal(reached.size, 110);
  for (const name of libs) {
    const source = first.files.get(`libs/${name}/src/index.ts`);
    assert.match(source, /@Component/);
    assert.match(source, /from 'date-fns'/);
    assert.match(source, /from 'lodash-es'/);
    assert.match(source, /from 'rxjs'/);
    assert.equal((source.match(/name: 'lib-/g) ?? []).length, 64);
    for (const dependency of manifest.graph[name]) {
      assert.ok(source.includes(`from '@bench/${dependency}'`));
      assert.ok(source.includes(`<bench-${dependency}`));
    }
  }
});

test('growth preserves existing libraries and does not silently remove old projects', () => {
  const smaller = workload(config);
  const bigger = workload({ ...config, libraries: 120, apps: 12 });
  assert.equal(Object.keys(bigger.paths).length, 120);
  assert.equal(JSON.parse(bigger.files.get('workload.json')).apps, 12);
  assert.throws(() => workload({ ...config, libraries: 9 }), /at least libraryLanes/);
  for (const value of [0, -1, 1.5, '10', NaN]) {
    assert.throws(() => workload({ ...config, apps: value }), /integer/);
  }
  // Increasing library count alone leaves all existing source and library project definitions identical.
  const moreLibraries = workload({ ...config, libraries: 110 });
  for (const [file, contents] of smaller.files) {
    if (file.startsWith('libs/')) assert.equal(moreLibraries.files.get(file), contents);
  }
  const moreApps = workload({ ...config, apps: 20, libraryLanes: 10 });
  for (const [file, contents] of smaller.files) {
    if (file.startsWith('libs/') || file.startsWith('apps/')) assert.equal(moreApps.files.get(file), contents);
  }
});
