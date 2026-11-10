import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib019Component, total as total019 } from '@bench/lib-019';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-029-record-000', value: 30, offset: 0 },
  { name: 'lib-029-record-001', value: 60, offset: 1 },
  { name: 'lib-029-record-002', value: 90, offset: 2 },
  { name: 'lib-029-record-003', value: 120, offset: 3 },
  { name: 'lib-029-record-004', value: 150, offset: 4 },
  { name: 'lib-029-record-005', value: 180, offset: 5 },
  { name: 'lib-029-record-006', value: 210, offset: 6 },
  { name: 'lib-029-record-007', value: 240, offset: 7 },
  { name: 'lib-029-record-008', value: 270, offset: 8 },
  { name: 'lib-029-record-009', value: 300, offset: 9 },
  { name: 'lib-029-record-010', value: 330, offset: 10 },
  { name: 'lib-029-record-011', value: 360, offset: 11 },
  { name: 'lib-029-record-012', value: 390, offset: 12 },
  { name: 'lib-029-record-013', value: 420, offset: 13 },
  { name: 'lib-029-record-014', value: 450, offset: 14 },
  { name: 'lib-029-record-015', value: 480, offset: 15 },
  { name: 'lib-029-record-016', value: 510, offset: 16 },
  { name: 'lib-029-record-017', value: 540, offset: 17 },
  { name: 'lib-029-record-018', value: 570, offset: 18 },
  { name: 'lib-029-record-019', value: 600, offset: 19 },
  { name: 'lib-029-record-020', value: 630, offset: 20 },
  { name: 'lib-029-record-021', value: 660, offset: 21 },
  { name: 'lib-029-record-022', value: 690, offset: 22 },
  { name: 'lib-029-record-023', value: 720, offset: 23 },
  { name: 'lib-029-record-024', value: 750, offset: 24 },
  { name: 'lib-029-record-025', value: 780, offset: 25 },
  { name: 'lib-029-record-026', value: 810, offset: 26 },
  { name: 'lib-029-record-027', value: 840, offset: 27 },
  { name: 'lib-029-record-028', value: 870, offset: 28 },
  { name: 'lib-029-record-029', value: 900, offset: 29 },
  { name: 'lib-029-record-030', value: 930, offset: 30 },
  { name: 'lib-029-record-031', value: 960, offset: 31 },
  { name: 'lib-029-record-032', value: 990, offset: 32 },
  { name: 'lib-029-record-033', value: 1020, offset: 33 },
  { name: 'lib-029-record-034', value: 1050, offset: 34 },
  { name: 'lib-029-record-035', value: 1080, offset: 35 },
  { name: 'lib-029-record-036', value: 1110, offset: 36 },
  { name: 'lib-029-record-037', value: 1140, offset: 37 },
  { name: 'lib-029-record-038', value: 1170, offset: 38 },
  { name: 'lib-029-record-039', value: 1200, offset: 39 },
  { name: 'lib-029-record-040', value: 1230, offset: 40 },
  { name: 'lib-029-record-041', value: 1260, offset: 41 },
  { name: 'lib-029-record-042', value: 1290, offset: 42 },
  { name: 'lib-029-record-043', value: 1320, offset: 43 },
  { name: 'lib-029-record-044', value: 1350, offset: 44 },
  { name: 'lib-029-record-045', value: 1380, offset: 45 },
  { name: 'lib-029-record-046', value: 1410, offset: 46 },
  { name: 'lib-029-record-047', value: 1440, offset: 47 },
  { name: 'lib-029-record-048', value: 1470, offset: 48 },
  { name: 'lib-029-record-049', value: 1500, offset: 49 },
  { name: 'lib-029-record-050', value: 1530, offset: 50 },
  { name: 'lib-029-record-051', value: 1560, offset: 51 },
  { name: 'lib-029-record-052', value: 1590, offset: 52 },
  { name: 'lib-029-record-053', value: 1620, offset: 53 },
  { name: 'lib-029-record-054', value: 1650, offset: 54 },
  { name: 'lib-029-record-055', value: 1680, offset: 55 },
  { name: 'lib-029-record-056', value: 1710, offset: 56 },
  { name: 'lib-029-record-057', value: 1740, offset: 57 },
  { name: 'lib-029-record-058', value: 1770, offset: 58 },
  { name: 'lib-029-record-059', value: 1800, offset: 59 },
  { name: 'lib-029-record-060', value: 1830, offset: 60 },
  { name: 'lib-029-record-061', value: 1860, offset: 61 },
  { name: 'lib-029-record-062', value: 1890, offset: 62 },
  { name: 'lib-029-record-063', value: 1920, offset: 63 },
];
export const total = sumBy(rows, 'value') + total019 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-029',
  standalone: true,
  imports: [Lib019Component, Lib000Component],
  template: `<section><h2>lib-029: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-019 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib029Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
