import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib022Component, total as total022 } from '@bench/lib-022';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-032-record-000', value: 33, offset: 0 },
  { name: 'lib-032-record-001', value: 66, offset: 1 },
  { name: 'lib-032-record-002', value: 99, offset: 2 },
  { name: 'lib-032-record-003', value: 132, offset: 3 },
  { name: 'lib-032-record-004', value: 165, offset: 4 },
  { name: 'lib-032-record-005', value: 198, offset: 5 },
  { name: 'lib-032-record-006', value: 231, offset: 6 },
  { name: 'lib-032-record-007', value: 264, offset: 7 },
  { name: 'lib-032-record-008', value: 297, offset: 8 },
  { name: 'lib-032-record-009', value: 330, offset: 9 },
  { name: 'lib-032-record-010', value: 363, offset: 10 },
  { name: 'lib-032-record-011', value: 396, offset: 11 },
  { name: 'lib-032-record-012', value: 429, offset: 12 },
  { name: 'lib-032-record-013', value: 462, offset: 13 },
  { name: 'lib-032-record-014', value: 495, offset: 14 },
  { name: 'lib-032-record-015', value: 528, offset: 15 },
  { name: 'lib-032-record-016', value: 561, offset: 16 },
  { name: 'lib-032-record-017', value: 594, offset: 17 },
  { name: 'lib-032-record-018', value: 627, offset: 18 },
  { name: 'lib-032-record-019', value: 660, offset: 19 },
  { name: 'lib-032-record-020', value: 693, offset: 20 },
  { name: 'lib-032-record-021', value: 726, offset: 21 },
  { name: 'lib-032-record-022', value: 759, offset: 22 },
  { name: 'lib-032-record-023', value: 792, offset: 23 },
  { name: 'lib-032-record-024', value: 825, offset: 24 },
  { name: 'lib-032-record-025', value: 858, offset: 25 },
  { name: 'lib-032-record-026', value: 891, offset: 26 },
  { name: 'lib-032-record-027', value: 924, offset: 27 },
  { name: 'lib-032-record-028', value: 957, offset: 28 },
  { name: 'lib-032-record-029', value: 990, offset: 29 },
  { name: 'lib-032-record-030', value: 1023, offset: 30 },
  { name: 'lib-032-record-031', value: 1056, offset: 31 },
  { name: 'lib-032-record-032', value: 1089, offset: 32 },
  { name: 'lib-032-record-033', value: 1122, offset: 33 },
  { name: 'lib-032-record-034', value: 1155, offset: 34 },
  { name: 'lib-032-record-035', value: 1188, offset: 35 },
  { name: 'lib-032-record-036', value: 1221, offset: 36 },
  { name: 'lib-032-record-037', value: 1254, offset: 37 },
  { name: 'lib-032-record-038', value: 1287, offset: 38 },
  { name: 'lib-032-record-039', value: 1320, offset: 39 },
  { name: 'lib-032-record-040', value: 1353, offset: 40 },
  { name: 'lib-032-record-041', value: 1386, offset: 41 },
  { name: 'lib-032-record-042', value: 1419, offset: 42 },
  { name: 'lib-032-record-043', value: 1452, offset: 43 },
  { name: 'lib-032-record-044', value: 1485, offset: 44 },
  { name: 'lib-032-record-045', value: 1518, offset: 45 },
  { name: 'lib-032-record-046', value: 1551, offset: 46 },
  { name: 'lib-032-record-047', value: 1584, offset: 47 },
  { name: 'lib-032-record-048', value: 1617, offset: 48 },
  { name: 'lib-032-record-049', value: 1650, offset: 49 },
  { name: 'lib-032-record-050', value: 1683, offset: 50 },
  { name: 'lib-032-record-051', value: 1716, offset: 51 },
  { name: 'lib-032-record-052', value: 1749, offset: 52 },
  { name: 'lib-032-record-053', value: 1782, offset: 53 },
  { name: 'lib-032-record-054', value: 1815, offset: 54 },
  { name: 'lib-032-record-055', value: 1848, offset: 55 },
  { name: 'lib-032-record-056', value: 1881, offset: 56 },
  { name: 'lib-032-record-057', value: 1914, offset: 57 },
  { name: 'lib-032-record-058', value: 1947, offset: 58 },
  { name: 'lib-032-record-059', value: 1980, offset: 59 },
  { name: 'lib-032-record-060', value: 2013, offset: 60 },
  { name: 'lib-032-record-061', value: 2046, offset: 61 },
  { name: 'lib-032-record-062', value: 2079, offset: 62 },
  { name: 'lib-032-record-063', value: 2112, offset: 63 },
];
export const total = sumBy(rows, 'value') + total022 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-032',
  standalone: true,
  imports: [Lib022Component, Lib000Component],
  template: `<section><h2>lib-032: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-022 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib032Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
