import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib007Component, total as total007 } from '@bench/lib-007';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-017-record-000', value: 18, offset: 0 },
  { name: 'lib-017-record-001', value: 36, offset: 1 },
  { name: 'lib-017-record-002', value: 54, offset: 2 },
  { name: 'lib-017-record-003', value: 72, offset: 3 },
  { name: 'lib-017-record-004', value: 90, offset: 4 },
  { name: 'lib-017-record-005', value: 108, offset: 5 },
  { name: 'lib-017-record-006', value: 126, offset: 6 },
  { name: 'lib-017-record-007', value: 144, offset: 7 },
  { name: 'lib-017-record-008', value: 162, offset: 8 },
  { name: 'lib-017-record-009', value: 180, offset: 9 },
  { name: 'lib-017-record-010', value: 198, offset: 10 },
  { name: 'lib-017-record-011', value: 216, offset: 11 },
  { name: 'lib-017-record-012', value: 234, offset: 12 },
  { name: 'lib-017-record-013', value: 252, offset: 13 },
  { name: 'lib-017-record-014', value: 270, offset: 14 },
  { name: 'lib-017-record-015', value: 288, offset: 15 },
  { name: 'lib-017-record-016', value: 306, offset: 16 },
  { name: 'lib-017-record-017', value: 324, offset: 17 },
  { name: 'lib-017-record-018', value: 342, offset: 18 },
  { name: 'lib-017-record-019', value: 360, offset: 19 },
  { name: 'lib-017-record-020', value: 378, offset: 20 },
  { name: 'lib-017-record-021', value: 396, offset: 21 },
  { name: 'lib-017-record-022', value: 414, offset: 22 },
  { name: 'lib-017-record-023', value: 432, offset: 23 },
  { name: 'lib-017-record-024', value: 450, offset: 24 },
  { name: 'lib-017-record-025', value: 468, offset: 25 },
  { name: 'lib-017-record-026', value: 486, offset: 26 },
  { name: 'lib-017-record-027', value: 504, offset: 27 },
  { name: 'lib-017-record-028', value: 522, offset: 28 },
  { name: 'lib-017-record-029', value: 540, offset: 29 },
  { name: 'lib-017-record-030', value: 558, offset: 30 },
  { name: 'lib-017-record-031', value: 576, offset: 31 },
  { name: 'lib-017-record-032', value: 594, offset: 32 },
  { name: 'lib-017-record-033', value: 612, offset: 33 },
  { name: 'lib-017-record-034', value: 630, offset: 34 },
  { name: 'lib-017-record-035', value: 648, offset: 35 },
  { name: 'lib-017-record-036', value: 666, offset: 36 },
  { name: 'lib-017-record-037', value: 684, offset: 37 },
  { name: 'lib-017-record-038', value: 702, offset: 38 },
  { name: 'lib-017-record-039', value: 720, offset: 39 },
  { name: 'lib-017-record-040', value: 738, offset: 40 },
  { name: 'lib-017-record-041', value: 756, offset: 41 },
  { name: 'lib-017-record-042', value: 774, offset: 42 },
  { name: 'lib-017-record-043', value: 792, offset: 43 },
  { name: 'lib-017-record-044', value: 810, offset: 44 },
  { name: 'lib-017-record-045', value: 828, offset: 45 },
  { name: 'lib-017-record-046', value: 846, offset: 46 },
  { name: 'lib-017-record-047', value: 864, offset: 47 },
  { name: 'lib-017-record-048', value: 882, offset: 48 },
  { name: 'lib-017-record-049', value: 900, offset: 49 },
  { name: 'lib-017-record-050', value: 918, offset: 50 },
  { name: 'lib-017-record-051', value: 936, offset: 51 },
  { name: 'lib-017-record-052', value: 954, offset: 52 },
  { name: 'lib-017-record-053', value: 972, offset: 53 },
  { name: 'lib-017-record-054', value: 990, offset: 54 },
  { name: 'lib-017-record-055', value: 1008, offset: 55 },
  { name: 'lib-017-record-056', value: 1026, offset: 56 },
  { name: 'lib-017-record-057', value: 1044, offset: 57 },
  { name: 'lib-017-record-058', value: 1062, offset: 58 },
  { name: 'lib-017-record-059', value: 1080, offset: 59 },
  { name: 'lib-017-record-060', value: 1098, offset: 60 },
  { name: 'lib-017-record-061', value: 1116, offset: 61 },
  { name: 'lib-017-record-062', value: 1134, offset: 62 },
  { name: 'lib-017-record-063', value: 1152, offset: 63 },
];
export const total = sumBy(rows, 'value') + total007 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-017',
  standalone: true,
  imports: [Lib007Component, Lib000Component],
  template: `<section><h2>lib-017: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-007 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib017Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
