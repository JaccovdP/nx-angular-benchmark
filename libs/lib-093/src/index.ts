import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib083Component, total as total083 } from '@bench/lib-083';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-093-record-000', value: 94, offset: 0 },
  { name: 'lib-093-record-001', value: 188, offset: 1 },
  { name: 'lib-093-record-002', value: 282, offset: 2 },
  { name: 'lib-093-record-003', value: 376, offset: 3 },
  { name: 'lib-093-record-004', value: 470, offset: 4 },
  { name: 'lib-093-record-005', value: 564, offset: 5 },
  { name: 'lib-093-record-006', value: 658, offset: 6 },
  { name: 'lib-093-record-007', value: 752, offset: 7 },
  { name: 'lib-093-record-008', value: 846, offset: 8 },
  { name: 'lib-093-record-009', value: 940, offset: 9 },
  { name: 'lib-093-record-010', value: 1034, offset: 10 },
  { name: 'lib-093-record-011', value: 1128, offset: 11 },
  { name: 'lib-093-record-012', value: 1222, offset: 12 },
  { name: 'lib-093-record-013', value: 1316, offset: 13 },
  { name: 'lib-093-record-014', value: 1410, offset: 14 },
  { name: 'lib-093-record-015', value: 1504, offset: 15 },
  { name: 'lib-093-record-016', value: 1598, offset: 16 },
  { name: 'lib-093-record-017', value: 1692, offset: 17 },
  { name: 'lib-093-record-018', value: 1786, offset: 18 },
  { name: 'lib-093-record-019', value: 1880, offset: 19 },
  { name: 'lib-093-record-020', value: 1974, offset: 20 },
  { name: 'lib-093-record-021', value: 2068, offset: 21 },
  { name: 'lib-093-record-022', value: 2162, offset: 22 },
  { name: 'lib-093-record-023', value: 2256, offset: 23 },
  { name: 'lib-093-record-024', value: 2350, offset: 24 },
  { name: 'lib-093-record-025', value: 2444, offset: 25 },
  { name: 'lib-093-record-026', value: 2538, offset: 26 },
  { name: 'lib-093-record-027', value: 2632, offset: 27 },
  { name: 'lib-093-record-028', value: 2726, offset: 28 },
  { name: 'lib-093-record-029', value: 2820, offset: 29 },
  { name: 'lib-093-record-030', value: 2914, offset: 30 },
  { name: 'lib-093-record-031', value: 3008, offset: 31 },
  { name: 'lib-093-record-032', value: 3102, offset: 32 },
  { name: 'lib-093-record-033', value: 3196, offset: 33 },
  { name: 'lib-093-record-034', value: 3290, offset: 34 },
  { name: 'lib-093-record-035', value: 3384, offset: 35 },
  { name: 'lib-093-record-036', value: 3478, offset: 36 },
  { name: 'lib-093-record-037', value: 3572, offset: 37 },
  { name: 'lib-093-record-038', value: 3666, offset: 38 },
  { name: 'lib-093-record-039', value: 3760, offset: 39 },
  { name: 'lib-093-record-040', value: 3854, offset: 40 },
  { name: 'lib-093-record-041', value: 3948, offset: 41 },
  { name: 'lib-093-record-042', value: 4042, offset: 42 },
  { name: 'lib-093-record-043', value: 4136, offset: 43 },
  { name: 'lib-093-record-044', value: 4230, offset: 44 },
  { name: 'lib-093-record-045', value: 4324, offset: 45 },
  { name: 'lib-093-record-046', value: 4418, offset: 46 },
  { name: 'lib-093-record-047', value: 4512, offset: 47 },
  { name: 'lib-093-record-048', value: 4606, offset: 48 },
  { name: 'lib-093-record-049', value: 4700, offset: 49 },
  { name: 'lib-093-record-050', value: 4794, offset: 50 },
  { name: 'lib-093-record-051', value: 4888, offset: 51 },
  { name: 'lib-093-record-052', value: 4982, offset: 52 },
  { name: 'lib-093-record-053', value: 5076, offset: 53 },
  { name: 'lib-093-record-054', value: 5170, offset: 54 },
  { name: 'lib-093-record-055', value: 5264, offset: 55 },
  { name: 'lib-093-record-056', value: 5358, offset: 56 },
  { name: 'lib-093-record-057', value: 5452, offset: 57 },
  { name: 'lib-093-record-058', value: 5546, offset: 58 },
  { name: 'lib-093-record-059', value: 5640, offset: 59 },
  { name: 'lib-093-record-060', value: 5734, offset: 60 },
  { name: 'lib-093-record-061', value: 5828, offset: 61 },
  { name: 'lib-093-record-062', value: 5922, offset: 62 },
  { name: 'lib-093-record-063', value: 6016, offset: 63 },
];
export const total = sumBy(rows, 'value') + total083 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-093',
  standalone: true,
  imports: [Lib083Component, Lib000Component],
  template: `<section><h2>lib-093: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-083 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib093Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
