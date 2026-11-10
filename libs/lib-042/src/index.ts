import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib032Component, total as total032 } from '@bench/lib-032';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-042-record-000', value: 43, offset: 0 },
  { name: 'lib-042-record-001', value: 86, offset: 1 },
  { name: 'lib-042-record-002', value: 129, offset: 2 },
  { name: 'lib-042-record-003', value: 172, offset: 3 },
  { name: 'lib-042-record-004', value: 215, offset: 4 },
  { name: 'lib-042-record-005', value: 258, offset: 5 },
  { name: 'lib-042-record-006', value: 301, offset: 6 },
  { name: 'lib-042-record-007', value: 344, offset: 7 },
  { name: 'lib-042-record-008', value: 387, offset: 8 },
  { name: 'lib-042-record-009', value: 430, offset: 9 },
  { name: 'lib-042-record-010', value: 473, offset: 10 },
  { name: 'lib-042-record-011', value: 516, offset: 11 },
  { name: 'lib-042-record-012', value: 559, offset: 12 },
  { name: 'lib-042-record-013', value: 602, offset: 13 },
  { name: 'lib-042-record-014', value: 645, offset: 14 },
  { name: 'lib-042-record-015', value: 688, offset: 15 },
  { name: 'lib-042-record-016', value: 731, offset: 16 },
  { name: 'lib-042-record-017', value: 774, offset: 17 },
  { name: 'lib-042-record-018', value: 817, offset: 18 },
  { name: 'lib-042-record-019', value: 860, offset: 19 },
  { name: 'lib-042-record-020', value: 903, offset: 20 },
  { name: 'lib-042-record-021', value: 946, offset: 21 },
  { name: 'lib-042-record-022', value: 989, offset: 22 },
  { name: 'lib-042-record-023', value: 1032, offset: 23 },
  { name: 'lib-042-record-024', value: 1075, offset: 24 },
  { name: 'lib-042-record-025', value: 1118, offset: 25 },
  { name: 'lib-042-record-026', value: 1161, offset: 26 },
  { name: 'lib-042-record-027', value: 1204, offset: 27 },
  { name: 'lib-042-record-028', value: 1247, offset: 28 },
  { name: 'lib-042-record-029', value: 1290, offset: 29 },
  { name: 'lib-042-record-030', value: 1333, offset: 30 },
  { name: 'lib-042-record-031', value: 1376, offset: 31 },
  { name: 'lib-042-record-032', value: 1419, offset: 32 },
  { name: 'lib-042-record-033', value: 1462, offset: 33 },
  { name: 'lib-042-record-034', value: 1505, offset: 34 },
  { name: 'lib-042-record-035', value: 1548, offset: 35 },
  { name: 'lib-042-record-036', value: 1591, offset: 36 },
  { name: 'lib-042-record-037', value: 1634, offset: 37 },
  { name: 'lib-042-record-038', value: 1677, offset: 38 },
  { name: 'lib-042-record-039', value: 1720, offset: 39 },
  { name: 'lib-042-record-040', value: 1763, offset: 40 },
  { name: 'lib-042-record-041', value: 1806, offset: 41 },
  { name: 'lib-042-record-042', value: 1849, offset: 42 },
  { name: 'lib-042-record-043', value: 1892, offset: 43 },
  { name: 'lib-042-record-044', value: 1935, offset: 44 },
  { name: 'lib-042-record-045', value: 1978, offset: 45 },
  { name: 'lib-042-record-046', value: 2021, offset: 46 },
  { name: 'lib-042-record-047', value: 2064, offset: 47 },
  { name: 'lib-042-record-048', value: 2107, offset: 48 },
  { name: 'lib-042-record-049', value: 2150, offset: 49 },
  { name: 'lib-042-record-050', value: 2193, offset: 50 },
  { name: 'lib-042-record-051', value: 2236, offset: 51 },
  { name: 'lib-042-record-052', value: 2279, offset: 52 },
  { name: 'lib-042-record-053', value: 2322, offset: 53 },
  { name: 'lib-042-record-054', value: 2365, offset: 54 },
  { name: 'lib-042-record-055', value: 2408, offset: 55 },
  { name: 'lib-042-record-056', value: 2451, offset: 56 },
  { name: 'lib-042-record-057', value: 2494, offset: 57 },
  { name: 'lib-042-record-058', value: 2537, offset: 58 },
  { name: 'lib-042-record-059', value: 2580, offset: 59 },
  { name: 'lib-042-record-060', value: 2623, offset: 60 },
  { name: 'lib-042-record-061', value: 2666, offset: 61 },
  { name: 'lib-042-record-062', value: 2709, offset: 62 },
  { name: 'lib-042-record-063', value: 2752, offset: 63 },
];
export const total = sumBy(rows, 'value') + total032 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-042',
  standalone: true,
  imports: [Lib032Component, Lib000Component],
  template: `<section><h2>lib-042: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-032 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib042Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
