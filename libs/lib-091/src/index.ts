import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib081Component, total as total081 } from '@bench/lib-081';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-091-record-000', value: 92, offset: 0 },
  { name: 'lib-091-record-001', value: 184, offset: 1 },
  { name: 'lib-091-record-002', value: 276, offset: 2 },
  { name: 'lib-091-record-003', value: 368, offset: 3 },
  { name: 'lib-091-record-004', value: 460, offset: 4 },
  { name: 'lib-091-record-005', value: 552, offset: 5 },
  { name: 'lib-091-record-006', value: 644, offset: 6 },
  { name: 'lib-091-record-007', value: 736, offset: 7 },
  { name: 'lib-091-record-008', value: 828, offset: 8 },
  { name: 'lib-091-record-009', value: 920, offset: 9 },
  { name: 'lib-091-record-010', value: 1012, offset: 10 },
  { name: 'lib-091-record-011', value: 1104, offset: 11 },
  { name: 'lib-091-record-012', value: 1196, offset: 12 },
  { name: 'lib-091-record-013', value: 1288, offset: 13 },
  { name: 'lib-091-record-014', value: 1380, offset: 14 },
  { name: 'lib-091-record-015', value: 1472, offset: 15 },
  { name: 'lib-091-record-016', value: 1564, offset: 16 },
  { name: 'lib-091-record-017', value: 1656, offset: 17 },
  { name: 'lib-091-record-018', value: 1748, offset: 18 },
  { name: 'lib-091-record-019', value: 1840, offset: 19 },
  { name: 'lib-091-record-020', value: 1932, offset: 20 },
  { name: 'lib-091-record-021', value: 2024, offset: 21 },
  { name: 'lib-091-record-022', value: 2116, offset: 22 },
  { name: 'lib-091-record-023', value: 2208, offset: 23 },
  { name: 'lib-091-record-024', value: 2300, offset: 24 },
  { name: 'lib-091-record-025', value: 2392, offset: 25 },
  { name: 'lib-091-record-026', value: 2484, offset: 26 },
  { name: 'lib-091-record-027', value: 2576, offset: 27 },
  { name: 'lib-091-record-028', value: 2668, offset: 28 },
  { name: 'lib-091-record-029', value: 2760, offset: 29 },
  { name: 'lib-091-record-030', value: 2852, offset: 30 },
  { name: 'lib-091-record-031', value: 2944, offset: 31 },
  { name: 'lib-091-record-032', value: 3036, offset: 32 },
  { name: 'lib-091-record-033', value: 3128, offset: 33 },
  { name: 'lib-091-record-034', value: 3220, offset: 34 },
  { name: 'lib-091-record-035', value: 3312, offset: 35 },
  { name: 'lib-091-record-036', value: 3404, offset: 36 },
  { name: 'lib-091-record-037', value: 3496, offset: 37 },
  { name: 'lib-091-record-038', value: 3588, offset: 38 },
  { name: 'lib-091-record-039', value: 3680, offset: 39 },
  { name: 'lib-091-record-040', value: 3772, offset: 40 },
  { name: 'lib-091-record-041', value: 3864, offset: 41 },
  { name: 'lib-091-record-042', value: 3956, offset: 42 },
  { name: 'lib-091-record-043', value: 4048, offset: 43 },
  { name: 'lib-091-record-044', value: 4140, offset: 44 },
  { name: 'lib-091-record-045', value: 4232, offset: 45 },
  { name: 'lib-091-record-046', value: 4324, offset: 46 },
  { name: 'lib-091-record-047', value: 4416, offset: 47 },
  { name: 'lib-091-record-048', value: 4508, offset: 48 },
  { name: 'lib-091-record-049', value: 4600, offset: 49 },
  { name: 'lib-091-record-050', value: 4692, offset: 50 },
  { name: 'lib-091-record-051', value: 4784, offset: 51 },
  { name: 'lib-091-record-052', value: 4876, offset: 52 },
  { name: 'lib-091-record-053', value: 4968, offset: 53 },
  { name: 'lib-091-record-054', value: 5060, offset: 54 },
  { name: 'lib-091-record-055', value: 5152, offset: 55 },
  { name: 'lib-091-record-056', value: 5244, offset: 56 },
  { name: 'lib-091-record-057', value: 5336, offset: 57 },
  { name: 'lib-091-record-058', value: 5428, offset: 58 },
  { name: 'lib-091-record-059', value: 5520, offset: 59 },
  { name: 'lib-091-record-060', value: 5612, offset: 60 },
  { name: 'lib-091-record-061', value: 5704, offset: 61 },
  { name: 'lib-091-record-062', value: 5796, offset: 62 },
  { name: 'lib-091-record-063', value: 5888, offset: 63 },
];
export const total = sumBy(rows, 'value') + total081 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-091',
  standalone: true,
  imports: [Lib081Component, Lib000Component],
  template: `<section><h2>lib-091: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-081 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib091Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
