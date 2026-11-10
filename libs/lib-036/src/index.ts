import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib026Component, total as total026 } from '@bench/lib-026';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-036-record-000', value: 37, offset: 0 },
  { name: 'lib-036-record-001', value: 74, offset: 1 },
  { name: 'lib-036-record-002', value: 111, offset: 2 },
  { name: 'lib-036-record-003', value: 148, offset: 3 },
  { name: 'lib-036-record-004', value: 185, offset: 4 },
  { name: 'lib-036-record-005', value: 222, offset: 5 },
  { name: 'lib-036-record-006', value: 259, offset: 6 },
  { name: 'lib-036-record-007', value: 296, offset: 7 },
  { name: 'lib-036-record-008', value: 333, offset: 8 },
  { name: 'lib-036-record-009', value: 370, offset: 9 },
  { name: 'lib-036-record-010', value: 407, offset: 10 },
  { name: 'lib-036-record-011', value: 444, offset: 11 },
  { name: 'lib-036-record-012', value: 481, offset: 12 },
  { name: 'lib-036-record-013', value: 518, offset: 13 },
  { name: 'lib-036-record-014', value: 555, offset: 14 },
  { name: 'lib-036-record-015', value: 592, offset: 15 },
  { name: 'lib-036-record-016', value: 629, offset: 16 },
  { name: 'lib-036-record-017', value: 666, offset: 17 },
  { name: 'lib-036-record-018', value: 703, offset: 18 },
  { name: 'lib-036-record-019', value: 740, offset: 19 },
  { name: 'lib-036-record-020', value: 777, offset: 20 },
  { name: 'lib-036-record-021', value: 814, offset: 21 },
  { name: 'lib-036-record-022', value: 851, offset: 22 },
  { name: 'lib-036-record-023', value: 888, offset: 23 },
  { name: 'lib-036-record-024', value: 925, offset: 24 },
  { name: 'lib-036-record-025', value: 962, offset: 25 },
  { name: 'lib-036-record-026', value: 999, offset: 26 },
  { name: 'lib-036-record-027', value: 1036, offset: 27 },
  { name: 'lib-036-record-028', value: 1073, offset: 28 },
  { name: 'lib-036-record-029', value: 1110, offset: 29 },
  { name: 'lib-036-record-030', value: 1147, offset: 30 },
  { name: 'lib-036-record-031', value: 1184, offset: 31 },
  { name: 'lib-036-record-032', value: 1221, offset: 32 },
  { name: 'lib-036-record-033', value: 1258, offset: 33 },
  { name: 'lib-036-record-034', value: 1295, offset: 34 },
  { name: 'lib-036-record-035', value: 1332, offset: 35 },
  { name: 'lib-036-record-036', value: 1369, offset: 36 },
  { name: 'lib-036-record-037', value: 1406, offset: 37 },
  { name: 'lib-036-record-038', value: 1443, offset: 38 },
  { name: 'lib-036-record-039', value: 1480, offset: 39 },
  { name: 'lib-036-record-040', value: 1517, offset: 40 },
  { name: 'lib-036-record-041', value: 1554, offset: 41 },
  { name: 'lib-036-record-042', value: 1591, offset: 42 },
  { name: 'lib-036-record-043', value: 1628, offset: 43 },
  { name: 'lib-036-record-044', value: 1665, offset: 44 },
  { name: 'lib-036-record-045', value: 1702, offset: 45 },
  { name: 'lib-036-record-046', value: 1739, offset: 46 },
  { name: 'lib-036-record-047', value: 1776, offset: 47 },
  { name: 'lib-036-record-048', value: 1813, offset: 48 },
  { name: 'lib-036-record-049', value: 1850, offset: 49 },
  { name: 'lib-036-record-050', value: 1887, offset: 50 },
  { name: 'lib-036-record-051', value: 1924, offset: 51 },
  { name: 'lib-036-record-052', value: 1961, offset: 52 },
  { name: 'lib-036-record-053', value: 1998, offset: 53 },
  { name: 'lib-036-record-054', value: 2035, offset: 54 },
  { name: 'lib-036-record-055', value: 2072, offset: 55 },
  { name: 'lib-036-record-056', value: 2109, offset: 56 },
  { name: 'lib-036-record-057', value: 2146, offset: 57 },
  { name: 'lib-036-record-058', value: 2183, offset: 58 },
  { name: 'lib-036-record-059', value: 2220, offset: 59 },
  { name: 'lib-036-record-060', value: 2257, offset: 60 },
  { name: 'lib-036-record-061', value: 2294, offset: 61 },
  { name: 'lib-036-record-062', value: 2331, offset: 62 },
  { name: 'lib-036-record-063', value: 2368, offset: 63 },
];
export const total = sumBy(rows, 'value') + total026 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-036',
  standalone: true,
  imports: [Lib026Component, Lib000Component],
  template: `<section><h2>lib-036: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-026 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib036Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
