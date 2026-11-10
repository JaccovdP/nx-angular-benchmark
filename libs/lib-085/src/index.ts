import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib075Component, total as total075 } from '@bench/lib-075';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-085-record-000', value: 86, offset: 0 },
  { name: 'lib-085-record-001', value: 172, offset: 1 },
  { name: 'lib-085-record-002', value: 258, offset: 2 },
  { name: 'lib-085-record-003', value: 344, offset: 3 },
  { name: 'lib-085-record-004', value: 430, offset: 4 },
  { name: 'lib-085-record-005', value: 516, offset: 5 },
  { name: 'lib-085-record-006', value: 602, offset: 6 },
  { name: 'lib-085-record-007', value: 688, offset: 7 },
  { name: 'lib-085-record-008', value: 774, offset: 8 },
  { name: 'lib-085-record-009', value: 860, offset: 9 },
  { name: 'lib-085-record-010', value: 946, offset: 10 },
  { name: 'lib-085-record-011', value: 1032, offset: 11 },
  { name: 'lib-085-record-012', value: 1118, offset: 12 },
  { name: 'lib-085-record-013', value: 1204, offset: 13 },
  { name: 'lib-085-record-014', value: 1290, offset: 14 },
  { name: 'lib-085-record-015', value: 1376, offset: 15 },
  { name: 'lib-085-record-016', value: 1462, offset: 16 },
  { name: 'lib-085-record-017', value: 1548, offset: 17 },
  { name: 'lib-085-record-018', value: 1634, offset: 18 },
  { name: 'lib-085-record-019', value: 1720, offset: 19 },
  { name: 'lib-085-record-020', value: 1806, offset: 20 },
  { name: 'lib-085-record-021', value: 1892, offset: 21 },
  { name: 'lib-085-record-022', value: 1978, offset: 22 },
  { name: 'lib-085-record-023', value: 2064, offset: 23 },
  { name: 'lib-085-record-024', value: 2150, offset: 24 },
  { name: 'lib-085-record-025', value: 2236, offset: 25 },
  { name: 'lib-085-record-026', value: 2322, offset: 26 },
  { name: 'lib-085-record-027', value: 2408, offset: 27 },
  { name: 'lib-085-record-028', value: 2494, offset: 28 },
  { name: 'lib-085-record-029', value: 2580, offset: 29 },
  { name: 'lib-085-record-030', value: 2666, offset: 30 },
  { name: 'lib-085-record-031', value: 2752, offset: 31 },
  { name: 'lib-085-record-032', value: 2838, offset: 32 },
  { name: 'lib-085-record-033', value: 2924, offset: 33 },
  { name: 'lib-085-record-034', value: 3010, offset: 34 },
  { name: 'lib-085-record-035', value: 3096, offset: 35 },
  { name: 'lib-085-record-036', value: 3182, offset: 36 },
  { name: 'lib-085-record-037', value: 3268, offset: 37 },
  { name: 'lib-085-record-038', value: 3354, offset: 38 },
  { name: 'lib-085-record-039', value: 3440, offset: 39 },
  { name: 'lib-085-record-040', value: 3526, offset: 40 },
  { name: 'lib-085-record-041', value: 3612, offset: 41 },
  { name: 'lib-085-record-042', value: 3698, offset: 42 },
  { name: 'lib-085-record-043', value: 3784, offset: 43 },
  { name: 'lib-085-record-044', value: 3870, offset: 44 },
  { name: 'lib-085-record-045', value: 3956, offset: 45 },
  { name: 'lib-085-record-046', value: 4042, offset: 46 },
  { name: 'lib-085-record-047', value: 4128, offset: 47 },
  { name: 'lib-085-record-048', value: 4214, offset: 48 },
  { name: 'lib-085-record-049', value: 4300, offset: 49 },
  { name: 'lib-085-record-050', value: 4386, offset: 50 },
  { name: 'lib-085-record-051', value: 4472, offset: 51 },
  { name: 'lib-085-record-052', value: 4558, offset: 52 },
  { name: 'lib-085-record-053', value: 4644, offset: 53 },
  { name: 'lib-085-record-054', value: 4730, offset: 54 },
  { name: 'lib-085-record-055', value: 4816, offset: 55 },
  { name: 'lib-085-record-056', value: 4902, offset: 56 },
  { name: 'lib-085-record-057', value: 4988, offset: 57 },
  { name: 'lib-085-record-058', value: 5074, offset: 58 },
  { name: 'lib-085-record-059', value: 5160, offset: 59 },
  { name: 'lib-085-record-060', value: 5246, offset: 60 },
  { name: 'lib-085-record-061', value: 5332, offset: 61 },
  { name: 'lib-085-record-062', value: 5418, offset: 62 },
  { name: 'lib-085-record-063', value: 5504, offset: 63 },
];
export const total = sumBy(rows, 'value') + total075 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-085',
  standalone: true,
  imports: [Lib075Component, Lib000Component],
  template: `<section><h2>lib-085: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-075 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib085Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
