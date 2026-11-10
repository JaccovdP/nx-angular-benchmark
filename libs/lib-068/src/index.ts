import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib058Component, total as total058 } from '@bench/lib-058';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-068-record-000', value: 69, offset: 0 },
  { name: 'lib-068-record-001', value: 138, offset: 1 },
  { name: 'lib-068-record-002', value: 207, offset: 2 },
  { name: 'lib-068-record-003', value: 276, offset: 3 },
  { name: 'lib-068-record-004', value: 345, offset: 4 },
  { name: 'lib-068-record-005', value: 414, offset: 5 },
  { name: 'lib-068-record-006', value: 483, offset: 6 },
  { name: 'lib-068-record-007', value: 552, offset: 7 },
  { name: 'lib-068-record-008', value: 621, offset: 8 },
  { name: 'lib-068-record-009', value: 690, offset: 9 },
  { name: 'lib-068-record-010', value: 759, offset: 10 },
  { name: 'lib-068-record-011', value: 828, offset: 11 },
  { name: 'lib-068-record-012', value: 897, offset: 12 },
  { name: 'lib-068-record-013', value: 966, offset: 13 },
  { name: 'lib-068-record-014', value: 1035, offset: 14 },
  { name: 'lib-068-record-015', value: 1104, offset: 15 },
  { name: 'lib-068-record-016', value: 1173, offset: 16 },
  { name: 'lib-068-record-017', value: 1242, offset: 17 },
  { name: 'lib-068-record-018', value: 1311, offset: 18 },
  { name: 'lib-068-record-019', value: 1380, offset: 19 },
  { name: 'lib-068-record-020', value: 1449, offset: 20 },
  { name: 'lib-068-record-021', value: 1518, offset: 21 },
  { name: 'lib-068-record-022', value: 1587, offset: 22 },
  { name: 'lib-068-record-023', value: 1656, offset: 23 },
  { name: 'lib-068-record-024', value: 1725, offset: 24 },
  { name: 'lib-068-record-025', value: 1794, offset: 25 },
  { name: 'lib-068-record-026', value: 1863, offset: 26 },
  { name: 'lib-068-record-027', value: 1932, offset: 27 },
  { name: 'lib-068-record-028', value: 2001, offset: 28 },
  { name: 'lib-068-record-029', value: 2070, offset: 29 },
  { name: 'lib-068-record-030', value: 2139, offset: 30 },
  { name: 'lib-068-record-031', value: 2208, offset: 31 },
  { name: 'lib-068-record-032', value: 2277, offset: 32 },
  { name: 'lib-068-record-033', value: 2346, offset: 33 },
  { name: 'lib-068-record-034', value: 2415, offset: 34 },
  { name: 'lib-068-record-035', value: 2484, offset: 35 },
  { name: 'lib-068-record-036', value: 2553, offset: 36 },
  { name: 'lib-068-record-037', value: 2622, offset: 37 },
  { name: 'lib-068-record-038', value: 2691, offset: 38 },
  { name: 'lib-068-record-039', value: 2760, offset: 39 },
  { name: 'lib-068-record-040', value: 2829, offset: 40 },
  { name: 'lib-068-record-041', value: 2898, offset: 41 },
  { name: 'lib-068-record-042', value: 2967, offset: 42 },
  { name: 'lib-068-record-043', value: 3036, offset: 43 },
  { name: 'lib-068-record-044', value: 3105, offset: 44 },
  { name: 'lib-068-record-045', value: 3174, offset: 45 },
  { name: 'lib-068-record-046', value: 3243, offset: 46 },
  { name: 'lib-068-record-047', value: 3312, offset: 47 },
  { name: 'lib-068-record-048', value: 3381, offset: 48 },
  { name: 'lib-068-record-049', value: 3450, offset: 49 },
  { name: 'lib-068-record-050', value: 3519, offset: 50 },
  { name: 'lib-068-record-051', value: 3588, offset: 51 },
  { name: 'lib-068-record-052', value: 3657, offset: 52 },
  { name: 'lib-068-record-053', value: 3726, offset: 53 },
  { name: 'lib-068-record-054', value: 3795, offset: 54 },
  { name: 'lib-068-record-055', value: 3864, offset: 55 },
  { name: 'lib-068-record-056', value: 3933, offset: 56 },
  { name: 'lib-068-record-057', value: 4002, offset: 57 },
  { name: 'lib-068-record-058', value: 4071, offset: 58 },
  { name: 'lib-068-record-059', value: 4140, offset: 59 },
  { name: 'lib-068-record-060', value: 4209, offset: 60 },
  { name: 'lib-068-record-061', value: 4278, offset: 61 },
  { name: 'lib-068-record-062', value: 4347, offset: 62 },
  { name: 'lib-068-record-063', value: 4416, offset: 63 },
];
export const total = sumBy(rows, 'value') + total058 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-068',
  standalone: true,
  imports: [Lib058Component, Lib000Component],
  template: `<section><h2>lib-068: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-058 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib068Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
