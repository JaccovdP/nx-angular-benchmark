import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib012Component, total as total012 } from '@bench/lib-012';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-022-record-000', value: 23, offset: 0 },
  { name: 'lib-022-record-001', value: 46, offset: 1 },
  { name: 'lib-022-record-002', value: 69, offset: 2 },
  { name: 'lib-022-record-003', value: 92, offset: 3 },
  { name: 'lib-022-record-004', value: 115, offset: 4 },
  { name: 'lib-022-record-005', value: 138, offset: 5 },
  { name: 'lib-022-record-006', value: 161, offset: 6 },
  { name: 'lib-022-record-007', value: 184, offset: 7 },
  { name: 'lib-022-record-008', value: 207, offset: 8 },
  { name: 'lib-022-record-009', value: 230, offset: 9 },
  { name: 'lib-022-record-010', value: 253, offset: 10 },
  { name: 'lib-022-record-011', value: 276, offset: 11 },
  { name: 'lib-022-record-012', value: 299, offset: 12 },
  { name: 'lib-022-record-013', value: 322, offset: 13 },
  { name: 'lib-022-record-014', value: 345, offset: 14 },
  { name: 'lib-022-record-015', value: 368, offset: 15 },
  { name: 'lib-022-record-016', value: 391, offset: 16 },
  { name: 'lib-022-record-017', value: 414, offset: 17 },
  { name: 'lib-022-record-018', value: 437, offset: 18 },
  { name: 'lib-022-record-019', value: 460, offset: 19 },
  { name: 'lib-022-record-020', value: 483, offset: 20 },
  { name: 'lib-022-record-021', value: 506, offset: 21 },
  { name: 'lib-022-record-022', value: 529, offset: 22 },
  { name: 'lib-022-record-023', value: 552, offset: 23 },
  { name: 'lib-022-record-024', value: 575, offset: 24 },
  { name: 'lib-022-record-025', value: 598, offset: 25 },
  { name: 'lib-022-record-026', value: 621, offset: 26 },
  { name: 'lib-022-record-027', value: 644, offset: 27 },
  { name: 'lib-022-record-028', value: 667, offset: 28 },
  { name: 'lib-022-record-029', value: 690, offset: 29 },
  { name: 'lib-022-record-030', value: 713, offset: 30 },
  { name: 'lib-022-record-031', value: 736, offset: 31 },
  { name: 'lib-022-record-032', value: 759, offset: 32 },
  { name: 'lib-022-record-033', value: 782, offset: 33 },
  { name: 'lib-022-record-034', value: 805, offset: 34 },
  { name: 'lib-022-record-035', value: 828, offset: 35 },
  { name: 'lib-022-record-036', value: 851, offset: 36 },
  { name: 'lib-022-record-037', value: 874, offset: 37 },
  { name: 'lib-022-record-038', value: 897, offset: 38 },
  { name: 'lib-022-record-039', value: 920, offset: 39 },
  { name: 'lib-022-record-040', value: 943, offset: 40 },
  { name: 'lib-022-record-041', value: 966, offset: 41 },
  { name: 'lib-022-record-042', value: 989, offset: 42 },
  { name: 'lib-022-record-043', value: 1012, offset: 43 },
  { name: 'lib-022-record-044', value: 1035, offset: 44 },
  { name: 'lib-022-record-045', value: 1058, offset: 45 },
  { name: 'lib-022-record-046', value: 1081, offset: 46 },
  { name: 'lib-022-record-047', value: 1104, offset: 47 },
  { name: 'lib-022-record-048', value: 1127, offset: 48 },
  { name: 'lib-022-record-049', value: 1150, offset: 49 },
  { name: 'lib-022-record-050', value: 1173, offset: 50 },
  { name: 'lib-022-record-051', value: 1196, offset: 51 },
  { name: 'lib-022-record-052', value: 1219, offset: 52 },
  { name: 'lib-022-record-053', value: 1242, offset: 53 },
  { name: 'lib-022-record-054', value: 1265, offset: 54 },
  { name: 'lib-022-record-055', value: 1288, offset: 55 },
  { name: 'lib-022-record-056', value: 1311, offset: 56 },
  { name: 'lib-022-record-057', value: 1334, offset: 57 },
  { name: 'lib-022-record-058', value: 1357, offset: 58 },
  { name: 'lib-022-record-059', value: 1380, offset: 59 },
  { name: 'lib-022-record-060', value: 1403, offset: 60 },
  { name: 'lib-022-record-061', value: 1426, offset: 61 },
  { name: 'lib-022-record-062', value: 1449, offset: 62 },
  { name: 'lib-022-record-063', value: 1472, offset: 63 },
];
export const total = sumBy(rows, 'value') + total012 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-022',
  standalone: true,
  imports: [Lib012Component, Lib000Component],
  template: `<section><h2>lib-022: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-012 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib022Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
