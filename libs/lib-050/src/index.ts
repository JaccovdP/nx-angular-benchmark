import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib040Component, total as total040 } from '@bench/lib-040';

const rows = [
  { name: 'lib-050-record-000', value: 51, offset: 0 },
  { name: 'lib-050-record-001', value: 102, offset: 1 },
  { name: 'lib-050-record-002', value: 153, offset: 2 },
  { name: 'lib-050-record-003', value: 204, offset: 3 },
  { name: 'lib-050-record-004', value: 255, offset: 4 },
  { name: 'lib-050-record-005', value: 306, offset: 5 },
  { name: 'lib-050-record-006', value: 357, offset: 6 },
  { name: 'lib-050-record-007', value: 408, offset: 7 },
  { name: 'lib-050-record-008', value: 459, offset: 8 },
  { name: 'lib-050-record-009', value: 510, offset: 9 },
  { name: 'lib-050-record-010', value: 561, offset: 10 },
  { name: 'lib-050-record-011', value: 612, offset: 11 },
  { name: 'lib-050-record-012', value: 663, offset: 12 },
  { name: 'lib-050-record-013', value: 714, offset: 13 },
  { name: 'lib-050-record-014', value: 765, offset: 14 },
  { name: 'lib-050-record-015', value: 816, offset: 15 },
  { name: 'lib-050-record-016', value: 867, offset: 16 },
  { name: 'lib-050-record-017', value: 918, offset: 17 },
  { name: 'lib-050-record-018', value: 969, offset: 18 },
  { name: 'lib-050-record-019', value: 1020, offset: 19 },
  { name: 'lib-050-record-020', value: 1071, offset: 20 },
  { name: 'lib-050-record-021', value: 1122, offset: 21 },
  { name: 'lib-050-record-022', value: 1173, offset: 22 },
  { name: 'lib-050-record-023', value: 1224, offset: 23 },
  { name: 'lib-050-record-024', value: 1275, offset: 24 },
  { name: 'lib-050-record-025', value: 1326, offset: 25 },
  { name: 'lib-050-record-026', value: 1377, offset: 26 },
  { name: 'lib-050-record-027', value: 1428, offset: 27 },
  { name: 'lib-050-record-028', value: 1479, offset: 28 },
  { name: 'lib-050-record-029', value: 1530, offset: 29 },
  { name: 'lib-050-record-030', value: 1581, offset: 30 },
  { name: 'lib-050-record-031', value: 1632, offset: 31 },
  { name: 'lib-050-record-032', value: 1683, offset: 32 },
  { name: 'lib-050-record-033', value: 1734, offset: 33 },
  { name: 'lib-050-record-034', value: 1785, offset: 34 },
  { name: 'lib-050-record-035', value: 1836, offset: 35 },
  { name: 'lib-050-record-036', value: 1887, offset: 36 },
  { name: 'lib-050-record-037', value: 1938, offset: 37 },
  { name: 'lib-050-record-038', value: 1989, offset: 38 },
  { name: 'lib-050-record-039', value: 2040, offset: 39 },
  { name: 'lib-050-record-040', value: 2091, offset: 40 },
  { name: 'lib-050-record-041', value: 2142, offset: 41 },
  { name: 'lib-050-record-042', value: 2193, offset: 42 },
  { name: 'lib-050-record-043', value: 2244, offset: 43 },
  { name: 'lib-050-record-044', value: 2295, offset: 44 },
  { name: 'lib-050-record-045', value: 2346, offset: 45 },
  { name: 'lib-050-record-046', value: 2397, offset: 46 },
  { name: 'lib-050-record-047', value: 2448, offset: 47 },
  { name: 'lib-050-record-048', value: 2499, offset: 48 },
  { name: 'lib-050-record-049', value: 2550, offset: 49 },
  { name: 'lib-050-record-050', value: 2601, offset: 50 },
  { name: 'lib-050-record-051', value: 2652, offset: 51 },
  { name: 'lib-050-record-052', value: 2703, offset: 52 },
  { name: 'lib-050-record-053', value: 2754, offset: 53 },
  { name: 'lib-050-record-054', value: 2805, offset: 54 },
  { name: 'lib-050-record-055', value: 2856, offset: 55 },
  { name: 'lib-050-record-056', value: 2907, offset: 56 },
  { name: 'lib-050-record-057', value: 2958, offset: 57 },
  { name: 'lib-050-record-058', value: 3009, offset: 58 },
  { name: 'lib-050-record-059', value: 3060, offset: 59 },
  { name: 'lib-050-record-060', value: 3111, offset: 60 },
  { name: 'lib-050-record-061', value: 3162, offset: 61 },
  { name: 'lib-050-record-062', value: 3213, offset: 62 },
  { name: 'lib-050-record-063', value: 3264, offset: 63 },
];
export const total = sumBy(rows, 'value') + total040;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-050',
  standalone: true,
  imports: [Lib040Component],
  template: `<section><h2>lib-050: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-040 />
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib050Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
