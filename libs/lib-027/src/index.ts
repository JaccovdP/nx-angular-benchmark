import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib017Component, total as total017 } from '@bench/lib-017';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-027-record-000', value: 28, offset: 0 },
  { name: 'lib-027-record-001', value: 56, offset: 1 },
  { name: 'lib-027-record-002', value: 84, offset: 2 },
  { name: 'lib-027-record-003', value: 112, offset: 3 },
  { name: 'lib-027-record-004', value: 140, offset: 4 },
  { name: 'lib-027-record-005', value: 168, offset: 5 },
  { name: 'lib-027-record-006', value: 196, offset: 6 },
  { name: 'lib-027-record-007', value: 224, offset: 7 },
  { name: 'lib-027-record-008', value: 252, offset: 8 },
  { name: 'lib-027-record-009', value: 280, offset: 9 },
  { name: 'lib-027-record-010', value: 308, offset: 10 },
  { name: 'lib-027-record-011', value: 336, offset: 11 },
  { name: 'lib-027-record-012', value: 364, offset: 12 },
  { name: 'lib-027-record-013', value: 392, offset: 13 },
  { name: 'lib-027-record-014', value: 420, offset: 14 },
  { name: 'lib-027-record-015', value: 448, offset: 15 },
  { name: 'lib-027-record-016', value: 476, offset: 16 },
  { name: 'lib-027-record-017', value: 504, offset: 17 },
  { name: 'lib-027-record-018', value: 532, offset: 18 },
  { name: 'lib-027-record-019', value: 560, offset: 19 },
  { name: 'lib-027-record-020', value: 588, offset: 20 },
  { name: 'lib-027-record-021', value: 616, offset: 21 },
  { name: 'lib-027-record-022', value: 644, offset: 22 },
  { name: 'lib-027-record-023', value: 672, offset: 23 },
  { name: 'lib-027-record-024', value: 700, offset: 24 },
  { name: 'lib-027-record-025', value: 728, offset: 25 },
  { name: 'lib-027-record-026', value: 756, offset: 26 },
  { name: 'lib-027-record-027', value: 784, offset: 27 },
  { name: 'lib-027-record-028', value: 812, offset: 28 },
  { name: 'lib-027-record-029', value: 840, offset: 29 },
  { name: 'lib-027-record-030', value: 868, offset: 30 },
  { name: 'lib-027-record-031', value: 896, offset: 31 },
  { name: 'lib-027-record-032', value: 924, offset: 32 },
  { name: 'lib-027-record-033', value: 952, offset: 33 },
  { name: 'lib-027-record-034', value: 980, offset: 34 },
  { name: 'lib-027-record-035', value: 1008, offset: 35 },
  { name: 'lib-027-record-036', value: 1036, offset: 36 },
  { name: 'lib-027-record-037', value: 1064, offset: 37 },
  { name: 'lib-027-record-038', value: 1092, offset: 38 },
  { name: 'lib-027-record-039', value: 1120, offset: 39 },
  { name: 'lib-027-record-040', value: 1148, offset: 40 },
  { name: 'lib-027-record-041', value: 1176, offset: 41 },
  { name: 'lib-027-record-042', value: 1204, offset: 42 },
  { name: 'lib-027-record-043', value: 1232, offset: 43 },
  { name: 'lib-027-record-044', value: 1260, offset: 44 },
  { name: 'lib-027-record-045', value: 1288, offset: 45 },
  { name: 'lib-027-record-046', value: 1316, offset: 46 },
  { name: 'lib-027-record-047', value: 1344, offset: 47 },
  { name: 'lib-027-record-048', value: 1372, offset: 48 },
  { name: 'lib-027-record-049', value: 1400, offset: 49 },
  { name: 'lib-027-record-050', value: 1428, offset: 50 },
  { name: 'lib-027-record-051', value: 1456, offset: 51 },
  { name: 'lib-027-record-052', value: 1484, offset: 52 },
  { name: 'lib-027-record-053', value: 1512, offset: 53 },
  { name: 'lib-027-record-054', value: 1540, offset: 54 },
  { name: 'lib-027-record-055', value: 1568, offset: 55 },
  { name: 'lib-027-record-056', value: 1596, offset: 56 },
  { name: 'lib-027-record-057', value: 1624, offset: 57 },
  { name: 'lib-027-record-058', value: 1652, offset: 58 },
  { name: 'lib-027-record-059', value: 1680, offset: 59 },
  { name: 'lib-027-record-060', value: 1708, offset: 60 },
  { name: 'lib-027-record-061', value: 1736, offset: 61 },
  { name: 'lib-027-record-062', value: 1764, offset: 62 },
  { name: 'lib-027-record-063', value: 1792, offset: 63 },
];
export const total = sumBy(rows, 'value') + total017 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-027',
  standalone: true,
  imports: [Lib017Component, Lib000Component],
  template: `<section><h2>lib-027: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-017 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib027Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
