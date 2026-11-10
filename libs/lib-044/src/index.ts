import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib034Component, total as total034 } from '@bench/lib-034';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-044-record-000', value: 45, offset: 0 },
  { name: 'lib-044-record-001', value: 90, offset: 1 },
  { name: 'lib-044-record-002', value: 135, offset: 2 },
  { name: 'lib-044-record-003', value: 180, offset: 3 },
  { name: 'lib-044-record-004', value: 225, offset: 4 },
  { name: 'lib-044-record-005', value: 270, offset: 5 },
  { name: 'lib-044-record-006', value: 315, offset: 6 },
  { name: 'lib-044-record-007', value: 360, offset: 7 },
  { name: 'lib-044-record-008', value: 405, offset: 8 },
  { name: 'lib-044-record-009', value: 450, offset: 9 },
  { name: 'lib-044-record-010', value: 495, offset: 10 },
  { name: 'lib-044-record-011', value: 540, offset: 11 },
  { name: 'lib-044-record-012', value: 585, offset: 12 },
  { name: 'lib-044-record-013', value: 630, offset: 13 },
  { name: 'lib-044-record-014', value: 675, offset: 14 },
  { name: 'lib-044-record-015', value: 720, offset: 15 },
  { name: 'lib-044-record-016', value: 765, offset: 16 },
  { name: 'lib-044-record-017', value: 810, offset: 17 },
  { name: 'lib-044-record-018', value: 855, offset: 18 },
  { name: 'lib-044-record-019', value: 900, offset: 19 },
  { name: 'lib-044-record-020', value: 945, offset: 20 },
  { name: 'lib-044-record-021', value: 990, offset: 21 },
  { name: 'lib-044-record-022', value: 1035, offset: 22 },
  { name: 'lib-044-record-023', value: 1080, offset: 23 },
  { name: 'lib-044-record-024', value: 1125, offset: 24 },
  { name: 'lib-044-record-025', value: 1170, offset: 25 },
  { name: 'lib-044-record-026', value: 1215, offset: 26 },
  { name: 'lib-044-record-027', value: 1260, offset: 27 },
  { name: 'lib-044-record-028', value: 1305, offset: 28 },
  { name: 'lib-044-record-029', value: 1350, offset: 29 },
  { name: 'lib-044-record-030', value: 1395, offset: 30 },
  { name: 'lib-044-record-031', value: 1440, offset: 31 },
  { name: 'lib-044-record-032', value: 1485, offset: 32 },
  { name: 'lib-044-record-033', value: 1530, offset: 33 },
  { name: 'lib-044-record-034', value: 1575, offset: 34 },
  { name: 'lib-044-record-035', value: 1620, offset: 35 },
  { name: 'lib-044-record-036', value: 1665, offset: 36 },
  { name: 'lib-044-record-037', value: 1710, offset: 37 },
  { name: 'lib-044-record-038', value: 1755, offset: 38 },
  { name: 'lib-044-record-039', value: 1800, offset: 39 },
  { name: 'lib-044-record-040', value: 1845, offset: 40 },
  { name: 'lib-044-record-041', value: 1890, offset: 41 },
  { name: 'lib-044-record-042', value: 1935, offset: 42 },
  { name: 'lib-044-record-043', value: 1980, offset: 43 },
  { name: 'lib-044-record-044', value: 2025, offset: 44 },
  { name: 'lib-044-record-045', value: 2070, offset: 45 },
  { name: 'lib-044-record-046', value: 2115, offset: 46 },
  { name: 'lib-044-record-047', value: 2160, offset: 47 },
  { name: 'lib-044-record-048', value: 2205, offset: 48 },
  { name: 'lib-044-record-049', value: 2250, offset: 49 },
  { name: 'lib-044-record-050', value: 2295, offset: 50 },
  { name: 'lib-044-record-051', value: 2340, offset: 51 },
  { name: 'lib-044-record-052', value: 2385, offset: 52 },
  { name: 'lib-044-record-053', value: 2430, offset: 53 },
  { name: 'lib-044-record-054', value: 2475, offset: 54 },
  { name: 'lib-044-record-055', value: 2520, offset: 55 },
  { name: 'lib-044-record-056', value: 2565, offset: 56 },
  { name: 'lib-044-record-057', value: 2610, offset: 57 },
  { name: 'lib-044-record-058', value: 2655, offset: 58 },
  { name: 'lib-044-record-059', value: 2700, offset: 59 },
  { name: 'lib-044-record-060', value: 2745, offset: 60 },
  { name: 'lib-044-record-061', value: 2790, offset: 61 },
  { name: 'lib-044-record-062', value: 2835, offset: 62 },
  { name: 'lib-044-record-063', value: 2880, offset: 63 },
];
export const total = sumBy(rows, 'value') + total034 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-044',
  standalone: true,
  imports: [Lib034Component, Lib000Component],
  template: `<section><h2>lib-044: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-034 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib044Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
