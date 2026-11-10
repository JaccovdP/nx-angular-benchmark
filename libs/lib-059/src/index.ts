import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib049Component, total as total049 } from '@bench/lib-049';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-059-record-000', value: 60, offset: 0 },
  { name: 'lib-059-record-001', value: 120, offset: 1 },
  { name: 'lib-059-record-002', value: 180, offset: 2 },
  { name: 'lib-059-record-003', value: 240, offset: 3 },
  { name: 'lib-059-record-004', value: 300, offset: 4 },
  { name: 'lib-059-record-005', value: 360, offset: 5 },
  { name: 'lib-059-record-006', value: 420, offset: 6 },
  { name: 'lib-059-record-007', value: 480, offset: 7 },
  { name: 'lib-059-record-008', value: 540, offset: 8 },
  { name: 'lib-059-record-009', value: 600, offset: 9 },
  { name: 'lib-059-record-010', value: 660, offset: 10 },
  { name: 'lib-059-record-011', value: 720, offset: 11 },
  { name: 'lib-059-record-012', value: 780, offset: 12 },
  { name: 'lib-059-record-013', value: 840, offset: 13 },
  { name: 'lib-059-record-014', value: 900, offset: 14 },
  { name: 'lib-059-record-015', value: 960, offset: 15 },
  { name: 'lib-059-record-016', value: 1020, offset: 16 },
  { name: 'lib-059-record-017', value: 1080, offset: 17 },
  { name: 'lib-059-record-018', value: 1140, offset: 18 },
  { name: 'lib-059-record-019', value: 1200, offset: 19 },
  { name: 'lib-059-record-020', value: 1260, offset: 20 },
  { name: 'lib-059-record-021', value: 1320, offset: 21 },
  { name: 'lib-059-record-022', value: 1380, offset: 22 },
  { name: 'lib-059-record-023', value: 1440, offset: 23 },
  { name: 'lib-059-record-024', value: 1500, offset: 24 },
  { name: 'lib-059-record-025', value: 1560, offset: 25 },
  { name: 'lib-059-record-026', value: 1620, offset: 26 },
  { name: 'lib-059-record-027', value: 1680, offset: 27 },
  { name: 'lib-059-record-028', value: 1740, offset: 28 },
  { name: 'lib-059-record-029', value: 1800, offset: 29 },
  { name: 'lib-059-record-030', value: 1860, offset: 30 },
  { name: 'lib-059-record-031', value: 1920, offset: 31 },
  { name: 'lib-059-record-032', value: 1980, offset: 32 },
  { name: 'lib-059-record-033', value: 2040, offset: 33 },
  { name: 'lib-059-record-034', value: 2100, offset: 34 },
  { name: 'lib-059-record-035', value: 2160, offset: 35 },
  { name: 'lib-059-record-036', value: 2220, offset: 36 },
  { name: 'lib-059-record-037', value: 2280, offset: 37 },
  { name: 'lib-059-record-038', value: 2340, offset: 38 },
  { name: 'lib-059-record-039', value: 2400, offset: 39 },
  { name: 'lib-059-record-040', value: 2460, offset: 40 },
  { name: 'lib-059-record-041', value: 2520, offset: 41 },
  { name: 'lib-059-record-042', value: 2580, offset: 42 },
  { name: 'lib-059-record-043', value: 2640, offset: 43 },
  { name: 'lib-059-record-044', value: 2700, offset: 44 },
  { name: 'lib-059-record-045', value: 2760, offset: 45 },
  { name: 'lib-059-record-046', value: 2820, offset: 46 },
  { name: 'lib-059-record-047', value: 2880, offset: 47 },
  { name: 'lib-059-record-048', value: 2940, offset: 48 },
  { name: 'lib-059-record-049', value: 3000, offset: 49 },
  { name: 'lib-059-record-050', value: 3060, offset: 50 },
  { name: 'lib-059-record-051', value: 3120, offset: 51 },
  { name: 'lib-059-record-052', value: 3180, offset: 52 },
  { name: 'lib-059-record-053', value: 3240, offset: 53 },
  { name: 'lib-059-record-054', value: 3300, offset: 54 },
  { name: 'lib-059-record-055', value: 3360, offset: 55 },
  { name: 'lib-059-record-056', value: 3420, offset: 56 },
  { name: 'lib-059-record-057', value: 3480, offset: 57 },
  { name: 'lib-059-record-058', value: 3540, offset: 58 },
  { name: 'lib-059-record-059', value: 3600, offset: 59 },
  { name: 'lib-059-record-060', value: 3660, offset: 60 },
  { name: 'lib-059-record-061', value: 3720, offset: 61 },
  { name: 'lib-059-record-062', value: 3780, offset: 62 },
  { name: 'lib-059-record-063', value: 3840, offset: 63 },
];
export const total = sumBy(rows, 'value') + total049 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-059',
  standalone: true,
  imports: [Lib049Component, Lib000Component],
  template: `<section><h2>lib-059: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-049 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib059Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
