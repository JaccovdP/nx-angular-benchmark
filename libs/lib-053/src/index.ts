import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib043Component, total as total043 } from '@bench/lib-043';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-053-record-000', value: 54, offset: 0 },
  { name: 'lib-053-record-001', value: 108, offset: 1 },
  { name: 'lib-053-record-002', value: 162, offset: 2 },
  { name: 'lib-053-record-003', value: 216, offset: 3 },
  { name: 'lib-053-record-004', value: 270, offset: 4 },
  { name: 'lib-053-record-005', value: 324, offset: 5 },
  { name: 'lib-053-record-006', value: 378, offset: 6 },
  { name: 'lib-053-record-007', value: 432, offset: 7 },
  { name: 'lib-053-record-008', value: 486, offset: 8 },
  { name: 'lib-053-record-009', value: 540, offset: 9 },
  { name: 'lib-053-record-010', value: 594, offset: 10 },
  { name: 'lib-053-record-011', value: 648, offset: 11 },
  { name: 'lib-053-record-012', value: 702, offset: 12 },
  { name: 'lib-053-record-013', value: 756, offset: 13 },
  { name: 'lib-053-record-014', value: 810, offset: 14 },
  { name: 'lib-053-record-015', value: 864, offset: 15 },
  { name: 'lib-053-record-016', value: 918, offset: 16 },
  { name: 'lib-053-record-017', value: 972, offset: 17 },
  { name: 'lib-053-record-018', value: 1026, offset: 18 },
  { name: 'lib-053-record-019', value: 1080, offset: 19 },
  { name: 'lib-053-record-020', value: 1134, offset: 20 },
  { name: 'lib-053-record-021', value: 1188, offset: 21 },
  { name: 'lib-053-record-022', value: 1242, offset: 22 },
  { name: 'lib-053-record-023', value: 1296, offset: 23 },
  { name: 'lib-053-record-024', value: 1350, offset: 24 },
  { name: 'lib-053-record-025', value: 1404, offset: 25 },
  { name: 'lib-053-record-026', value: 1458, offset: 26 },
  { name: 'lib-053-record-027', value: 1512, offset: 27 },
  { name: 'lib-053-record-028', value: 1566, offset: 28 },
  { name: 'lib-053-record-029', value: 1620, offset: 29 },
  { name: 'lib-053-record-030', value: 1674, offset: 30 },
  { name: 'lib-053-record-031', value: 1728, offset: 31 },
  { name: 'lib-053-record-032', value: 1782, offset: 32 },
  { name: 'lib-053-record-033', value: 1836, offset: 33 },
  { name: 'lib-053-record-034', value: 1890, offset: 34 },
  { name: 'lib-053-record-035', value: 1944, offset: 35 },
  { name: 'lib-053-record-036', value: 1998, offset: 36 },
  { name: 'lib-053-record-037', value: 2052, offset: 37 },
  { name: 'lib-053-record-038', value: 2106, offset: 38 },
  { name: 'lib-053-record-039', value: 2160, offset: 39 },
  { name: 'lib-053-record-040', value: 2214, offset: 40 },
  { name: 'lib-053-record-041', value: 2268, offset: 41 },
  { name: 'lib-053-record-042', value: 2322, offset: 42 },
  { name: 'lib-053-record-043', value: 2376, offset: 43 },
  { name: 'lib-053-record-044', value: 2430, offset: 44 },
  { name: 'lib-053-record-045', value: 2484, offset: 45 },
  { name: 'lib-053-record-046', value: 2538, offset: 46 },
  { name: 'lib-053-record-047', value: 2592, offset: 47 },
  { name: 'lib-053-record-048', value: 2646, offset: 48 },
  { name: 'lib-053-record-049', value: 2700, offset: 49 },
  { name: 'lib-053-record-050', value: 2754, offset: 50 },
  { name: 'lib-053-record-051', value: 2808, offset: 51 },
  { name: 'lib-053-record-052', value: 2862, offset: 52 },
  { name: 'lib-053-record-053', value: 2916, offset: 53 },
  { name: 'lib-053-record-054', value: 2970, offset: 54 },
  { name: 'lib-053-record-055', value: 3024, offset: 55 },
  { name: 'lib-053-record-056', value: 3078, offset: 56 },
  { name: 'lib-053-record-057', value: 3132, offset: 57 },
  { name: 'lib-053-record-058', value: 3186, offset: 58 },
  { name: 'lib-053-record-059', value: 3240, offset: 59 },
  { name: 'lib-053-record-060', value: 3294, offset: 60 },
  { name: 'lib-053-record-061', value: 3348, offset: 61 },
  { name: 'lib-053-record-062', value: 3402, offset: 62 },
  { name: 'lib-053-record-063', value: 3456, offset: 63 },
];
export const total = sumBy(rows, 'value') + total043 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-053',
  standalone: true,
  imports: [Lib043Component, Lib000Component],
  template: `<section><h2>lib-053: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-043 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib053Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
