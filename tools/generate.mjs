import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const id = (n) => String(n).padStart(3, '0');

export function workload(config) {
  const { apps, libraries, rowsPerLibrary } = config;
  const libraryLanes = config.libraryLanes ?? Math.min(apps, 10);
  for (const [name, value] of Object.entries({ apps, libraries, rowsPerLibrary, libraryLanes })) {
    if (!Number.isSafeInteger(value) || value < 1 || value > 10000) {
      throw new Error(`${name} must be an integer between 1 and 10000`);
    }
  }
  if (libraries < libraryLanes || apps < libraryLanes) throw new Error('apps and libraries must be at least libraryLanes');
  const files = new Map();
  const paths = {};
  const graph = {};
  for (let n = 0; n < libraries; n++) {
    const name = `lib-${id(n)}`;
    const previous = n < libraryLanes ? null : `lib-${id(n - libraryLanes)}`;
    const shared = n >= libraryLanes && n % libraryLanes !== 0 ? 'lib-000' : null;
    const deps = [...new Set([previous, shared].filter(Boolean))];
    graph[name] = deps;
    paths[`@bench/${name}`] = [`libs/${name}/src/index.ts`];
    files.set(`libs/${name}/project.json`, json({
      name, projectType: 'library', sourceRoot: `libs/${name}/src`,
      tags: [`layer:${Math.floor(n / libraryLanes)}`], targets: {},
    }));
    files.set(`libs/${name}/tsconfig.json`, json({
      extends: '../../tsconfig.base.json',
      compilerOptions: { outDir: '../../dist/out-tsc' }, include: ['src/**/*.ts'],
    }));
    files.set(`libs/${name}/src/index.ts`, `import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
${deps.map((dep) => `import { Lib${dep.slice(4)}Component, total as total${dep.slice(4)} } from '@bench/${dep}';`).join('\n')}

const rows = [
${Array.from({ length: rowsPerLibrary }, (_, row) => `  { name: '${name}-record-${id(row)}', value: ${(n + 1) * (row + 1)}, offset: ${row} },`).join('\n')}
];
export const total = sumBy(rows, 'value')${deps.map((dep) => ` + total${dep.slice(4)}`).join('')};
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-${name}',
  standalone: true,
  imports: [${deps.map((dep) => `Lib${dep.slice(4)}Component`).join(', ')}],
  template: \`<section><h2>${name}: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    ${previous ? `<bench-${previous} />` : ''}
    ${shared && shared !== previous ? '@if (page() % 2 === 1) { <bench-lib-000 /> }' : ''}
  </section>\`,
  styles: [\`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }\`]
})
export class Lib${id(n)}Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
`);
  }
  for (let n = 0; n < apps; n++) {
    const name = `app-${id(n)}`;
    const lane = n % libraryLanes;
    const top = lane + Math.floor((libraries - 1 - lane) / libraryLanes) * libraryLanes;
    const lib = `lib-${id(top)}`;
    graph[name] = [lib];
    files.set(`apps/${name}/project.json`, json({
      name, projectType: 'application', sourceRoot: `apps/${name}/src`,
      targets: { build: {
        executor: '@angular/build:application', outputs: ['{options.outputPath}'],
        options: {
          outputPath: `dist/apps/${name}`, index: `apps/${name}/src/index.html`,
          browser: `apps/${name}/src/main.ts`, tsConfig: `apps/${name}/tsconfig.app.json`,
          polyfills: ['zone.js'], styles: [], assets: [],
          optimization: true, sourceMap: false, outputHashing: 'all',
        },
      } },
    }));
    files.set(`apps/${name}/tsconfig.app.json`, json({
      extends: '../../tsconfig.base.json',
      compilerOptions: { outDir: `../../dist/out-tsc/${name}`, types: [] },
      files: ['src/main.ts'], include: ['src/**/*.d.ts'],
    }));
    files.set(`apps/${name}/src/index.html`, `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${name}</title><base href="/"></head>
<body><bench-root></bench-root></body></html>
`);
    files.set(`apps/${name}/src/main.ts`, `import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lib${id(top)}Component, summary$ } from '@bench/${lib}';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'bench-root',
  standalone: true,
  imports: [Lib${id(top)}Component, AsyncPipe, JsonPipe],
  template: \`<h1>${name}</h1><p>{{ summary$ | async | json }}</p><bench-${lib} />\`
})
class AppComponent { readonly summary$ = summary$; }

bootstrapApplication(AppComponent).catch((error: unknown) => { console.error(error); });
`);
  }
  files.set('workload.json', json({ schemaVersion: 1, apps, libraries, libraryLanes, rowsPerLibrary, graph }));
  return { files, paths };
}

export async function generate(destination = root) {
  const config = JSON.parse(await readFile(path.join(destination, 'benchmark.config.json'), 'utf8'));
  const { files, paths } = workload(config);
  const tsconfigFile = path.join(destination, 'tsconfig.base.json');
  const tsconfig = JSON.parse(await readFile(tsconfigFile, 'utf8'));
  tsconfig.compilerOptions.paths = paths;
  files.set('tsconfig.base.json', json(tsconfig));
  for (const [name, content] of files) {
    const target = path.join(destination, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content);
  }
  console.log(`Generated ${config.apps} applications and ${config.libraries} libraries.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generate();
}
