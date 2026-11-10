import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib051Component, total as total051 } from '@bench/lib-051';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-061-record-000', value: 62, offset: 0 },
  { name: 'lib-061-record-001', value: 124, offset: 1 },
  { name: 'lib-061-record-002', value: 186, offset: 2 },
  { name: 'lib-061-record-003', value: 248, offset: 3 },
  { name: 'lib-061-record-004', value: 310, offset: 4 },
  { name: 'lib-061-record-005', value: 372, offset: 5 },
  { name: 'lib-061-record-006', value: 434, offset: 6 },
  { name: 'lib-061-record-007', value: 496, offset: 7 },
  { name: 'lib-061-record-008', value: 558, offset: 8 },
  { name: 'lib-061-record-009', value: 620, offset: 9 },
  { name: 'lib-061-record-010', value: 682, offset: 10 },
  { name: 'lib-061-record-011', value: 744, offset: 11 },
  { name: 'lib-061-record-012', value: 806, offset: 12 },
  { name: 'lib-061-record-013', value: 868, offset: 13 },
  { name: 'lib-061-record-014', value: 930, offset: 14 },
  { name: 'lib-061-record-015', value: 992, offset: 15 },
  { name: 'lib-061-record-016', value: 1054, offset: 16 },
  { name: 'lib-061-record-017', value: 1116, offset: 17 },
  { name: 'lib-061-record-018', value: 1178, offset: 18 },
  { name: 'lib-061-record-019', value: 1240, offset: 19 },
  { name: 'lib-061-record-020', value: 1302, offset: 20 },
  { name: 'lib-061-record-021', value: 1364, offset: 21 },
  { name: 'lib-061-record-022', value: 1426, offset: 22 },
  { name: 'lib-061-record-023', value: 1488, offset: 23 },
  { name: 'lib-061-record-024', value: 1550, offset: 24 },
  { name: 'lib-061-record-025', value: 1612, offset: 25 },
  { name: 'lib-061-record-026', value: 1674, offset: 26 },
  { name: 'lib-061-record-027', value: 1736, offset: 27 },
  { name: 'lib-061-record-028', value: 1798, offset: 28 },
  { name: 'lib-061-record-029', value: 1860, offset: 29 },
  { name: 'lib-061-record-030', value: 1922, offset: 30 },
  { name: 'lib-061-record-031', value: 1984, offset: 31 },
  { name: 'lib-061-record-032', value: 2046, offset: 32 },
  { name: 'lib-061-record-033', value: 2108, offset: 33 },
  { name: 'lib-061-record-034', value: 2170, offset: 34 },
  { name: 'lib-061-record-035', value: 2232, offset: 35 },
  { name: 'lib-061-record-036', value: 2294, offset: 36 },
  { name: 'lib-061-record-037', value: 2356, offset: 37 },
  { name: 'lib-061-record-038', value: 2418, offset: 38 },
  { name: 'lib-061-record-039', value: 2480, offset: 39 },
  { name: 'lib-061-record-040', value: 2542, offset: 40 },
  { name: 'lib-061-record-041', value: 2604, offset: 41 },
  { name: 'lib-061-record-042', value: 2666, offset: 42 },
  { name: 'lib-061-record-043', value: 2728, offset: 43 },
  { name: 'lib-061-record-044', value: 2790, offset: 44 },
  { name: 'lib-061-record-045', value: 2852, offset: 45 },
  { name: 'lib-061-record-046', value: 2914, offset: 46 },
  { name: 'lib-061-record-047', value: 2976, offset: 47 },
  { name: 'lib-061-record-048', value: 3038, offset: 48 },
  { name: 'lib-061-record-049', value: 3100, offset: 49 },
  { name: 'lib-061-record-050', value: 3162, offset: 50 },
  { name: 'lib-061-record-051', value: 3224, offset: 51 },
  { name: 'lib-061-record-052', value: 3286, offset: 52 },
  { name: 'lib-061-record-053', value: 3348, offset: 53 },
  { name: 'lib-061-record-054', value: 3410, offset: 54 },
  { name: 'lib-061-record-055', value: 3472, offset: 55 },
  { name: 'lib-061-record-056', value: 3534, offset: 56 },
  { name: 'lib-061-record-057', value: 3596, offset: 57 },
  { name: 'lib-061-record-058', value: 3658, offset: 58 },
  { name: 'lib-061-record-059', value: 3720, offset: 59 },
  { name: 'lib-061-record-060', value: 3782, offset: 60 },
  { name: 'lib-061-record-061', value: 3844, offset: 61 },
  { name: 'lib-061-record-062', value: 3906, offset: 62 },
  { name: 'lib-061-record-063', value: 3968, offset: 63 },
];
export const total = sumBy(rows, 'value') + total051 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-061',
  standalone: true,
  imports: [Lib051Component, Lib000Component],
  template: `<section><h2>lib-061: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-051 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib061Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
