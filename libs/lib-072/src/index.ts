import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib062Component, total as total062 } from '@bench/lib-062';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-072-record-000', value: 73, offset: 0 },
  { name: 'lib-072-record-001', value: 146, offset: 1 },
  { name: 'lib-072-record-002', value: 219, offset: 2 },
  { name: 'lib-072-record-003', value: 292, offset: 3 },
  { name: 'lib-072-record-004', value: 365, offset: 4 },
  { name: 'lib-072-record-005', value: 438, offset: 5 },
  { name: 'lib-072-record-006', value: 511, offset: 6 },
  { name: 'lib-072-record-007', value: 584, offset: 7 },
  { name: 'lib-072-record-008', value: 657, offset: 8 },
  { name: 'lib-072-record-009', value: 730, offset: 9 },
  { name: 'lib-072-record-010', value: 803, offset: 10 },
  { name: 'lib-072-record-011', value: 876, offset: 11 },
  { name: 'lib-072-record-012', value: 949, offset: 12 },
  { name: 'lib-072-record-013', value: 1022, offset: 13 },
  { name: 'lib-072-record-014', value: 1095, offset: 14 },
  { name: 'lib-072-record-015', value: 1168, offset: 15 },
  { name: 'lib-072-record-016', value: 1241, offset: 16 },
  { name: 'lib-072-record-017', value: 1314, offset: 17 },
  { name: 'lib-072-record-018', value: 1387, offset: 18 },
  { name: 'lib-072-record-019', value: 1460, offset: 19 },
  { name: 'lib-072-record-020', value: 1533, offset: 20 },
  { name: 'lib-072-record-021', value: 1606, offset: 21 },
  { name: 'lib-072-record-022', value: 1679, offset: 22 },
  { name: 'lib-072-record-023', value: 1752, offset: 23 },
  { name: 'lib-072-record-024', value: 1825, offset: 24 },
  { name: 'lib-072-record-025', value: 1898, offset: 25 },
  { name: 'lib-072-record-026', value: 1971, offset: 26 },
  { name: 'lib-072-record-027', value: 2044, offset: 27 },
  { name: 'lib-072-record-028', value: 2117, offset: 28 },
  { name: 'lib-072-record-029', value: 2190, offset: 29 },
  { name: 'lib-072-record-030', value: 2263, offset: 30 },
  { name: 'lib-072-record-031', value: 2336, offset: 31 },
  { name: 'lib-072-record-032', value: 2409, offset: 32 },
  { name: 'lib-072-record-033', value: 2482, offset: 33 },
  { name: 'lib-072-record-034', value: 2555, offset: 34 },
  { name: 'lib-072-record-035', value: 2628, offset: 35 },
  { name: 'lib-072-record-036', value: 2701, offset: 36 },
  { name: 'lib-072-record-037', value: 2774, offset: 37 },
  { name: 'lib-072-record-038', value: 2847, offset: 38 },
  { name: 'lib-072-record-039', value: 2920, offset: 39 },
  { name: 'lib-072-record-040', value: 2993, offset: 40 },
  { name: 'lib-072-record-041', value: 3066, offset: 41 },
  { name: 'lib-072-record-042', value: 3139, offset: 42 },
  { name: 'lib-072-record-043', value: 3212, offset: 43 },
  { name: 'lib-072-record-044', value: 3285, offset: 44 },
  { name: 'lib-072-record-045', value: 3358, offset: 45 },
  { name: 'lib-072-record-046', value: 3431, offset: 46 },
  { name: 'lib-072-record-047', value: 3504, offset: 47 },
  { name: 'lib-072-record-048', value: 3577, offset: 48 },
  { name: 'lib-072-record-049', value: 3650, offset: 49 },
  { name: 'lib-072-record-050', value: 3723, offset: 50 },
  { name: 'lib-072-record-051', value: 3796, offset: 51 },
  { name: 'lib-072-record-052', value: 3869, offset: 52 },
  { name: 'lib-072-record-053', value: 3942, offset: 53 },
  { name: 'lib-072-record-054', value: 4015, offset: 54 },
  { name: 'lib-072-record-055', value: 4088, offset: 55 },
  { name: 'lib-072-record-056', value: 4161, offset: 56 },
  { name: 'lib-072-record-057', value: 4234, offset: 57 },
  { name: 'lib-072-record-058', value: 4307, offset: 58 },
  { name: 'lib-072-record-059', value: 4380, offset: 59 },
  { name: 'lib-072-record-060', value: 4453, offset: 60 },
  { name: 'lib-072-record-061', value: 4526, offset: 61 },
  { name: 'lib-072-record-062', value: 4599, offset: 62 },
  { name: 'lib-072-record-063', value: 4672, offset: 63 },
];
export const total = sumBy(rows, 'value') + total062 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-072',
  standalone: true,
  imports: [Lib062Component, Lib000Component],
  template: `<section><h2>lib-072: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-062 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib072Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
