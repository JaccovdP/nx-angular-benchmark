import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib037Component, total as total037 } from '@bench/lib-037';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-047-record-000', value: 48, offset: 0 },
  { name: 'lib-047-record-001', value: 96, offset: 1 },
  { name: 'lib-047-record-002', value: 144, offset: 2 },
  { name: 'lib-047-record-003', value: 192, offset: 3 },
  { name: 'lib-047-record-004', value: 240, offset: 4 },
  { name: 'lib-047-record-005', value: 288, offset: 5 },
  { name: 'lib-047-record-006', value: 336, offset: 6 },
  { name: 'lib-047-record-007', value: 384, offset: 7 },
  { name: 'lib-047-record-008', value: 432, offset: 8 },
  { name: 'lib-047-record-009', value: 480, offset: 9 },
  { name: 'lib-047-record-010', value: 528, offset: 10 },
  { name: 'lib-047-record-011', value: 576, offset: 11 },
  { name: 'lib-047-record-012', value: 624, offset: 12 },
  { name: 'lib-047-record-013', value: 672, offset: 13 },
  { name: 'lib-047-record-014', value: 720, offset: 14 },
  { name: 'lib-047-record-015', value: 768, offset: 15 },
  { name: 'lib-047-record-016', value: 816, offset: 16 },
  { name: 'lib-047-record-017', value: 864, offset: 17 },
  { name: 'lib-047-record-018', value: 912, offset: 18 },
  { name: 'lib-047-record-019', value: 960, offset: 19 },
  { name: 'lib-047-record-020', value: 1008, offset: 20 },
  { name: 'lib-047-record-021', value: 1056, offset: 21 },
  { name: 'lib-047-record-022', value: 1104, offset: 22 },
  { name: 'lib-047-record-023', value: 1152, offset: 23 },
  { name: 'lib-047-record-024', value: 1200, offset: 24 },
  { name: 'lib-047-record-025', value: 1248, offset: 25 },
  { name: 'lib-047-record-026', value: 1296, offset: 26 },
  { name: 'lib-047-record-027', value: 1344, offset: 27 },
  { name: 'lib-047-record-028', value: 1392, offset: 28 },
  { name: 'lib-047-record-029', value: 1440, offset: 29 },
  { name: 'lib-047-record-030', value: 1488, offset: 30 },
  { name: 'lib-047-record-031', value: 1536, offset: 31 },
  { name: 'lib-047-record-032', value: 1584, offset: 32 },
  { name: 'lib-047-record-033', value: 1632, offset: 33 },
  { name: 'lib-047-record-034', value: 1680, offset: 34 },
  { name: 'lib-047-record-035', value: 1728, offset: 35 },
  { name: 'lib-047-record-036', value: 1776, offset: 36 },
  { name: 'lib-047-record-037', value: 1824, offset: 37 },
  { name: 'lib-047-record-038', value: 1872, offset: 38 },
  { name: 'lib-047-record-039', value: 1920, offset: 39 },
  { name: 'lib-047-record-040', value: 1968, offset: 40 },
  { name: 'lib-047-record-041', value: 2016, offset: 41 },
  { name: 'lib-047-record-042', value: 2064, offset: 42 },
  { name: 'lib-047-record-043', value: 2112, offset: 43 },
  { name: 'lib-047-record-044', value: 2160, offset: 44 },
  { name: 'lib-047-record-045', value: 2208, offset: 45 },
  { name: 'lib-047-record-046', value: 2256, offset: 46 },
  { name: 'lib-047-record-047', value: 2304, offset: 47 },
  { name: 'lib-047-record-048', value: 2352, offset: 48 },
  { name: 'lib-047-record-049', value: 2400, offset: 49 },
  { name: 'lib-047-record-050', value: 2448, offset: 50 },
  { name: 'lib-047-record-051', value: 2496, offset: 51 },
  { name: 'lib-047-record-052', value: 2544, offset: 52 },
  { name: 'lib-047-record-053', value: 2592, offset: 53 },
  { name: 'lib-047-record-054', value: 2640, offset: 54 },
  { name: 'lib-047-record-055', value: 2688, offset: 55 },
  { name: 'lib-047-record-056', value: 2736, offset: 56 },
  { name: 'lib-047-record-057', value: 2784, offset: 57 },
  { name: 'lib-047-record-058', value: 2832, offset: 58 },
  { name: 'lib-047-record-059', value: 2880, offset: 59 },
  { name: 'lib-047-record-060', value: 2928, offset: 60 },
  { name: 'lib-047-record-061', value: 2976, offset: 61 },
  { name: 'lib-047-record-062', value: 3024, offset: 62 },
  { name: 'lib-047-record-063', value: 3072, offset: 63 },
];
export const total = sumBy(rows, 'value') + total037 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-047',
  standalone: true,
  imports: [Lib037Component, Lib000Component],
  template: `<section><h2>lib-047: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-037 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib047Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
