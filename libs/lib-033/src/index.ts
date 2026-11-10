import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib023Component, total as total023 } from '@bench/lib-023';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-033-record-000', value: 34, offset: 0 },
  { name: 'lib-033-record-001', value: 68, offset: 1 },
  { name: 'lib-033-record-002', value: 102, offset: 2 },
  { name: 'lib-033-record-003', value: 136, offset: 3 },
  { name: 'lib-033-record-004', value: 170, offset: 4 },
  { name: 'lib-033-record-005', value: 204, offset: 5 },
  { name: 'lib-033-record-006', value: 238, offset: 6 },
  { name: 'lib-033-record-007', value: 272, offset: 7 },
  { name: 'lib-033-record-008', value: 306, offset: 8 },
  { name: 'lib-033-record-009', value: 340, offset: 9 },
  { name: 'lib-033-record-010', value: 374, offset: 10 },
  { name: 'lib-033-record-011', value: 408, offset: 11 },
  { name: 'lib-033-record-012', value: 442, offset: 12 },
  { name: 'lib-033-record-013', value: 476, offset: 13 },
  { name: 'lib-033-record-014', value: 510, offset: 14 },
  { name: 'lib-033-record-015', value: 544, offset: 15 },
  { name: 'lib-033-record-016', value: 578, offset: 16 },
  { name: 'lib-033-record-017', value: 612, offset: 17 },
  { name: 'lib-033-record-018', value: 646, offset: 18 },
  { name: 'lib-033-record-019', value: 680, offset: 19 },
  { name: 'lib-033-record-020', value: 714, offset: 20 },
  { name: 'lib-033-record-021', value: 748, offset: 21 },
  { name: 'lib-033-record-022', value: 782, offset: 22 },
  { name: 'lib-033-record-023', value: 816, offset: 23 },
  { name: 'lib-033-record-024', value: 850, offset: 24 },
  { name: 'lib-033-record-025', value: 884, offset: 25 },
  { name: 'lib-033-record-026', value: 918, offset: 26 },
  { name: 'lib-033-record-027', value: 952, offset: 27 },
  { name: 'lib-033-record-028', value: 986, offset: 28 },
  { name: 'lib-033-record-029', value: 1020, offset: 29 },
  { name: 'lib-033-record-030', value: 1054, offset: 30 },
  { name: 'lib-033-record-031', value: 1088, offset: 31 },
  { name: 'lib-033-record-032', value: 1122, offset: 32 },
  { name: 'lib-033-record-033', value: 1156, offset: 33 },
  { name: 'lib-033-record-034', value: 1190, offset: 34 },
  { name: 'lib-033-record-035', value: 1224, offset: 35 },
  { name: 'lib-033-record-036', value: 1258, offset: 36 },
  { name: 'lib-033-record-037', value: 1292, offset: 37 },
  { name: 'lib-033-record-038', value: 1326, offset: 38 },
  { name: 'lib-033-record-039', value: 1360, offset: 39 },
  { name: 'lib-033-record-040', value: 1394, offset: 40 },
  { name: 'lib-033-record-041', value: 1428, offset: 41 },
  { name: 'lib-033-record-042', value: 1462, offset: 42 },
  { name: 'lib-033-record-043', value: 1496, offset: 43 },
  { name: 'lib-033-record-044', value: 1530, offset: 44 },
  { name: 'lib-033-record-045', value: 1564, offset: 45 },
  { name: 'lib-033-record-046', value: 1598, offset: 46 },
  { name: 'lib-033-record-047', value: 1632, offset: 47 },
  { name: 'lib-033-record-048', value: 1666, offset: 48 },
  { name: 'lib-033-record-049', value: 1700, offset: 49 },
  { name: 'lib-033-record-050', value: 1734, offset: 50 },
  { name: 'lib-033-record-051', value: 1768, offset: 51 },
  { name: 'lib-033-record-052', value: 1802, offset: 52 },
  { name: 'lib-033-record-053', value: 1836, offset: 53 },
  { name: 'lib-033-record-054', value: 1870, offset: 54 },
  { name: 'lib-033-record-055', value: 1904, offset: 55 },
  { name: 'lib-033-record-056', value: 1938, offset: 56 },
  { name: 'lib-033-record-057', value: 1972, offset: 57 },
  { name: 'lib-033-record-058', value: 2006, offset: 58 },
  { name: 'lib-033-record-059', value: 2040, offset: 59 },
  { name: 'lib-033-record-060', value: 2074, offset: 60 },
  { name: 'lib-033-record-061', value: 2108, offset: 61 },
  { name: 'lib-033-record-062', value: 2142, offset: 62 },
  { name: 'lib-033-record-063', value: 2176, offset: 63 },
];
export const total = sumBy(rows, 'value') + total023 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-033',
  standalone: true,
  imports: [Lib023Component, Lib000Component],
  template: `<section><h2>lib-033: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-023 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib033Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
