import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib025Component, total as total025 } from '@bench/lib-025';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-035-record-000', value: 36, offset: 0 },
  { name: 'lib-035-record-001', value: 72, offset: 1 },
  { name: 'lib-035-record-002', value: 108, offset: 2 },
  { name: 'lib-035-record-003', value: 144, offset: 3 },
  { name: 'lib-035-record-004', value: 180, offset: 4 },
  { name: 'lib-035-record-005', value: 216, offset: 5 },
  { name: 'lib-035-record-006', value: 252, offset: 6 },
  { name: 'lib-035-record-007', value: 288, offset: 7 },
  { name: 'lib-035-record-008', value: 324, offset: 8 },
  { name: 'lib-035-record-009', value: 360, offset: 9 },
  { name: 'lib-035-record-010', value: 396, offset: 10 },
  { name: 'lib-035-record-011', value: 432, offset: 11 },
  { name: 'lib-035-record-012', value: 468, offset: 12 },
  { name: 'lib-035-record-013', value: 504, offset: 13 },
  { name: 'lib-035-record-014', value: 540, offset: 14 },
  { name: 'lib-035-record-015', value: 576, offset: 15 },
  { name: 'lib-035-record-016', value: 612, offset: 16 },
  { name: 'lib-035-record-017', value: 648, offset: 17 },
  { name: 'lib-035-record-018', value: 684, offset: 18 },
  { name: 'lib-035-record-019', value: 720, offset: 19 },
  { name: 'lib-035-record-020', value: 756, offset: 20 },
  { name: 'lib-035-record-021', value: 792, offset: 21 },
  { name: 'lib-035-record-022', value: 828, offset: 22 },
  { name: 'lib-035-record-023', value: 864, offset: 23 },
  { name: 'lib-035-record-024', value: 900, offset: 24 },
  { name: 'lib-035-record-025', value: 936, offset: 25 },
  { name: 'lib-035-record-026', value: 972, offset: 26 },
  { name: 'lib-035-record-027', value: 1008, offset: 27 },
  { name: 'lib-035-record-028', value: 1044, offset: 28 },
  { name: 'lib-035-record-029', value: 1080, offset: 29 },
  { name: 'lib-035-record-030', value: 1116, offset: 30 },
  { name: 'lib-035-record-031', value: 1152, offset: 31 },
  { name: 'lib-035-record-032', value: 1188, offset: 32 },
  { name: 'lib-035-record-033', value: 1224, offset: 33 },
  { name: 'lib-035-record-034', value: 1260, offset: 34 },
  { name: 'lib-035-record-035', value: 1296, offset: 35 },
  { name: 'lib-035-record-036', value: 1332, offset: 36 },
  { name: 'lib-035-record-037', value: 1368, offset: 37 },
  { name: 'lib-035-record-038', value: 1404, offset: 38 },
  { name: 'lib-035-record-039', value: 1440, offset: 39 },
  { name: 'lib-035-record-040', value: 1476, offset: 40 },
  { name: 'lib-035-record-041', value: 1512, offset: 41 },
  { name: 'lib-035-record-042', value: 1548, offset: 42 },
  { name: 'lib-035-record-043', value: 1584, offset: 43 },
  { name: 'lib-035-record-044', value: 1620, offset: 44 },
  { name: 'lib-035-record-045', value: 1656, offset: 45 },
  { name: 'lib-035-record-046', value: 1692, offset: 46 },
  { name: 'lib-035-record-047', value: 1728, offset: 47 },
  { name: 'lib-035-record-048', value: 1764, offset: 48 },
  { name: 'lib-035-record-049', value: 1800, offset: 49 },
  { name: 'lib-035-record-050', value: 1836, offset: 50 },
  { name: 'lib-035-record-051', value: 1872, offset: 51 },
  { name: 'lib-035-record-052', value: 1908, offset: 52 },
  { name: 'lib-035-record-053', value: 1944, offset: 53 },
  { name: 'lib-035-record-054', value: 1980, offset: 54 },
  { name: 'lib-035-record-055', value: 2016, offset: 55 },
  { name: 'lib-035-record-056', value: 2052, offset: 56 },
  { name: 'lib-035-record-057', value: 2088, offset: 57 },
  { name: 'lib-035-record-058', value: 2124, offset: 58 },
  { name: 'lib-035-record-059', value: 2160, offset: 59 },
  { name: 'lib-035-record-060', value: 2196, offset: 60 },
  { name: 'lib-035-record-061', value: 2232, offset: 61 },
  { name: 'lib-035-record-062', value: 2268, offset: 62 },
  { name: 'lib-035-record-063', value: 2304, offset: 63 },
];
export const total = sumBy(rows, 'value') + total025 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-035',
  standalone: true,
  imports: [Lib025Component, Lib000Component],
  template: `<section><h2>lib-035: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-025 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib035Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
