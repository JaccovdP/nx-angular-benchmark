import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib028Component, total as total028 } from '@bench/lib-028';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-038-record-000', value: 39, offset: 0 },
  { name: 'lib-038-record-001', value: 78, offset: 1 },
  { name: 'lib-038-record-002', value: 117, offset: 2 },
  { name: 'lib-038-record-003', value: 156, offset: 3 },
  { name: 'lib-038-record-004', value: 195, offset: 4 },
  { name: 'lib-038-record-005', value: 234, offset: 5 },
  { name: 'lib-038-record-006', value: 273, offset: 6 },
  { name: 'lib-038-record-007', value: 312, offset: 7 },
  { name: 'lib-038-record-008', value: 351, offset: 8 },
  { name: 'lib-038-record-009', value: 390, offset: 9 },
  { name: 'lib-038-record-010', value: 429, offset: 10 },
  { name: 'lib-038-record-011', value: 468, offset: 11 },
  { name: 'lib-038-record-012', value: 507, offset: 12 },
  { name: 'lib-038-record-013', value: 546, offset: 13 },
  { name: 'lib-038-record-014', value: 585, offset: 14 },
  { name: 'lib-038-record-015', value: 624, offset: 15 },
  { name: 'lib-038-record-016', value: 663, offset: 16 },
  { name: 'lib-038-record-017', value: 702, offset: 17 },
  { name: 'lib-038-record-018', value: 741, offset: 18 },
  { name: 'lib-038-record-019', value: 780, offset: 19 },
  { name: 'lib-038-record-020', value: 819, offset: 20 },
  { name: 'lib-038-record-021', value: 858, offset: 21 },
  { name: 'lib-038-record-022', value: 897, offset: 22 },
  { name: 'lib-038-record-023', value: 936, offset: 23 },
  { name: 'lib-038-record-024', value: 975, offset: 24 },
  { name: 'lib-038-record-025', value: 1014, offset: 25 },
  { name: 'lib-038-record-026', value: 1053, offset: 26 },
  { name: 'lib-038-record-027', value: 1092, offset: 27 },
  { name: 'lib-038-record-028', value: 1131, offset: 28 },
  { name: 'lib-038-record-029', value: 1170, offset: 29 },
  { name: 'lib-038-record-030', value: 1209, offset: 30 },
  { name: 'lib-038-record-031', value: 1248, offset: 31 },
  { name: 'lib-038-record-032', value: 1287, offset: 32 },
  { name: 'lib-038-record-033', value: 1326, offset: 33 },
  { name: 'lib-038-record-034', value: 1365, offset: 34 },
  { name: 'lib-038-record-035', value: 1404, offset: 35 },
  { name: 'lib-038-record-036', value: 1443, offset: 36 },
  { name: 'lib-038-record-037', value: 1482, offset: 37 },
  { name: 'lib-038-record-038', value: 1521, offset: 38 },
  { name: 'lib-038-record-039', value: 1560, offset: 39 },
  { name: 'lib-038-record-040', value: 1599, offset: 40 },
  { name: 'lib-038-record-041', value: 1638, offset: 41 },
  { name: 'lib-038-record-042', value: 1677, offset: 42 },
  { name: 'lib-038-record-043', value: 1716, offset: 43 },
  { name: 'lib-038-record-044', value: 1755, offset: 44 },
  { name: 'lib-038-record-045', value: 1794, offset: 45 },
  { name: 'lib-038-record-046', value: 1833, offset: 46 },
  { name: 'lib-038-record-047', value: 1872, offset: 47 },
  { name: 'lib-038-record-048', value: 1911, offset: 48 },
  { name: 'lib-038-record-049', value: 1950, offset: 49 },
  { name: 'lib-038-record-050', value: 1989, offset: 50 },
  { name: 'lib-038-record-051', value: 2028, offset: 51 },
  { name: 'lib-038-record-052', value: 2067, offset: 52 },
  { name: 'lib-038-record-053', value: 2106, offset: 53 },
  { name: 'lib-038-record-054', value: 2145, offset: 54 },
  { name: 'lib-038-record-055', value: 2184, offset: 55 },
  { name: 'lib-038-record-056', value: 2223, offset: 56 },
  { name: 'lib-038-record-057', value: 2262, offset: 57 },
  { name: 'lib-038-record-058', value: 2301, offset: 58 },
  { name: 'lib-038-record-059', value: 2340, offset: 59 },
  { name: 'lib-038-record-060', value: 2379, offset: 60 },
  { name: 'lib-038-record-061', value: 2418, offset: 61 },
  { name: 'lib-038-record-062', value: 2457, offset: 62 },
  { name: 'lib-038-record-063', value: 2496, offset: 63 },
];
export const total = sumBy(rows, 'value') + total028 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-038',
  standalone: true,
  imports: [Lib028Component, Lib000Component],
  template: `<section><h2>lib-038: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-028 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib038Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
