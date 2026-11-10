import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib068Component, total as total068 } from '@bench/lib-068';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-078-record-000', value: 79, offset: 0 },
  { name: 'lib-078-record-001', value: 158, offset: 1 },
  { name: 'lib-078-record-002', value: 237, offset: 2 },
  { name: 'lib-078-record-003', value: 316, offset: 3 },
  { name: 'lib-078-record-004', value: 395, offset: 4 },
  { name: 'lib-078-record-005', value: 474, offset: 5 },
  { name: 'lib-078-record-006', value: 553, offset: 6 },
  { name: 'lib-078-record-007', value: 632, offset: 7 },
  { name: 'lib-078-record-008', value: 711, offset: 8 },
  { name: 'lib-078-record-009', value: 790, offset: 9 },
  { name: 'lib-078-record-010', value: 869, offset: 10 },
  { name: 'lib-078-record-011', value: 948, offset: 11 },
  { name: 'lib-078-record-012', value: 1027, offset: 12 },
  { name: 'lib-078-record-013', value: 1106, offset: 13 },
  { name: 'lib-078-record-014', value: 1185, offset: 14 },
  { name: 'lib-078-record-015', value: 1264, offset: 15 },
  { name: 'lib-078-record-016', value: 1343, offset: 16 },
  { name: 'lib-078-record-017', value: 1422, offset: 17 },
  { name: 'lib-078-record-018', value: 1501, offset: 18 },
  { name: 'lib-078-record-019', value: 1580, offset: 19 },
  { name: 'lib-078-record-020', value: 1659, offset: 20 },
  { name: 'lib-078-record-021', value: 1738, offset: 21 },
  { name: 'lib-078-record-022', value: 1817, offset: 22 },
  { name: 'lib-078-record-023', value: 1896, offset: 23 },
  { name: 'lib-078-record-024', value: 1975, offset: 24 },
  { name: 'lib-078-record-025', value: 2054, offset: 25 },
  { name: 'lib-078-record-026', value: 2133, offset: 26 },
  { name: 'lib-078-record-027', value: 2212, offset: 27 },
  { name: 'lib-078-record-028', value: 2291, offset: 28 },
  { name: 'lib-078-record-029', value: 2370, offset: 29 },
  { name: 'lib-078-record-030', value: 2449, offset: 30 },
  { name: 'lib-078-record-031', value: 2528, offset: 31 },
  { name: 'lib-078-record-032', value: 2607, offset: 32 },
  { name: 'lib-078-record-033', value: 2686, offset: 33 },
  { name: 'lib-078-record-034', value: 2765, offset: 34 },
  { name: 'lib-078-record-035', value: 2844, offset: 35 },
  { name: 'lib-078-record-036', value: 2923, offset: 36 },
  { name: 'lib-078-record-037', value: 3002, offset: 37 },
  { name: 'lib-078-record-038', value: 3081, offset: 38 },
  { name: 'lib-078-record-039', value: 3160, offset: 39 },
  { name: 'lib-078-record-040', value: 3239, offset: 40 },
  { name: 'lib-078-record-041', value: 3318, offset: 41 },
  { name: 'lib-078-record-042', value: 3397, offset: 42 },
  { name: 'lib-078-record-043', value: 3476, offset: 43 },
  { name: 'lib-078-record-044', value: 3555, offset: 44 },
  { name: 'lib-078-record-045', value: 3634, offset: 45 },
  { name: 'lib-078-record-046', value: 3713, offset: 46 },
  { name: 'lib-078-record-047', value: 3792, offset: 47 },
  { name: 'lib-078-record-048', value: 3871, offset: 48 },
  { name: 'lib-078-record-049', value: 3950, offset: 49 },
  { name: 'lib-078-record-050', value: 4029, offset: 50 },
  { name: 'lib-078-record-051', value: 4108, offset: 51 },
  { name: 'lib-078-record-052', value: 4187, offset: 52 },
  { name: 'lib-078-record-053', value: 4266, offset: 53 },
  { name: 'lib-078-record-054', value: 4345, offset: 54 },
  { name: 'lib-078-record-055', value: 4424, offset: 55 },
  { name: 'lib-078-record-056', value: 4503, offset: 56 },
  { name: 'lib-078-record-057', value: 4582, offset: 57 },
  { name: 'lib-078-record-058', value: 4661, offset: 58 },
  { name: 'lib-078-record-059', value: 4740, offset: 59 },
  { name: 'lib-078-record-060', value: 4819, offset: 60 },
  { name: 'lib-078-record-061', value: 4898, offset: 61 },
  { name: 'lib-078-record-062', value: 4977, offset: 62 },
  { name: 'lib-078-record-063', value: 5056, offset: 63 },
];
export const total = sumBy(rows, 'value') + total068 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-078',
  standalone: true,
  imports: [Lib068Component, Lib000Component],
  template: `<section><h2>lib-078: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-068 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib078Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
