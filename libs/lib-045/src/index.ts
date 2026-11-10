import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib035Component, total as total035 } from '@bench/lib-035';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-045-record-000', value: 46, offset: 0 },
  { name: 'lib-045-record-001', value: 92, offset: 1 },
  { name: 'lib-045-record-002', value: 138, offset: 2 },
  { name: 'lib-045-record-003', value: 184, offset: 3 },
  { name: 'lib-045-record-004', value: 230, offset: 4 },
  { name: 'lib-045-record-005', value: 276, offset: 5 },
  { name: 'lib-045-record-006', value: 322, offset: 6 },
  { name: 'lib-045-record-007', value: 368, offset: 7 },
  { name: 'lib-045-record-008', value: 414, offset: 8 },
  { name: 'lib-045-record-009', value: 460, offset: 9 },
  { name: 'lib-045-record-010', value: 506, offset: 10 },
  { name: 'lib-045-record-011', value: 552, offset: 11 },
  { name: 'lib-045-record-012', value: 598, offset: 12 },
  { name: 'lib-045-record-013', value: 644, offset: 13 },
  { name: 'lib-045-record-014', value: 690, offset: 14 },
  { name: 'lib-045-record-015', value: 736, offset: 15 },
  { name: 'lib-045-record-016', value: 782, offset: 16 },
  { name: 'lib-045-record-017', value: 828, offset: 17 },
  { name: 'lib-045-record-018', value: 874, offset: 18 },
  { name: 'lib-045-record-019', value: 920, offset: 19 },
  { name: 'lib-045-record-020', value: 966, offset: 20 },
  { name: 'lib-045-record-021', value: 1012, offset: 21 },
  { name: 'lib-045-record-022', value: 1058, offset: 22 },
  { name: 'lib-045-record-023', value: 1104, offset: 23 },
  { name: 'lib-045-record-024', value: 1150, offset: 24 },
  { name: 'lib-045-record-025', value: 1196, offset: 25 },
  { name: 'lib-045-record-026', value: 1242, offset: 26 },
  { name: 'lib-045-record-027', value: 1288, offset: 27 },
  { name: 'lib-045-record-028', value: 1334, offset: 28 },
  { name: 'lib-045-record-029', value: 1380, offset: 29 },
  { name: 'lib-045-record-030', value: 1426, offset: 30 },
  { name: 'lib-045-record-031', value: 1472, offset: 31 },
  { name: 'lib-045-record-032', value: 1518, offset: 32 },
  { name: 'lib-045-record-033', value: 1564, offset: 33 },
  { name: 'lib-045-record-034', value: 1610, offset: 34 },
  { name: 'lib-045-record-035', value: 1656, offset: 35 },
  { name: 'lib-045-record-036', value: 1702, offset: 36 },
  { name: 'lib-045-record-037', value: 1748, offset: 37 },
  { name: 'lib-045-record-038', value: 1794, offset: 38 },
  { name: 'lib-045-record-039', value: 1840, offset: 39 },
  { name: 'lib-045-record-040', value: 1886, offset: 40 },
  { name: 'lib-045-record-041', value: 1932, offset: 41 },
  { name: 'lib-045-record-042', value: 1978, offset: 42 },
  { name: 'lib-045-record-043', value: 2024, offset: 43 },
  { name: 'lib-045-record-044', value: 2070, offset: 44 },
  { name: 'lib-045-record-045', value: 2116, offset: 45 },
  { name: 'lib-045-record-046', value: 2162, offset: 46 },
  { name: 'lib-045-record-047', value: 2208, offset: 47 },
  { name: 'lib-045-record-048', value: 2254, offset: 48 },
  { name: 'lib-045-record-049', value: 2300, offset: 49 },
  { name: 'lib-045-record-050', value: 2346, offset: 50 },
  { name: 'lib-045-record-051', value: 2392, offset: 51 },
  { name: 'lib-045-record-052', value: 2438, offset: 52 },
  { name: 'lib-045-record-053', value: 2484, offset: 53 },
  { name: 'lib-045-record-054', value: 2530, offset: 54 },
  { name: 'lib-045-record-055', value: 2576, offset: 55 },
  { name: 'lib-045-record-056', value: 2622, offset: 56 },
  { name: 'lib-045-record-057', value: 2668, offset: 57 },
  { name: 'lib-045-record-058', value: 2714, offset: 58 },
  { name: 'lib-045-record-059', value: 2760, offset: 59 },
  { name: 'lib-045-record-060', value: 2806, offset: 60 },
  { name: 'lib-045-record-061', value: 2852, offset: 61 },
  { name: 'lib-045-record-062', value: 2898, offset: 62 },
  { name: 'lib-045-record-063', value: 2944, offset: 63 },
];
export const total = sumBy(rows, 'value') + total035 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-045',
  standalone: true,
  imports: [Lib035Component, Lib000Component],
  template: `<section><h2>lib-045: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-035 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib045Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
