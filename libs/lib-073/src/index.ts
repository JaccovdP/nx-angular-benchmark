import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib063Component, total as total063 } from '@bench/lib-063';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-073-record-000', value: 74, offset: 0 },
  { name: 'lib-073-record-001', value: 148, offset: 1 },
  { name: 'lib-073-record-002', value: 222, offset: 2 },
  { name: 'lib-073-record-003', value: 296, offset: 3 },
  { name: 'lib-073-record-004', value: 370, offset: 4 },
  { name: 'lib-073-record-005', value: 444, offset: 5 },
  { name: 'lib-073-record-006', value: 518, offset: 6 },
  { name: 'lib-073-record-007', value: 592, offset: 7 },
  { name: 'lib-073-record-008', value: 666, offset: 8 },
  { name: 'lib-073-record-009', value: 740, offset: 9 },
  { name: 'lib-073-record-010', value: 814, offset: 10 },
  { name: 'lib-073-record-011', value: 888, offset: 11 },
  { name: 'lib-073-record-012', value: 962, offset: 12 },
  { name: 'lib-073-record-013', value: 1036, offset: 13 },
  { name: 'lib-073-record-014', value: 1110, offset: 14 },
  { name: 'lib-073-record-015', value: 1184, offset: 15 },
  { name: 'lib-073-record-016', value: 1258, offset: 16 },
  { name: 'lib-073-record-017', value: 1332, offset: 17 },
  { name: 'lib-073-record-018', value: 1406, offset: 18 },
  { name: 'lib-073-record-019', value: 1480, offset: 19 },
  { name: 'lib-073-record-020', value: 1554, offset: 20 },
  { name: 'lib-073-record-021', value: 1628, offset: 21 },
  { name: 'lib-073-record-022', value: 1702, offset: 22 },
  { name: 'lib-073-record-023', value: 1776, offset: 23 },
  { name: 'lib-073-record-024', value: 1850, offset: 24 },
  { name: 'lib-073-record-025', value: 1924, offset: 25 },
  { name: 'lib-073-record-026', value: 1998, offset: 26 },
  { name: 'lib-073-record-027', value: 2072, offset: 27 },
  { name: 'lib-073-record-028', value: 2146, offset: 28 },
  { name: 'lib-073-record-029', value: 2220, offset: 29 },
  { name: 'lib-073-record-030', value: 2294, offset: 30 },
  { name: 'lib-073-record-031', value: 2368, offset: 31 },
  { name: 'lib-073-record-032', value: 2442, offset: 32 },
  { name: 'lib-073-record-033', value: 2516, offset: 33 },
  { name: 'lib-073-record-034', value: 2590, offset: 34 },
  { name: 'lib-073-record-035', value: 2664, offset: 35 },
  { name: 'lib-073-record-036', value: 2738, offset: 36 },
  { name: 'lib-073-record-037', value: 2812, offset: 37 },
  { name: 'lib-073-record-038', value: 2886, offset: 38 },
  { name: 'lib-073-record-039', value: 2960, offset: 39 },
  { name: 'lib-073-record-040', value: 3034, offset: 40 },
  { name: 'lib-073-record-041', value: 3108, offset: 41 },
  { name: 'lib-073-record-042', value: 3182, offset: 42 },
  { name: 'lib-073-record-043', value: 3256, offset: 43 },
  { name: 'lib-073-record-044', value: 3330, offset: 44 },
  { name: 'lib-073-record-045', value: 3404, offset: 45 },
  { name: 'lib-073-record-046', value: 3478, offset: 46 },
  { name: 'lib-073-record-047', value: 3552, offset: 47 },
  { name: 'lib-073-record-048', value: 3626, offset: 48 },
  { name: 'lib-073-record-049', value: 3700, offset: 49 },
  { name: 'lib-073-record-050', value: 3774, offset: 50 },
  { name: 'lib-073-record-051', value: 3848, offset: 51 },
  { name: 'lib-073-record-052', value: 3922, offset: 52 },
  { name: 'lib-073-record-053', value: 3996, offset: 53 },
  { name: 'lib-073-record-054', value: 4070, offset: 54 },
  { name: 'lib-073-record-055', value: 4144, offset: 55 },
  { name: 'lib-073-record-056', value: 4218, offset: 56 },
  { name: 'lib-073-record-057', value: 4292, offset: 57 },
  { name: 'lib-073-record-058', value: 4366, offset: 58 },
  { name: 'lib-073-record-059', value: 4440, offset: 59 },
  { name: 'lib-073-record-060', value: 4514, offset: 60 },
  { name: 'lib-073-record-061', value: 4588, offset: 61 },
  { name: 'lib-073-record-062', value: 4662, offset: 62 },
  { name: 'lib-073-record-063', value: 4736, offset: 63 },
];
export const total = sumBy(rows, 'value') + total063 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-073',
  standalone: true,
  imports: [Lib063Component, Lib000Component],
  template: `<section><h2>lib-073: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-063 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib073Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
