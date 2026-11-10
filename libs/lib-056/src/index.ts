import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib046Component, total as total046 } from '@bench/lib-046';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-056-record-000', value: 57, offset: 0 },
  { name: 'lib-056-record-001', value: 114, offset: 1 },
  { name: 'lib-056-record-002', value: 171, offset: 2 },
  { name: 'lib-056-record-003', value: 228, offset: 3 },
  { name: 'lib-056-record-004', value: 285, offset: 4 },
  { name: 'lib-056-record-005', value: 342, offset: 5 },
  { name: 'lib-056-record-006', value: 399, offset: 6 },
  { name: 'lib-056-record-007', value: 456, offset: 7 },
  { name: 'lib-056-record-008', value: 513, offset: 8 },
  { name: 'lib-056-record-009', value: 570, offset: 9 },
  { name: 'lib-056-record-010', value: 627, offset: 10 },
  { name: 'lib-056-record-011', value: 684, offset: 11 },
  { name: 'lib-056-record-012', value: 741, offset: 12 },
  { name: 'lib-056-record-013', value: 798, offset: 13 },
  { name: 'lib-056-record-014', value: 855, offset: 14 },
  { name: 'lib-056-record-015', value: 912, offset: 15 },
  { name: 'lib-056-record-016', value: 969, offset: 16 },
  { name: 'lib-056-record-017', value: 1026, offset: 17 },
  { name: 'lib-056-record-018', value: 1083, offset: 18 },
  { name: 'lib-056-record-019', value: 1140, offset: 19 },
  { name: 'lib-056-record-020', value: 1197, offset: 20 },
  { name: 'lib-056-record-021', value: 1254, offset: 21 },
  { name: 'lib-056-record-022', value: 1311, offset: 22 },
  { name: 'lib-056-record-023', value: 1368, offset: 23 },
  { name: 'lib-056-record-024', value: 1425, offset: 24 },
  { name: 'lib-056-record-025', value: 1482, offset: 25 },
  { name: 'lib-056-record-026', value: 1539, offset: 26 },
  { name: 'lib-056-record-027', value: 1596, offset: 27 },
  { name: 'lib-056-record-028', value: 1653, offset: 28 },
  { name: 'lib-056-record-029', value: 1710, offset: 29 },
  { name: 'lib-056-record-030', value: 1767, offset: 30 },
  { name: 'lib-056-record-031', value: 1824, offset: 31 },
  { name: 'lib-056-record-032', value: 1881, offset: 32 },
  { name: 'lib-056-record-033', value: 1938, offset: 33 },
  { name: 'lib-056-record-034', value: 1995, offset: 34 },
  { name: 'lib-056-record-035', value: 2052, offset: 35 },
  { name: 'lib-056-record-036', value: 2109, offset: 36 },
  { name: 'lib-056-record-037', value: 2166, offset: 37 },
  { name: 'lib-056-record-038', value: 2223, offset: 38 },
  { name: 'lib-056-record-039', value: 2280, offset: 39 },
  { name: 'lib-056-record-040', value: 2337, offset: 40 },
  { name: 'lib-056-record-041', value: 2394, offset: 41 },
  { name: 'lib-056-record-042', value: 2451, offset: 42 },
  { name: 'lib-056-record-043', value: 2508, offset: 43 },
  { name: 'lib-056-record-044', value: 2565, offset: 44 },
  { name: 'lib-056-record-045', value: 2622, offset: 45 },
  { name: 'lib-056-record-046', value: 2679, offset: 46 },
  { name: 'lib-056-record-047', value: 2736, offset: 47 },
  { name: 'lib-056-record-048', value: 2793, offset: 48 },
  { name: 'lib-056-record-049', value: 2850, offset: 49 },
  { name: 'lib-056-record-050', value: 2907, offset: 50 },
  { name: 'lib-056-record-051', value: 2964, offset: 51 },
  { name: 'lib-056-record-052', value: 3021, offset: 52 },
  { name: 'lib-056-record-053', value: 3078, offset: 53 },
  { name: 'lib-056-record-054', value: 3135, offset: 54 },
  { name: 'lib-056-record-055', value: 3192, offset: 55 },
  { name: 'lib-056-record-056', value: 3249, offset: 56 },
  { name: 'lib-056-record-057', value: 3306, offset: 57 },
  { name: 'lib-056-record-058', value: 3363, offset: 58 },
  { name: 'lib-056-record-059', value: 3420, offset: 59 },
  { name: 'lib-056-record-060', value: 3477, offset: 60 },
  { name: 'lib-056-record-061', value: 3534, offset: 61 },
  { name: 'lib-056-record-062', value: 3591, offset: 62 },
  { name: 'lib-056-record-063', value: 3648, offset: 63 },
];
export const total = sumBy(rows, 'value') + total046 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-056',
  standalone: true,
  imports: [Lib046Component, Lib000Component],
  template: `<section><h2>lib-056: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-046 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib056Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
