import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib045Component, total as total045 } from '@bench/lib-045';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-055-record-000', value: 56, offset: 0 },
  { name: 'lib-055-record-001', value: 112, offset: 1 },
  { name: 'lib-055-record-002', value: 168, offset: 2 },
  { name: 'lib-055-record-003', value: 224, offset: 3 },
  { name: 'lib-055-record-004', value: 280, offset: 4 },
  { name: 'lib-055-record-005', value: 336, offset: 5 },
  { name: 'lib-055-record-006', value: 392, offset: 6 },
  { name: 'lib-055-record-007', value: 448, offset: 7 },
  { name: 'lib-055-record-008', value: 504, offset: 8 },
  { name: 'lib-055-record-009', value: 560, offset: 9 },
  { name: 'lib-055-record-010', value: 616, offset: 10 },
  { name: 'lib-055-record-011', value: 672, offset: 11 },
  { name: 'lib-055-record-012', value: 728, offset: 12 },
  { name: 'lib-055-record-013', value: 784, offset: 13 },
  { name: 'lib-055-record-014', value: 840, offset: 14 },
  { name: 'lib-055-record-015', value: 896, offset: 15 },
  { name: 'lib-055-record-016', value: 952, offset: 16 },
  { name: 'lib-055-record-017', value: 1008, offset: 17 },
  { name: 'lib-055-record-018', value: 1064, offset: 18 },
  { name: 'lib-055-record-019', value: 1120, offset: 19 },
  { name: 'lib-055-record-020', value: 1176, offset: 20 },
  { name: 'lib-055-record-021', value: 1232, offset: 21 },
  { name: 'lib-055-record-022', value: 1288, offset: 22 },
  { name: 'lib-055-record-023', value: 1344, offset: 23 },
  { name: 'lib-055-record-024', value: 1400, offset: 24 },
  { name: 'lib-055-record-025', value: 1456, offset: 25 },
  { name: 'lib-055-record-026', value: 1512, offset: 26 },
  { name: 'lib-055-record-027', value: 1568, offset: 27 },
  { name: 'lib-055-record-028', value: 1624, offset: 28 },
  { name: 'lib-055-record-029', value: 1680, offset: 29 },
  { name: 'lib-055-record-030', value: 1736, offset: 30 },
  { name: 'lib-055-record-031', value: 1792, offset: 31 },
  { name: 'lib-055-record-032', value: 1848, offset: 32 },
  { name: 'lib-055-record-033', value: 1904, offset: 33 },
  { name: 'lib-055-record-034', value: 1960, offset: 34 },
  { name: 'lib-055-record-035', value: 2016, offset: 35 },
  { name: 'lib-055-record-036', value: 2072, offset: 36 },
  { name: 'lib-055-record-037', value: 2128, offset: 37 },
  { name: 'lib-055-record-038', value: 2184, offset: 38 },
  { name: 'lib-055-record-039', value: 2240, offset: 39 },
  { name: 'lib-055-record-040', value: 2296, offset: 40 },
  { name: 'lib-055-record-041', value: 2352, offset: 41 },
  { name: 'lib-055-record-042', value: 2408, offset: 42 },
  { name: 'lib-055-record-043', value: 2464, offset: 43 },
  { name: 'lib-055-record-044', value: 2520, offset: 44 },
  { name: 'lib-055-record-045', value: 2576, offset: 45 },
  { name: 'lib-055-record-046', value: 2632, offset: 46 },
  { name: 'lib-055-record-047', value: 2688, offset: 47 },
  { name: 'lib-055-record-048', value: 2744, offset: 48 },
  { name: 'lib-055-record-049', value: 2800, offset: 49 },
  { name: 'lib-055-record-050', value: 2856, offset: 50 },
  { name: 'lib-055-record-051', value: 2912, offset: 51 },
  { name: 'lib-055-record-052', value: 2968, offset: 52 },
  { name: 'lib-055-record-053', value: 3024, offset: 53 },
  { name: 'lib-055-record-054', value: 3080, offset: 54 },
  { name: 'lib-055-record-055', value: 3136, offset: 55 },
  { name: 'lib-055-record-056', value: 3192, offset: 56 },
  { name: 'lib-055-record-057', value: 3248, offset: 57 },
  { name: 'lib-055-record-058', value: 3304, offset: 58 },
  { name: 'lib-055-record-059', value: 3360, offset: 59 },
  { name: 'lib-055-record-060', value: 3416, offset: 60 },
  { name: 'lib-055-record-061', value: 3472, offset: 61 },
  { name: 'lib-055-record-062', value: 3528, offset: 62 },
  { name: 'lib-055-record-063', value: 3584, offset: 63 },
];
export const total = sumBy(rows, 'value') + total045 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-055',
  standalone: true,
  imports: [Lib045Component, Lib000Component],
  template: `<section><h2>lib-055: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-045 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib055Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
