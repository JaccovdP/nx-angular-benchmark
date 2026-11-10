import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib016Component, total as total016 } from '@bench/lib-016';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-026-record-000', value: 27, offset: 0 },
  { name: 'lib-026-record-001', value: 54, offset: 1 },
  { name: 'lib-026-record-002', value: 81, offset: 2 },
  { name: 'lib-026-record-003', value: 108, offset: 3 },
  { name: 'lib-026-record-004', value: 135, offset: 4 },
  { name: 'lib-026-record-005', value: 162, offset: 5 },
  { name: 'lib-026-record-006', value: 189, offset: 6 },
  { name: 'lib-026-record-007', value: 216, offset: 7 },
  { name: 'lib-026-record-008', value: 243, offset: 8 },
  { name: 'lib-026-record-009', value: 270, offset: 9 },
  { name: 'lib-026-record-010', value: 297, offset: 10 },
  { name: 'lib-026-record-011', value: 324, offset: 11 },
  { name: 'lib-026-record-012', value: 351, offset: 12 },
  { name: 'lib-026-record-013', value: 378, offset: 13 },
  { name: 'lib-026-record-014', value: 405, offset: 14 },
  { name: 'lib-026-record-015', value: 432, offset: 15 },
  { name: 'lib-026-record-016', value: 459, offset: 16 },
  { name: 'lib-026-record-017', value: 486, offset: 17 },
  { name: 'lib-026-record-018', value: 513, offset: 18 },
  { name: 'lib-026-record-019', value: 540, offset: 19 },
  { name: 'lib-026-record-020', value: 567, offset: 20 },
  { name: 'lib-026-record-021', value: 594, offset: 21 },
  { name: 'lib-026-record-022', value: 621, offset: 22 },
  { name: 'lib-026-record-023', value: 648, offset: 23 },
  { name: 'lib-026-record-024', value: 675, offset: 24 },
  { name: 'lib-026-record-025', value: 702, offset: 25 },
  { name: 'lib-026-record-026', value: 729, offset: 26 },
  { name: 'lib-026-record-027', value: 756, offset: 27 },
  { name: 'lib-026-record-028', value: 783, offset: 28 },
  { name: 'lib-026-record-029', value: 810, offset: 29 },
  { name: 'lib-026-record-030', value: 837, offset: 30 },
  { name: 'lib-026-record-031', value: 864, offset: 31 },
  { name: 'lib-026-record-032', value: 891, offset: 32 },
  { name: 'lib-026-record-033', value: 918, offset: 33 },
  { name: 'lib-026-record-034', value: 945, offset: 34 },
  { name: 'lib-026-record-035', value: 972, offset: 35 },
  { name: 'lib-026-record-036', value: 999, offset: 36 },
  { name: 'lib-026-record-037', value: 1026, offset: 37 },
  { name: 'lib-026-record-038', value: 1053, offset: 38 },
  { name: 'lib-026-record-039', value: 1080, offset: 39 },
  { name: 'lib-026-record-040', value: 1107, offset: 40 },
  { name: 'lib-026-record-041', value: 1134, offset: 41 },
  { name: 'lib-026-record-042', value: 1161, offset: 42 },
  { name: 'lib-026-record-043', value: 1188, offset: 43 },
  { name: 'lib-026-record-044', value: 1215, offset: 44 },
  { name: 'lib-026-record-045', value: 1242, offset: 45 },
  { name: 'lib-026-record-046', value: 1269, offset: 46 },
  { name: 'lib-026-record-047', value: 1296, offset: 47 },
  { name: 'lib-026-record-048', value: 1323, offset: 48 },
  { name: 'lib-026-record-049', value: 1350, offset: 49 },
  { name: 'lib-026-record-050', value: 1377, offset: 50 },
  { name: 'lib-026-record-051', value: 1404, offset: 51 },
  { name: 'lib-026-record-052', value: 1431, offset: 52 },
  { name: 'lib-026-record-053', value: 1458, offset: 53 },
  { name: 'lib-026-record-054', value: 1485, offset: 54 },
  { name: 'lib-026-record-055', value: 1512, offset: 55 },
  { name: 'lib-026-record-056', value: 1539, offset: 56 },
  { name: 'lib-026-record-057', value: 1566, offset: 57 },
  { name: 'lib-026-record-058', value: 1593, offset: 58 },
  { name: 'lib-026-record-059', value: 1620, offset: 59 },
  { name: 'lib-026-record-060', value: 1647, offset: 60 },
  { name: 'lib-026-record-061', value: 1674, offset: 61 },
  { name: 'lib-026-record-062', value: 1701, offset: 62 },
  { name: 'lib-026-record-063', value: 1728, offset: 63 },
];
export const total = sumBy(rows, 'value') + total016 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-026',
  standalone: true,
  imports: [Lib016Component, Lib000Component],
  template: `<section><h2>lib-026: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-016 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib026Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
