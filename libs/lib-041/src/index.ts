import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib031Component, total as total031 } from '@bench/lib-031';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-041-record-000', value: 42, offset: 0 },
  { name: 'lib-041-record-001', value: 84, offset: 1 },
  { name: 'lib-041-record-002', value: 126, offset: 2 },
  { name: 'lib-041-record-003', value: 168, offset: 3 },
  { name: 'lib-041-record-004', value: 210, offset: 4 },
  { name: 'lib-041-record-005', value: 252, offset: 5 },
  { name: 'lib-041-record-006', value: 294, offset: 6 },
  { name: 'lib-041-record-007', value: 336, offset: 7 },
  { name: 'lib-041-record-008', value: 378, offset: 8 },
  { name: 'lib-041-record-009', value: 420, offset: 9 },
  { name: 'lib-041-record-010', value: 462, offset: 10 },
  { name: 'lib-041-record-011', value: 504, offset: 11 },
  { name: 'lib-041-record-012', value: 546, offset: 12 },
  { name: 'lib-041-record-013', value: 588, offset: 13 },
  { name: 'lib-041-record-014', value: 630, offset: 14 },
  { name: 'lib-041-record-015', value: 672, offset: 15 },
  { name: 'lib-041-record-016', value: 714, offset: 16 },
  { name: 'lib-041-record-017', value: 756, offset: 17 },
  { name: 'lib-041-record-018', value: 798, offset: 18 },
  { name: 'lib-041-record-019', value: 840, offset: 19 },
  { name: 'lib-041-record-020', value: 882, offset: 20 },
  { name: 'lib-041-record-021', value: 924, offset: 21 },
  { name: 'lib-041-record-022', value: 966, offset: 22 },
  { name: 'lib-041-record-023', value: 1008, offset: 23 },
  { name: 'lib-041-record-024', value: 1050, offset: 24 },
  { name: 'lib-041-record-025', value: 1092, offset: 25 },
  { name: 'lib-041-record-026', value: 1134, offset: 26 },
  { name: 'lib-041-record-027', value: 1176, offset: 27 },
  { name: 'lib-041-record-028', value: 1218, offset: 28 },
  { name: 'lib-041-record-029', value: 1260, offset: 29 },
  { name: 'lib-041-record-030', value: 1302, offset: 30 },
  { name: 'lib-041-record-031', value: 1344, offset: 31 },
  { name: 'lib-041-record-032', value: 1386, offset: 32 },
  { name: 'lib-041-record-033', value: 1428, offset: 33 },
  { name: 'lib-041-record-034', value: 1470, offset: 34 },
  { name: 'lib-041-record-035', value: 1512, offset: 35 },
  { name: 'lib-041-record-036', value: 1554, offset: 36 },
  { name: 'lib-041-record-037', value: 1596, offset: 37 },
  { name: 'lib-041-record-038', value: 1638, offset: 38 },
  { name: 'lib-041-record-039', value: 1680, offset: 39 },
  { name: 'lib-041-record-040', value: 1722, offset: 40 },
  { name: 'lib-041-record-041', value: 1764, offset: 41 },
  { name: 'lib-041-record-042', value: 1806, offset: 42 },
  { name: 'lib-041-record-043', value: 1848, offset: 43 },
  { name: 'lib-041-record-044', value: 1890, offset: 44 },
  { name: 'lib-041-record-045', value: 1932, offset: 45 },
  { name: 'lib-041-record-046', value: 1974, offset: 46 },
  { name: 'lib-041-record-047', value: 2016, offset: 47 },
  { name: 'lib-041-record-048', value: 2058, offset: 48 },
  { name: 'lib-041-record-049', value: 2100, offset: 49 },
  { name: 'lib-041-record-050', value: 2142, offset: 50 },
  { name: 'lib-041-record-051', value: 2184, offset: 51 },
  { name: 'lib-041-record-052', value: 2226, offset: 52 },
  { name: 'lib-041-record-053', value: 2268, offset: 53 },
  { name: 'lib-041-record-054', value: 2310, offset: 54 },
  { name: 'lib-041-record-055', value: 2352, offset: 55 },
  { name: 'lib-041-record-056', value: 2394, offset: 56 },
  { name: 'lib-041-record-057', value: 2436, offset: 57 },
  { name: 'lib-041-record-058', value: 2478, offset: 58 },
  { name: 'lib-041-record-059', value: 2520, offset: 59 },
  { name: 'lib-041-record-060', value: 2562, offset: 60 },
  { name: 'lib-041-record-061', value: 2604, offset: 61 },
  { name: 'lib-041-record-062', value: 2646, offset: 62 },
  { name: 'lib-041-record-063', value: 2688, offset: 63 },
];
export const total = sumBy(rows, 'value') + total031 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-041',
  standalone: true,
  imports: [Lib031Component, Lib000Component],
  template: `<section><h2>lib-041: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-031 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib041Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
