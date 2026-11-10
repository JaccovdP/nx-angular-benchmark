import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib048Component, total as total048 } from '@bench/lib-048';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-058-record-000', value: 59, offset: 0 },
  { name: 'lib-058-record-001', value: 118, offset: 1 },
  { name: 'lib-058-record-002', value: 177, offset: 2 },
  { name: 'lib-058-record-003', value: 236, offset: 3 },
  { name: 'lib-058-record-004', value: 295, offset: 4 },
  { name: 'lib-058-record-005', value: 354, offset: 5 },
  { name: 'lib-058-record-006', value: 413, offset: 6 },
  { name: 'lib-058-record-007', value: 472, offset: 7 },
  { name: 'lib-058-record-008', value: 531, offset: 8 },
  { name: 'lib-058-record-009', value: 590, offset: 9 },
  { name: 'lib-058-record-010', value: 649, offset: 10 },
  { name: 'lib-058-record-011', value: 708, offset: 11 },
  { name: 'lib-058-record-012', value: 767, offset: 12 },
  { name: 'lib-058-record-013', value: 826, offset: 13 },
  { name: 'lib-058-record-014', value: 885, offset: 14 },
  { name: 'lib-058-record-015', value: 944, offset: 15 },
  { name: 'lib-058-record-016', value: 1003, offset: 16 },
  { name: 'lib-058-record-017', value: 1062, offset: 17 },
  { name: 'lib-058-record-018', value: 1121, offset: 18 },
  { name: 'lib-058-record-019', value: 1180, offset: 19 },
  { name: 'lib-058-record-020', value: 1239, offset: 20 },
  { name: 'lib-058-record-021', value: 1298, offset: 21 },
  { name: 'lib-058-record-022', value: 1357, offset: 22 },
  { name: 'lib-058-record-023', value: 1416, offset: 23 },
  { name: 'lib-058-record-024', value: 1475, offset: 24 },
  { name: 'lib-058-record-025', value: 1534, offset: 25 },
  { name: 'lib-058-record-026', value: 1593, offset: 26 },
  { name: 'lib-058-record-027', value: 1652, offset: 27 },
  { name: 'lib-058-record-028', value: 1711, offset: 28 },
  { name: 'lib-058-record-029', value: 1770, offset: 29 },
  { name: 'lib-058-record-030', value: 1829, offset: 30 },
  { name: 'lib-058-record-031', value: 1888, offset: 31 },
  { name: 'lib-058-record-032', value: 1947, offset: 32 },
  { name: 'lib-058-record-033', value: 2006, offset: 33 },
  { name: 'lib-058-record-034', value: 2065, offset: 34 },
  { name: 'lib-058-record-035', value: 2124, offset: 35 },
  { name: 'lib-058-record-036', value: 2183, offset: 36 },
  { name: 'lib-058-record-037', value: 2242, offset: 37 },
  { name: 'lib-058-record-038', value: 2301, offset: 38 },
  { name: 'lib-058-record-039', value: 2360, offset: 39 },
  { name: 'lib-058-record-040', value: 2419, offset: 40 },
  { name: 'lib-058-record-041', value: 2478, offset: 41 },
  { name: 'lib-058-record-042', value: 2537, offset: 42 },
  { name: 'lib-058-record-043', value: 2596, offset: 43 },
  { name: 'lib-058-record-044', value: 2655, offset: 44 },
  { name: 'lib-058-record-045', value: 2714, offset: 45 },
  { name: 'lib-058-record-046', value: 2773, offset: 46 },
  { name: 'lib-058-record-047', value: 2832, offset: 47 },
  { name: 'lib-058-record-048', value: 2891, offset: 48 },
  { name: 'lib-058-record-049', value: 2950, offset: 49 },
  { name: 'lib-058-record-050', value: 3009, offset: 50 },
  { name: 'lib-058-record-051', value: 3068, offset: 51 },
  { name: 'lib-058-record-052', value: 3127, offset: 52 },
  { name: 'lib-058-record-053', value: 3186, offset: 53 },
  { name: 'lib-058-record-054', value: 3245, offset: 54 },
  { name: 'lib-058-record-055', value: 3304, offset: 55 },
  { name: 'lib-058-record-056', value: 3363, offset: 56 },
  { name: 'lib-058-record-057', value: 3422, offset: 57 },
  { name: 'lib-058-record-058', value: 3481, offset: 58 },
  { name: 'lib-058-record-059', value: 3540, offset: 59 },
  { name: 'lib-058-record-060', value: 3599, offset: 60 },
  { name: 'lib-058-record-061', value: 3658, offset: 61 },
  { name: 'lib-058-record-062', value: 3717, offset: 62 },
  { name: 'lib-058-record-063', value: 3776, offset: 63 },
];
export const total = sumBy(rows, 'value') + total048 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-058',
  standalone: true,
  imports: [Lib048Component, Lib000Component],
  template: `<section><h2>lib-058: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-048 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib058Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
