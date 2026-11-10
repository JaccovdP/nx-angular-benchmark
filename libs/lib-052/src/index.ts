import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib042Component, total as total042 } from '@bench/lib-042';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-052-record-000', value: 53, offset: 0 },
  { name: 'lib-052-record-001', value: 106, offset: 1 },
  { name: 'lib-052-record-002', value: 159, offset: 2 },
  { name: 'lib-052-record-003', value: 212, offset: 3 },
  { name: 'lib-052-record-004', value: 265, offset: 4 },
  { name: 'lib-052-record-005', value: 318, offset: 5 },
  { name: 'lib-052-record-006', value: 371, offset: 6 },
  { name: 'lib-052-record-007', value: 424, offset: 7 },
  { name: 'lib-052-record-008', value: 477, offset: 8 },
  { name: 'lib-052-record-009', value: 530, offset: 9 },
  { name: 'lib-052-record-010', value: 583, offset: 10 },
  { name: 'lib-052-record-011', value: 636, offset: 11 },
  { name: 'lib-052-record-012', value: 689, offset: 12 },
  { name: 'lib-052-record-013', value: 742, offset: 13 },
  { name: 'lib-052-record-014', value: 795, offset: 14 },
  { name: 'lib-052-record-015', value: 848, offset: 15 },
  { name: 'lib-052-record-016', value: 901, offset: 16 },
  { name: 'lib-052-record-017', value: 954, offset: 17 },
  { name: 'lib-052-record-018', value: 1007, offset: 18 },
  { name: 'lib-052-record-019', value: 1060, offset: 19 },
  { name: 'lib-052-record-020', value: 1113, offset: 20 },
  { name: 'lib-052-record-021', value: 1166, offset: 21 },
  { name: 'lib-052-record-022', value: 1219, offset: 22 },
  { name: 'lib-052-record-023', value: 1272, offset: 23 },
  { name: 'lib-052-record-024', value: 1325, offset: 24 },
  { name: 'lib-052-record-025', value: 1378, offset: 25 },
  { name: 'lib-052-record-026', value: 1431, offset: 26 },
  { name: 'lib-052-record-027', value: 1484, offset: 27 },
  { name: 'lib-052-record-028', value: 1537, offset: 28 },
  { name: 'lib-052-record-029', value: 1590, offset: 29 },
  { name: 'lib-052-record-030', value: 1643, offset: 30 },
  { name: 'lib-052-record-031', value: 1696, offset: 31 },
  { name: 'lib-052-record-032', value: 1749, offset: 32 },
  { name: 'lib-052-record-033', value: 1802, offset: 33 },
  { name: 'lib-052-record-034', value: 1855, offset: 34 },
  { name: 'lib-052-record-035', value: 1908, offset: 35 },
  { name: 'lib-052-record-036', value: 1961, offset: 36 },
  { name: 'lib-052-record-037', value: 2014, offset: 37 },
  { name: 'lib-052-record-038', value: 2067, offset: 38 },
  { name: 'lib-052-record-039', value: 2120, offset: 39 },
  { name: 'lib-052-record-040', value: 2173, offset: 40 },
  { name: 'lib-052-record-041', value: 2226, offset: 41 },
  { name: 'lib-052-record-042', value: 2279, offset: 42 },
  { name: 'lib-052-record-043', value: 2332, offset: 43 },
  { name: 'lib-052-record-044', value: 2385, offset: 44 },
  { name: 'lib-052-record-045', value: 2438, offset: 45 },
  { name: 'lib-052-record-046', value: 2491, offset: 46 },
  { name: 'lib-052-record-047', value: 2544, offset: 47 },
  { name: 'lib-052-record-048', value: 2597, offset: 48 },
  { name: 'lib-052-record-049', value: 2650, offset: 49 },
  { name: 'lib-052-record-050', value: 2703, offset: 50 },
  { name: 'lib-052-record-051', value: 2756, offset: 51 },
  { name: 'lib-052-record-052', value: 2809, offset: 52 },
  { name: 'lib-052-record-053', value: 2862, offset: 53 },
  { name: 'lib-052-record-054', value: 2915, offset: 54 },
  { name: 'lib-052-record-055', value: 2968, offset: 55 },
  { name: 'lib-052-record-056', value: 3021, offset: 56 },
  { name: 'lib-052-record-057', value: 3074, offset: 57 },
  { name: 'lib-052-record-058', value: 3127, offset: 58 },
  { name: 'lib-052-record-059', value: 3180, offset: 59 },
  { name: 'lib-052-record-060', value: 3233, offset: 60 },
  { name: 'lib-052-record-061', value: 3286, offset: 61 },
  { name: 'lib-052-record-062', value: 3339, offset: 62 },
  { name: 'lib-052-record-063', value: 3392, offset: 63 },
];
export const total = sumBy(rows, 'value') + total042 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-052',
  standalone: true,
  imports: [Lib042Component, Lib000Component],
  template: `<section><h2>lib-052: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-042 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib052Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
