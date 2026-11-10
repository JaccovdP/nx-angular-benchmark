import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib004Component, total as total004 } from '@bench/lib-004';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-014-record-000', value: 15, offset: 0 },
  { name: 'lib-014-record-001', value: 30, offset: 1 },
  { name: 'lib-014-record-002', value: 45, offset: 2 },
  { name: 'lib-014-record-003', value: 60, offset: 3 },
  { name: 'lib-014-record-004', value: 75, offset: 4 },
  { name: 'lib-014-record-005', value: 90, offset: 5 },
  { name: 'lib-014-record-006', value: 105, offset: 6 },
  { name: 'lib-014-record-007', value: 120, offset: 7 },
  { name: 'lib-014-record-008', value: 135, offset: 8 },
  { name: 'lib-014-record-009', value: 150, offset: 9 },
  { name: 'lib-014-record-010', value: 165, offset: 10 },
  { name: 'lib-014-record-011', value: 180, offset: 11 },
  { name: 'lib-014-record-012', value: 195, offset: 12 },
  { name: 'lib-014-record-013', value: 210, offset: 13 },
  { name: 'lib-014-record-014', value: 225, offset: 14 },
  { name: 'lib-014-record-015', value: 240, offset: 15 },
  { name: 'lib-014-record-016', value: 255, offset: 16 },
  { name: 'lib-014-record-017', value: 270, offset: 17 },
  { name: 'lib-014-record-018', value: 285, offset: 18 },
  { name: 'lib-014-record-019', value: 300, offset: 19 },
  { name: 'lib-014-record-020', value: 315, offset: 20 },
  { name: 'lib-014-record-021', value: 330, offset: 21 },
  { name: 'lib-014-record-022', value: 345, offset: 22 },
  { name: 'lib-014-record-023', value: 360, offset: 23 },
  { name: 'lib-014-record-024', value: 375, offset: 24 },
  { name: 'lib-014-record-025', value: 390, offset: 25 },
  { name: 'lib-014-record-026', value: 405, offset: 26 },
  { name: 'lib-014-record-027', value: 420, offset: 27 },
  { name: 'lib-014-record-028', value: 435, offset: 28 },
  { name: 'lib-014-record-029', value: 450, offset: 29 },
  { name: 'lib-014-record-030', value: 465, offset: 30 },
  { name: 'lib-014-record-031', value: 480, offset: 31 },
  { name: 'lib-014-record-032', value: 495, offset: 32 },
  { name: 'lib-014-record-033', value: 510, offset: 33 },
  { name: 'lib-014-record-034', value: 525, offset: 34 },
  { name: 'lib-014-record-035', value: 540, offset: 35 },
  { name: 'lib-014-record-036', value: 555, offset: 36 },
  { name: 'lib-014-record-037', value: 570, offset: 37 },
  { name: 'lib-014-record-038', value: 585, offset: 38 },
  { name: 'lib-014-record-039', value: 600, offset: 39 },
  { name: 'lib-014-record-040', value: 615, offset: 40 },
  { name: 'lib-014-record-041', value: 630, offset: 41 },
  { name: 'lib-014-record-042', value: 645, offset: 42 },
  { name: 'lib-014-record-043', value: 660, offset: 43 },
  { name: 'lib-014-record-044', value: 675, offset: 44 },
  { name: 'lib-014-record-045', value: 690, offset: 45 },
  { name: 'lib-014-record-046', value: 705, offset: 46 },
  { name: 'lib-014-record-047', value: 720, offset: 47 },
  { name: 'lib-014-record-048', value: 735, offset: 48 },
  { name: 'lib-014-record-049', value: 750, offset: 49 },
  { name: 'lib-014-record-050', value: 765, offset: 50 },
  { name: 'lib-014-record-051', value: 780, offset: 51 },
  { name: 'lib-014-record-052', value: 795, offset: 52 },
  { name: 'lib-014-record-053', value: 810, offset: 53 },
  { name: 'lib-014-record-054', value: 825, offset: 54 },
  { name: 'lib-014-record-055', value: 840, offset: 55 },
  { name: 'lib-014-record-056', value: 855, offset: 56 },
  { name: 'lib-014-record-057', value: 870, offset: 57 },
  { name: 'lib-014-record-058', value: 885, offset: 58 },
  { name: 'lib-014-record-059', value: 900, offset: 59 },
  { name: 'lib-014-record-060', value: 915, offset: 60 },
  { name: 'lib-014-record-061', value: 930, offset: 61 },
  { name: 'lib-014-record-062', value: 945, offset: 62 },
  { name: 'lib-014-record-063', value: 960, offset: 63 },
];
export const total = sumBy(rows, 'value') + total004 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-014',
  standalone: true,
  imports: [Lib004Component, Lib000Component],
  template: `<section><h2>lib-014: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-004 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib014Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
