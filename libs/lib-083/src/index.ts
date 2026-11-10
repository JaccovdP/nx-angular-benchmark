import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib073Component, total as total073 } from '@bench/lib-073';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-083-record-000', value: 84, offset: 0 },
  { name: 'lib-083-record-001', value: 168, offset: 1 },
  { name: 'lib-083-record-002', value: 252, offset: 2 },
  { name: 'lib-083-record-003', value: 336, offset: 3 },
  { name: 'lib-083-record-004', value: 420, offset: 4 },
  { name: 'lib-083-record-005', value: 504, offset: 5 },
  { name: 'lib-083-record-006', value: 588, offset: 6 },
  { name: 'lib-083-record-007', value: 672, offset: 7 },
  { name: 'lib-083-record-008', value: 756, offset: 8 },
  { name: 'lib-083-record-009', value: 840, offset: 9 },
  { name: 'lib-083-record-010', value: 924, offset: 10 },
  { name: 'lib-083-record-011', value: 1008, offset: 11 },
  { name: 'lib-083-record-012', value: 1092, offset: 12 },
  { name: 'lib-083-record-013', value: 1176, offset: 13 },
  { name: 'lib-083-record-014', value: 1260, offset: 14 },
  { name: 'lib-083-record-015', value: 1344, offset: 15 },
  { name: 'lib-083-record-016', value: 1428, offset: 16 },
  { name: 'lib-083-record-017', value: 1512, offset: 17 },
  { name: 'lib-083-record-018', value: 1596, offset: 18 },
  { name: 'lib-083-record-019', value: 1680, offset: 19 },
  { name: 'lib-083-record-020', value: 1764, offset: 20 },
  { name: 'lib-083-record-021', value: 1848, offset: 21 },
  { name: 'lib-083-record-022', value: 1932, offset: 22 },
  { name: 'lib-083-record-023', value: 2016, offset: 23 },
  { name: 'lib-083-record-024', value: 2100, offset: 24 },
  { name: 'lib-083-record-025', value: 2184, offset: 25 },
  { name: 'lib-083-record-026', value: 2268, offset: 26 },
  { name: 'lib-083-record-027', value: 2352, offset: 27 },
  { name: 'lib-083-record-028', value: 2436, offset: 28 },
  { name: 'lib-083-record-029', value: 2520, offset: 29 },
  { name: 'lib-083-record-030', value: 2604, offset: 30 },
  { name: 'lib-083-record-031', value: 2688, offset: 31 },
  { name: 'lib-083-record-032', value: 2772, offset: 32 },
  { name: 'lib-083-record-033', value: 2856, offset: 33 },
  { name: 'lib-083-record-034', value: 2940, offset: 34 },
  { name: 'lib-083-record-035', value: 3024, offset: 35 },
  { name: 'lib-083-record-036', value: 3108, offset: 36 },
  { name: 'lib-083-record-037', value: 3192, offset: 37 },
  { name: 'lib-083-record-038', value: 3276, offset: 38 },
  { name: 'lib-083-record-039', value: 3360, offset: 39 },
  { name: 'lib-083-record-040', value: 3444, offset: 40 },
  { name: 'lib-083-record-041', value: 3528, offset: 41 },
  { name: 'lib-083-record-042', value: 3612, offset: 42 },
  { name: 'lib-083-record-043', value: 3696, offset: 43 },
  { name: 'lib-083-record-044', value: 3780, offset: 44 },
  { name: 'lib-083-record-045', value: 3864, offset: 45 },
  { name: 'lib-083-record-046', value: 3948, offset: 46 },
  { name: 'lib-083-record-047', value: 4032, offset: 47 },
  { name: 'lib-083-record-048', value: 4116, offset: 48 },
  { name: 'lib-083-record-049', value: 4200, offset: 49 },
  { name: 'lib-083-record-050', value: 4284, offset: 50 },
  { name: 'lib-083-record-051', value: 4368, offset: 51 },
  { name: 'lib-083-record-052', value: 4452, offset: 52 },
  { name: 'lib-083-record-053', value: 4536, offset: 53 },
  { name: 'lib-083-record-054', value: 4620, offset: 54 },
  { name: 'lib-083-record-055', value: 4704, offset: 55 },
  { name: 'lib-083-record-056', value: 4788, offset: 56 },
  { name: 'lib-083-record-057', value: 4872, offset: 57 },
  { name: 'lib-083-record-058', value: 4956, offset: 58 },
  { name: 'lib-083-record-059', value: 5040, offset: 59 },
  { name: 'lib-083-record-060', value: 5124, offset: 60 },
  { name: 'lib-083-record-061', value: 5208, offset: 61 },
  { name: 'lib-083-record-062', value: 5292, offset: 62 },
  { name: 'lib-083-record-063', value: 5376, offset: 63 },
];
export const total = sumBy(rows, 'value') + total073 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-083',
  standalone: true,
  imports: [Lib073Component, Lib000Component],
  template: `<section><h2>lib-083: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-073 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib083Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
