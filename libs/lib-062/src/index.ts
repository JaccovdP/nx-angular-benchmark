import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib052Component, total as total052 } from '@bench/lib-052';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-062-record-000', value: 63, offset: 0 },
  { name: 'lib-062-record-001', value: 126, offset: 1 },
  { name: 'lib-062-record-002', value: 189, offset: 2 },
  { name: 'lib-062-record-003', value: 252, offset: 3 },
  { name: 'lib-062-record-004', value: 315, offset: 4 },
  { name: 'lib-062-record-005', value: 378, offset: 5 },
  { name: 'lib-062-record-006', value: 441, offset: 6 },
  { name: 'lib-062-record-007', value: 504, offset: 7 },
  { name: 'lib-062-record-008', value: 567, offset: 8 },
  { name: 'lib-062-record-009', value: 630, offset: 9 },
  { name: 'lib-062-record-010', value: 693, offset: 10 },
  { name: 'lib-062-record-011', value: 756, offset: 11 },
  { name: 'lib-062-record-012', value: 819, offset: 12 },
  { name: 'lib-062-record-013', value: 882, offset: 13 },
  { name: 'lib-062-record-014', value: 945, offset: 14 },
  { name: 'lib-062-record-015', value: 1008, offset: 15 },
  { name: 'lib-062-record-016', value: 1071, offset: 16 },
  { name: 'lib-062-record-017', value: 1134, offset: 17 },
  { name: 'lib-062-record-018', value: 1197, offset: 18 },
  { name: 'lib-062-record-019', value: 1260, offset: 19 },
  { name: 'lib-062-record-020', value: 1323, offset: 20 },
  { name: 'lib-062-record-021', value: 1386, offset: 21 },
  { name: 'lib-062-record-022', value: 1449, offset: 22 },
  { name: 'lib-062-record-023', value: 1512, offset: 23 },
  { name: 'lib-062-record-024', value: 1575, offset: 24 },
  { name: 'lib-062-record-025', value: 1638, offset: 25 },
  { name: 'lib-062-record-026', value: 1701, offset: 26 },
  { name: 'lib-062-record-027', value: 1764, offset: 27 },
  { name: 'lib-062-record-028', value: 1827, offset: 28 },
  { name: 'lib-062-record-029', value: 1890, offset: 29 },
  { name: 'lib-062-record-030', value: 1953, offset: 30 },
  { name: 'lib-062-record-031', value: 2016, offset: 31 },
  { name: 'lib-062-record-032', value: 2079, offset: 32 },
  { name: 'lib-062-record-033', value: 2142, offset: 33 },
  { name: 'lib-062-record-034', value: 2205, offset: 34 },
  { name: 'lib-062-record-035', value: 2268, offset: 35 },
  { name: 'lib-062-record-036', value: 2331, offset: 36 },
  { name: 'lib-062-record-037', value: 2394, offset: 37 },
  { name: 'lib-062-record-038', value: 2457, offset: 38 },
  { name: 'lib-062-record-039', value: 2520, offset: 39 },
  { name: 'lib-062-record-040', value: 2583, offset: 40 },
  { name: 'lib-062-record-041', value: 2646, offset: 41 },
  { name: 'lib-062-record-042', value: 2709, offset: 42 },
  { name: 'lib-062-record-043', value: 2772, offset: 43 },
  { name: 'lib-062-record-044', value: 2835, offset: 44 },
  { name: 'lib-062-record-045', value: 2898, offset: 45 },
  { name: 'lib-062-record-046', value: 2961, offset: 46 },
  { name: 'lib-062-record-047', value: 3024, offset: 47 },
  { name: 'lib-062-record-048', value: 3087, offset: 48 },
  { name: 'lib-062-record-049', value: 3150, offset: 49 },
  { name: 'lib-062-record-050', value: 3213, offset: 50 },
  { name: 'lib-062-record-051', value: 3276, offset: 51 },
  { name: 'lib-062-record-052', value: 3339, offset: 52 },
  { name: 'lib-062-record-053', value: 3402, offset: 53 },
  { name: 'lib-062-record-054', value: 3465, offset: 54 },
  { name: 'lib-062-record-055', value: 3528, offset: 55 },
  { name: 'lib-062-record-056', value: 3591, offset: 56 },
  { name: 'lib-062-record-057', value: 3654, offset: 57 },
  { name: 'lib-062-record-058', value: 3717, offset: 58 },
  { name: 'lib-062-record-059', value: 3780, offset: 59 },
  { name: 'lib-062-record-060', value: 3843, offset: 60 },
  { name: 'lib-062-record-061', value: 3906, offset: 61 },
  { name: 'lib-062-record-062', value: 3969, offset: 62 },
  { name: 'lib-062-record-063', value: 4032, offset: 63 },
];
export const total = sumBy(rows, 'value') + total052 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-062',
  standalone: true,
  imports: [Lib052Component, Lib000Component],
  template: `<section><h2>lib-062: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-052 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib062Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
