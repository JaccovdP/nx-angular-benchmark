import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib055Component, total as total055 } from '@bench/lib-055';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-065-record-000', value: 66, offset: 0 },
  { name: 'lib-065-record-001', value: 132, offset: 1 },
  { name: 'lib-065-record-002', value: 198, offset: 2 },
  { name: 'lib-065-record-003', value: 264, offset: 3 },
  { name: 'lib-065-record-004', value: 330, offset: 4 },
  { name: 'lib-065-record-005', value: 396, offset: 5 },
  { name: 'lib-065-record-006', value: 462, offset: 6 },
  { name: 'lib-065-record-007', value: 528, offset: 7 },
  { name: 'lib-065-record-008', value: 594, offset: 8 },
  { name: 'lib-065-record-009', value: 660, offset: 9 },
  { name: 'lib-065-record-010', value: 726, offset: 10 },
  { name: 'lib-065-record-011', value: 792, offset: 11 },
  { name: 'lib-065-record-012', value: 858, offset: 12 },
  { name: 'lib-065-record-013', value: 924, offset: 13 },
  { name: 'lib-065-record-014', value: 990, offset: 14 },
  { name: 'lib-065-record-015', value: 1056, offset: 15 },
  { name: 'lib-065-record-016', value: 1122, offset: 16 },
  { name: 'lib-065-record-017', value: 1188, offset: 17 },
  { name: 'lib-065-record-018', value: 1254, offset: 18 },
  { name: 'lib-065-record-019', value: 1320, offset: 19 },
  { name: 'lib-065-record-020', value: 1386, offset: 20 },
  { name: 'lib-065-record-021', value: 1452, offset: 21 },
  { name: 'lib-065-record-022', value: 1518, offset: 22 },
  { name: 'lib-065-record-023', value: 1584, offset: 23 },
  { name: 'lib-065-record-024', value: 1650, offset: 24 },
  { name: 'lib-065-record-025', value: 1716, offset: 25 },
  { name: 'lib-065-record-026', value: 1782, offset: 26 },
  { name: 'lib-065-record-027', value: 1848, offset: 27 },
  { name: 'lib-065-record-028', value: 1914, offset: 28 },
  { name: 'lib-065-record-029', value: 1980, offset: 29 },
  { name: 'lib-065-record-030', value: 2046, offset: 30 },
  { name: 'lib-065-record-031', value: 2112, offset: 31 },
  { name: 'lib-065-record-032', value: 2178, offset: 32 },
  { name: 'lib-065-record-033', value: 2244, offset: 33 },
  { name: 'lib-065-record-034', value: 2310, offset: 34 },
  { name: 'lib-065-record-035', value: 2376, offset: 35 },
  { name: 'lib-065-record-036', value: 2442, offset: 36 },
  { name: 'lib-065-record-037', value: 2508, offset: 37 },
  { name: 'lib-065-record-038', value: 2574, offset: 38 },
  { name: 'lib-065-record-039', value: 2640, offset: 39 },
  { name: 'lib-065-record-040', value: 2706, offset: 40 },
  { name: 'lib-065-record-041', value: 2772, offset: 41 },
  { name: 'lib-065-record-042', value: 2838, offset: 42 },
  { name: 'lib-065-record-043', value: 2904, offset: 43 },
  { name: 'lib-065-record-044', value: 2970, offset: 44 },
  { name: 'lib-065-record-045', value: 3036, offset: 45 },
  { name: 'lib-065-record-046', value: 3102, offset: 46 },
  { name: 'lib-065-record-047', value: 3168, offset: 47 },
  { name: 'lib-065-record-048', value: 3234, offset: 48 },
  { name: 'lib-065-record-049', value: 3300, offset: 49 },
  { name: 'lib-065-record-050', value: 3366, offset: 50 },
  { name: 'lib-065-record-051', value: 3432, offset: 51 },
  { name: 'lib-065-record-052', value: 3498, offset: 52 },
  { name: 'lib-065-record-053', value: 3564, offset: 53 },
  { name: 'lib-065-record-054', value: 3630, offset: 54 },
  { name: 'lib-065-record-055', value: 3696, offset: 55 },
  { name: 'lib-065-record-056', value: 3762, offset: 56 },
  { name: 'lib-065-record-057', value: 3828, offset: 57 },
  { name: 'lib-065-record-058', value: 3894, offset: 58 },
  { name: 'lib-065-record-059', value: 3960, offset: 59 },
  { name: 'lib-065-record-060', value: 4026, offset: 60 },
  { name: 'lib-065-record-061', value: 4092, offset: 61 },
  { name: 'lib-065-record-062', value: 4158, offset: 62 },
  { name: 'lib-065-record-063', value: 4224, offset: 63 },
];
export const total = sumBy(rows, 'value') + total055 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-065',
  standalone: true,
  imports: [Lib055Component, Lib000Component],
  template: `<section><h2>lib-065: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-055 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib065Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
