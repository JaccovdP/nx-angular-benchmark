import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib044Component, total as total044 } from '@bench/lib-044';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-054-record-000', value: 55, offset: 0 },
  { name: 'lib-054-record-001', value: 110, offset: 1 },
  { name: 'lib-054-record-002', value: 165, offset: 2 },
  { name: 'lib-054-record-003', value: 220, offset: 3 },
  { name: 'lib-054-record-004', value: 275, offset: 4 },
  { name: 'lib-054-record-005', value: 330, offset: 5 },
  { name: 'lib-054-record-006', value: 385, offset: 6 },
  { name: 'lib-054-record-007', value: 440, offset: 7 },
  { name: 'lib-054-record-008', value: 495, offset: 8 },
  { name: 'lib-054-record-009', value: 550, offset: 9 },
  { name: 'lib-054-record-010', value: 605, offset: 10 },
  { name: 'lib-054-record-011', value: 660, offset: 11 },
  { name: 'lib-054-record-012', value: 715, offset: 12 },
  { name: 'lib-054-record-013', value: 770, offset: 13 },
  { name: 'lib-054-record-014', value: 825, offset: 14 },
  { name: 'lib-054-record-015', value: 880, offset: 15 },
  { name: 'lib-054-record-016', value: 935, offset: 16 },
  { name: 'lib-054-record-017', value: 990, offset: 17 },
  { name: 'lib-054-record-018', value: 1045, offset: 18 },
  { name: 'lib-054-record-019', value: 1100, offset: 19 },
  { name: 'lib-054-record-020', value: 1155, offset: 20 },
  { name: 'lib-054-record-021', value: 1210, offset: 21 },
  { name: 'lib-054-record-022', value: 1265, offset: 22 },
  { name: 'lib-054-record-023', value: 1320, offset: 23 },
  { name: 'lib-054-record-024', value: 1375, offset: 24 },
  { name: 'lib-054-record-025', value: 1430, offset: 25 },
  { name: 'lib-054-record-026', value: 1485, offset: 26 },
  { name: 'lib-054-record-027', value: 1540, offset: 27 },
  { name: 'lib-054-record-028', value: 1595, offset: 28 },
  { name: 'lib-054-record-029', value: 1650, offset: 29 },
  { name: 'lib-054-record-030', value: 1705, offset: 30 },
  { name: 'lib-054-record-031', value: 1760, offset: 31 },
  { name: 'lib-054-record-032', value: 1815, offset: 32 },
  { name: 'lib-054-record-033', value: 1870, offset: 33 },
  { name: 'lib-054-record-034', value: 1925, offset: 34 },
  { name: 'lib-054-record-035', value: 1980, offset: 35 },
  { name: 'lib-054-record-036', value: 2035, offset: 36 },
  { name: 'lib-054-record-037', value: 2090, offset: 37 },
  { name: 'lib-054-record-038', value: 2145, offset: 38 },
  { name: 'lib-054-record-039', value: 2200, offset: 39 },
  { name: 'lib-054-record-040', value: 2255, offset: 40 },
  { name: 'lib-054-record-041', value: 2310, offset: 41 },
  { name: 'lib-054-record-042', value: 2365, offset: 42 },
  { name: 'lib-054-record-043', value: 2420, offset: 43 },
  { name: 'lib-054-record-044', value: 2475, offset: 44 },
  { name: 'lib-054-record-045', value: 2530, offset: 45 },
  { name: 'lib-054-record-046', value: 2585, offset: 46 },
  { name: 'lib-054-record-047', value: 2640, offset: 47 },
  { name: 'lib-054-record-048', value: 2695, offset: 48 },
  { name: 'lib-054-record-049', value: 2750, offset: 49 },
  { name: 'lib-054-record-050', value: 2805, offset: 50 },
  { name: 'lib-054-record-051', value: 2860, offset: 51 },
  { name: 'lib-054-record-052', value: 2915, offset: 52 },
  { name: 'lib-054-record-053', value: 2970, offset: 53 },
  { name: 'lib-054-record-054', value: 3025, offset: 54 },
  { name: 'lib-054-record-055', value: 3080, offset: 55 },
  { name: 'lib-054-record-056', value: 3135, offset: 56 },
  { name: 'lib-054-record-057', value: 3190, offset: 57 },
  { name: 'lib-054-record-058', value: 3245, offset: 58 },
  { name: 'lib-054-record-059', value: 3300, offset: 59 },
  { name: 'lib-054-record-060', value: 3355, offset: 60 },
  { name: 'lib-054-record-061', value: 3410, offset: 61 },
  { name: 'lib-054-record-062', value: 3465, offset: 62 },
  { name: 'lib-054-record-063', value: 3520, offset: 63 },
];
export const total = sumBy(rows, 'value') + total044 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-054',
  standalone: true,
  imports: [Lib044Component, Lib000Component],
  template: `<section><h2>lib-054: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-044 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib054Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
