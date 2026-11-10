import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib001Component, total as total001 } from '@bench/lib-001';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-011-record-000', value: 12, offset: 0 },
  { name: 'lib-011-record-001', value: 24, offset: 1 },
  { name: 'lib-011-record-002', value: 36, offset: 2 },
  { name: 'lib-011-record-003', value: 48, offset: 3 },
  { name: 'lib-011-record-004', value: 60, offset: 4 },
  { name: 'lib-011-record-005', value: 72, offset: 5 },
  { name: 'lib-011-record-006', value: 84, offset: 6 },
  { name: 'lib-011-record-007', value: 96, offset: 7 },
  { name: 'lib-011-record-008', value: 108, offset: 8 },
  { name: 'lib-011-record-009', value: 120, offset: 9 },
  { name: 'lib-011-record-010', value: 132, offset: 10 },
  { name: 'lib-011-record-011', value: 144, offset: 11 },
  { name: 'lib-011-record-012', value: 156, offset: 12 },
  { name: 'lib-011-record-013', value: 168, offset: 13 },
  { name: 'lib-011-record-014', value: 180, offset: 14 },
  { name: 'lib-011-record-015', value: 192, offset: 15 },
  { name: 'lib-011-record-016', value: 204, offset: 16 },
  { name: 'lib-011-record-017', value: 216, offset: 17 },
  { name: 'lib-011-record-018', value: 228, offset: 18 },
  { name: 'lib-011-record-019', value: 240, offset: 19 },
  { name: 'lib-011-record-020', value: 252, offset: 20 },
  { name: 'lib-011-record-021', value: 264, offset: 21 },
  { name: 'lib-011-record-022', value: 276, offset: 22 },
  { name: 'lib-011-record-023', value: 288, offset: 23 },
  { name: 'lib-011-record-024', value: 300, offset: 24 },
  { name: 'lib-011-record-025', value: 312, offset: 25 },
  { name: 'lib-011-record-026', value: 324, offset: 26 },
  { name: 'lib-011-record-027', value: 336, offset: 27 },
  { name: 'lib-011-record-028', value: 348, offset: 28 },
  { name: 'lib-011-record-029', value: 360, offset: 29 },
  { name: 'lib-011-record-030', value: 372, offset: 30 },
  { name: 'lib-011-record-031', value: 384, offset: 31 },
  { name: 'lib-011-record-032', value: 396, offset: 32 },
  { name: 'lib-011-record-033', value: 408, offset: 33 },
  { name: 'lib-011-record-034', value: 420, offset: 34 },
  { name: 'lib-011-record-035', value: 432, offset: 35 },
  { name: 'lib-011-record-036', value: 444, offset: 36 },
  { name: 'lib-011-record-037', value: 456, offset: 37 },
  { name: 'lib-011-record-038', value: 468, offset: 38 },
  { name: 'lib-011-record-039', value: 480, offset: 39 },
  { name: 'lib-011-record-040', value: 492, offset: 40 },
  { name: 'lib-011-record-041', value: 504, offset: 41 },
  { name: 'lib-011-record-042', value: 516, offset: 42 },
  { name: 'lib-011-record-043', value: 528, offset: 43 },
  { name: 'lib-011-record-044', value: 540, offset: 44 },
  { name: 'lib-011-record-045', value: 552, offset: 45 },
  { name: 'lib-011-record-046', value: 564, offset: 46 },
  { name: 'lib-011-record-047', value: 576, offset: 47 },
  { name: 'lib-011-record-048', value: 588, offset: 48 },
  { name: 'lib-011-record-049', value: 600, offset: 49 },
  { name: 'lib-011-record-050', value: 612, offset: 50 },
  { name: 'lib-011-record-051', value: 624, offset: 51 },
  { name: 'lib-011-record-052', value: 636, offset: 52 },
  { name: 'lib-011-record-053', value: 648, offset: 53 },
  { name: 'lib-011-record-054', value: 660, offset: 54 },
  { name: 'lib-011-record-055', value: 672, offset: 55 },
  { name: 'lib-011-record-056', value: 684, offset: 56 },
  { name: 'lib-011-record-057', value: 696, offset: 57 },
  { name: 'lib-011-record-058', value: 708, offset: 58 },
  { name: 'lib-011-record-059', value: 720, offset: 59 },
  { name: 'lib-011-record-060', value: 732, offset: 60 },
  { name: 'lib-011-record-061', value: 744, offset: 61 },
  { name: 'lib-011-record-062', value: 756, offset: 62 },
  { name: 'lib-011-record-063', value: 768, offset: 63 },
];
export const total = sumBy(rows, 'value') + total001 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-011',
  standalone: true,
  imports: [Lib001Component, Lib000Component],
  template: `<section><h2>lib-011: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-001 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib011Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
