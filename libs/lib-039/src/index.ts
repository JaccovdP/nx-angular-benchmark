import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib029Component, total as total029 } from '@bench/lib-029';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-039-record-000', value: 40, offset: 0 },
  { name: 'lib-039-record-001', value: 80, offset: 1 },
  { name: 'lib-039-record-002', value: 120, offset: 2 },
  { name: 'lib-039-record-003', value: 160, offset: 3 },
  { name: 'lib-039-record-004', value: 200, offset: 4 },
  { name: 'lib-039-record-005', value: 240, offset: 5 },
  { name: 'lib-039-record-006', value: 280, offset: 6 },
  { name: 'lib-039-record-007', value: 320, offset: 7 },
  { name: 'lib-039-record-008', value: 360, offset: 8 },
  { name: 'lib-039-record-009', value: 400, offset: 9 },
  { name: 'lib-039-record-010', value: 440, offset: 10 },
  { name: 'lib-039-record-011', value: 480, offset: 11 },
  { name: 'lib-039-record-012', value: 520, offset: 12 },
  { name: 'lib-039-record-013', value: 560, offset: 13 },
  { name: 'lib-039-record-014', value: 600, offset: 14 },
  { name: 'lib-039-record-015', value: 640, offset: 15 },
  { name: 'lib-039-record-016', value: 680, offset: 16 },
  { name: 'lib-039-record-017', value: 720, offset: 17 },
  { name: 'lib-039-record-018', value: 760, offset: 18 },
  { name: 'lib-039-record-019', value: 800, offset: 19 },
  { name: 'lib-039-record-020', value: 840, offset: 20 },
  { name: 'lib-039-record-021', value: 880, offset: 21 },
  { name: 'lib-039-record-022', value: 920, offset: 22 },
  { name: 'lib-039-record-023', value: 960, offset: 23 },
  { name: 'lib-039-record-024', value: 1000, offset: 24 },
  { name: 'lib-039-record-025', value: 1040, offset: 25 },
  { name: 'lib-039-record-026', value: 1080, offset: 26 },
  { name: 'lib-039-record-027', value: 1120, offset: 27 },
  { name: 'lib-039-record-028', value: 1160, offset: 28 },
  { name: 'lib-039-record-029', value: 1200, offset: 29 },
  { name: 'lib-039-record-030', value: 1240, offset: 30 },
  { name: 'lib-039-record-031', value: 1280, offset: 31 },
  { name: 'lib-039-record-032', value: 1320, offset: 32 },
  { name: 'lib-039-record-033', value: 1360, offset: 33 },
  { name: 'lib-039-record-034', value: 1400, offset: 34 },
  { name: 'lib-039-record-035', value: 1440, offset: 35 },
  { name: 'lib-039-record-036', value: 1480, offset: 36 },
  { name: 'lib-039-record-037', value: 1520, offset: 37 },
  { name: 'lib-039-record-038', value: 1560, offset: 38 },
  { name: 'lib-039-record-039', value: 1600, offset: 39 },
  { name: 'lib-039-record-040', value: 1640, offset: 40 },
  { name: 'lib-039-record-041', value: 1680, offset: 41 },
  { name: 'lib-039-record-042', value: 1720, offset: 42 },
  { name: 'lib-039-record-043', value: 1760, offset: 43 },
  { name: 'lib-039-record-044', value: 1800, offset: 44 },
  { name: 'lib-039-record-045', value: 1840, offset: 45 },
  { name: 'lib-039-record-046', value: 1880, offset: 46 },
  { name: 'lib-039-record-047', value: 1920, offset: 47 },
  { name: 'lib-039-record-048', value: 1960, offset: 48 },
  { name: 'lib-039-record-049', value: 2000, offset: 49 },
  { name: 'lib-039-record-050', value: 2040, offset: 50 },
  { name: 'lib-039-record-051', value: 2080, offset: 51 },
  { name: 'lib-039-record-052', value: 2120, offset: 52 },
  { name: 'lib-039-record-053', value: 2160, offset: 53 },
  { name: 'lib-039-record-054', value: 2200, offset: 54 },
  { name: 'lib-039-record-055', value: 2240, offset: 55 },
  { name: 'lib-039-record-056', value: 2280, offset: 56 },
  { name: 'lib-039-record-057', value: 2320, offset: 57 },
  { name: 'lib-039-record-058', value: 2360, offset: 58 },
  { name: 'lib-039-record-059', value: 2400, offset: 59 },
  { name: 'lib-039-record-060', value: 2440, offset: 60 },
  { name: 'lib-039-record-061', value: 2480, offset: 61 },
  { name: 'lib-039-record-062', value: 2520, offset: 62 },
  { name: 'lib-039-record-063', value: 2560, offset: 63 },
];
export const total = sumBy(rows, 'value') + total029 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-039',
  standalone: true,
  imports: [Lib029Component, Lib000Component],
  template: `<section><h2>lib-039: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-029 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib039Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
