import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib054Component, total as total054 } from '@bench/lib-054';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-064-record-000', value: 65, offset: 0 },
  { name: 'lib-064-record-001', value: 130, offset: 1 },
  { name: 'lib-064-record-002', value: 195, offset: 2 },
  { name: 'lib-064-record-003', value: 260, offset: 3 },
  { name: 'lib-064-record-004', value: 325, offset: 4 },
  { name: 'lib-064-record-005', value: 390, offset: 5 },
  { name: 'lib-064-record-006', value: 455, offset: 6 },
  { name: 'lib-064-record-007', value: 520, offset: 7 },
  { name: 'lib-064-record-008', value: 585, offset: 8 },
  { name: 'lib-064-record-009', value: 650, offset: 9 },
  { name: 'lib-064-record-010', value: 715, offset: 10 },
  { name: 'lib-064-record-011', value: 780, offset: 11 },
  { name: 'lib-064-record-012', value: 845, offset: 12 },
  { name: 'lib-064-record-013', value: 910, offset: 13 },
  { name: 'lib-064-record-014', value: 975, offset: 14 },
  { name: 'lib-064-record-015', value: 1040, offset: 15 },
  { name: 'lib-064-record-016', value: 1105, offset: 16 },
  { name: 'lib-064-record-017', value: 1170, offset: 17 },
  { name: 'lib-064-record-018', value: 1235, offset: 18 },
  { name: 'lib-064-record-019', value: 1300, offset: 19 },
  { name: 'lib-064-record-020', value: 1365, offset: 20 },
  { name: 'lib-064-record-021', value: 1430, offset: 21 },
  { name: 'lib-064-record-022', value: 1495, offset: 22 },
  { name: 'lib-064-record-023', value: 1560, offset: 23 },
  { name: 'lib-064-record-024', value: 1625, offset: 24 },
  { name: 'lib-064-record-025', value: 1690, offset: 25 },
  { name: 'lib-064-record-026', value: 1755, offset: 26 },
  { name: 'lib-064-record-027', value: 1820, offset: 27 },
  { name: 'lib-064-record-028', value: 1885, offset: 28 },
  { name: 'lib-064-record-029', value: 1950, offset: 29 },
  { name: 'lib-064-record-030', value: 2015, offset: 30 },
  { name: 'lib-064-record-031', value: 2080, offset: 31 },
  { name: 'lib-064-record-032', value: 2145, offset: 32 },
  { name: 'lib-064-record-033', value: 2210, offset: 33 },
  { name: 'lib-064-record-034', value: 2275, offset: 34 },
  { name: 'lib-064-record-035', value: 2340, offset: 35 },
  { name: 'lib-064-record-036', value: 2405, offset: 36 },
  { name: 'lib-064-record-037', value: 2470, offset: 37 },
  { name: 'lib-064-record-038', value: 2535, offset: 38 },
  { name: 'lib-064-record-039', value: 2600, offset: 39 },
  { name: 'lib-064-record-040', value: 2665, offset: 40 },
  { name: 'lib-064-record-041', value: 2730, offset: 41 },
  { name: 'lib-064-record-042', value: 2795, offset: 42 },
  { name: 'lib-064-record-043', value: 2860, offset: 43 },
  { name: 'lib-064-record-044', value: 2925, offset: 44 },
  { name: 'lib-064-record-045', value: 2990, offset: 45 },
  { name: 'lib-064-record-046', value: 3055, offset: 46 },
  { name: 'lib-064-record-047', value: 3120, offset: 47 },
  { name: 'lib-064-record-048', value: 3185, offset: 48 },
  { name: 'lib-064-record-049', value: 3250, offset: 49 },
  { name: 'lib-064-record-050', value: 3315, offset: 50 },
  { name: 'lib-064-record-051', value: 3380, offset: 51 },
  { name: 'lib-064-record-052', value: 3445, offset: 52 },
  { name: 'lib-064-record-053', value: 3510, offset: 53 },
  { name: 'lib-064-record-054', value: 3575, offset: 54 },
  { name: 'lib-064-record-055', value: 3640, offset: 55 },
  { name: 'lib-064-record-056', value: 3705, offset: 56 },
  { name: 'lib-064-record-057', value: 3770, offset: 57 },
  { name: 'lib-064-record-058', value: 3835, offset: 58 },
  { name: 'lib-064-record-059', value: 3900, offset: 59 },
  { name: 'lib-064-record-060', value: 3965, offset: 60 },
  { name: 'lib-064-record-061', value: 4030, offset: 61 },
  { name: 'lib-064-record-062', value: 4095, offset: 62 },
  { name: 'lib-064-record-063', value: 4160, offset: 63 },
];
export const total = sumBy(rows, 'value') + total054 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-064',
  standalone: true,
  imports: [Lib054Component, Lib000Component],
  template: `<section><h2>lib-064: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-054 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib064Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
