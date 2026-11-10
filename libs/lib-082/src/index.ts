import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib072Component, total as total072 } from '@bench/lib-072';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-082-record-000', value: 83, offset: 0 },
  { name: 'lib-082-record-001', value: 166, offset: 1 },
  { name: 'lib-082-record-002', value: 249, offset: 2 },
  { name: 'lib-082-record-003', value: 332, offset: 3 },
  { name: 'lib-082-record-004', value: 415, offset: 4 },
  { name: 'lib-082-record-005', value: 498, offset: 5 },
  { name: 'lib-082-record-006', value: 581, offset: 6 },
  { name: 'lib-082-record-007', value: 664, offset: 7 },
  { name: 'lib-082-record-008', value: 747, offset: 8 },
  { name: 'lib-082-record-009', value: 830, offset: 9 },
  { name: 'lib-082-record-010', value: 913, offset: 10 },
  { name: 'lib-082-record-011', value: 996, offset: 11 },
  { name: 'lib-082-record-012', value: 1079, offset: 12 },
  { name: 'lib-082-record-013', value: 1162, offset: 13 },
  { name: 'lib-082-record-014', value: 1245, offset: 14 },
  { name: 'lib-082-record-015', value: 1328, offset: 15 },
  { name: 'lib-082-record-016', value: 1411, offset: 16 },
  { name: 'lib-082-record-017', value: 1494, offset: 17 },
  { name: 'lib-082-record-018', value: 1577, offset: 18 },
  { name: 'lib-082-record-019', value: 1660, offset: 19 },
  { name: 'lib-082-record-020', value: 1743, offset: 20 },
  { name: 'lib-082-record-021', value: 1826, offset: 21 },
  { name: 'lib-082-record-022', value: 1909, offset: 22 },
  { name: 'lib-082-record-023', value: 1992, offset: 23 },
  { name: 'lib-082-record-024', value: 2075, offset: 24 },
  { name: 'lib-082-record-025', value: 2158, offset: 25 },
  { name: 'lib-082-record-026', value: 2241, offset: 26 },
  { name: 'lib-082-record-027', value: 2324, offset: 27 },
  { name: 'lib-082-record-028', value: 2407, offset: 28 },
  { name: 'lib-082-record-029', value: 2490, offset: 29 },
  { name: 'lib-082-record-030', value: 2573, offset: 30 },
  { name: 'lib-082-record-031', value: 2656, offset: 31 },
  { name: 'lib-082-record-032', value: 2739, offset: 32 },
  { name: 'lib-082-record-033', value: 2822, offset: 33 },
  { name: 'lib-082-record-034', value: 2905, offset: 34 },
  { name: 'lib-082-record-035', value: 2988, offset: 35 },
  { name: 'lib-082-record-036', value: 3071, offset: 36 },
  { name: 'lib-082-record-037', value: 3154, offset: 37 },
  { name: 'lib-082-record-038', value: 3237, offset: 38 },
  { name: 'lib-082-record-039', value: 3320, offset: 39 },
  { name: 'lib-082-record-040', value: 3403, offset: 40 },
  { name: 'lib-082-record-041', value: 3486, offset: 41 },
  { name: 'lib-082-record-042', value: 3569, offset: 42 },
  { name: 'lib-082-record-043', value: 3652, offset: 43 },
  { name: 'lib-082-record-044', value: 3735, offset: 44 },
  { name: 'lib-082-record-045', value: 3818, offset: 45 },
  { name: 'lib-082-record-046', value: 3901, offset: 46 },
  { name: 'lib-082-record-047', value: 3984, offset: 47 },
  { name: 'lib-082-record-048', value: 4067, offset: 48 },
  { name: 'lib-082-record-049', value: 4150, offset: 49 },
  { name: 'lib-082-record-050', value: 4233, offset: 50 },
  { name: 'lib-082-record-051', value: 4316, offset: 51 },
  { name: 'lib-082-record-052', value: 4399, offset: 52 },
  { name: 'lib-082-record-053', value: 4482, offset: 53 },
  { name: 'lib-082-record-054', value: 4565, offset: 54 },
  { name: 'lib-082-record-055', value: 4648, offset: 55 },
  { name: 'lib-082-record-056', value: 4731, offset: 56 },
  { name: 'lib-082-record-057', value: 4814, offset: 57 },
  { name: 'lib-082-record-058', value: 4897, offset: 58 },
  { name: 'lib-082-record-059', value: 4980, offset: 59 },
  { name: 'lib-082-record-060', value: 5063, offset: 60 },
  { name: 'lib-082-record-061', value: 5146, offset: 61 },
  { name: 'lib-082-record-062', value: 5229, offset: 62 },
  { name: 'lib-082-record-063', value: 5312, offset: 63 },
];
export const total = sumBy(rows, 'value') + total072 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-082',
  standalone: true,
  imports: [Lib072Component, Lib000Component],
  template: `<section><h2>lib-082: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-072 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib082Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
