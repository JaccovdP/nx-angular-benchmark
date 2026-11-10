import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib030Component, total as total030 } from '@bench/lib-030';

const rows = [
  { name: 'lib-040-record-000', value: 41, offset: 0 },
  { name: 'lib-040-record-001', value: 82, offset: 1 },
  { name: 'lib-040-record-002', value: 123, offset: 2 },
  { name: 'lib-040-record-003', value: 164, offset: 3 },
  { name: 'lib-040-record-004', value: 205, offset: 4 },
  { name: 'lib-040-record-005', value: 246, offset: 5 },
  { name: 'lib-040-record-006', value: 287, offset: 6 },
  { name: 'lib-040-record-007', value: 328, offset: 7 },
  { name: 'lib-040-record-008', value: 369, offset: 8 },
  { name: 'lib-040-record-009', value: 410, offset: 9 },
  { name: 'lib-040-record-010', value: 451, offset: 10 },
  { name: 'lib-040-record-011', value: 492, offset: 11 },
  { name: 'lib-040-record-012', value: 533, offset: 12 },
  { name: 'lib-040-record-013', value: 574, offset: 13 },
  { name: 'lib-040-record-014', value: 615, offset: 14 },
  { name: 'lib-040-record-015', value: 656, offset: 15 },
  { name: 'lib-040-record-016', value: 697, offset: 16 },
  { name: 'lib-040-record-017', value: 738, offset: 17 },
  { name: 'lib-040-record-018', value: 779, offset: 18 },
  { name: 'lib-040-record-019', value: 820, offset: 19 },
  { name: 'lib-040-record-020', value: 861, offset: 20 },
  { name: 'lib-040-record-021', value: 902, offset: 21 },
  { name: 'lib-040-record-022', value: 943, offset: 22 },
  { name: 'lib-040-record-023', value: 984, offset: 23 },
  { name: 'lib-040-record-024', value: 1025, offset: 24 },
  { name: 'lib-040-record-025', value: 1066, offset: 25 },
  { name: 'lib-040-record-026', value: 1107, offset: 26 },
  { name: 'lib-040-record-027', value: 1148, offset: 27 },
  { name: 'lib-040-record-028', value: 1189, offset: 28 },
  { name: 'lib-040-record-029', value: 1230, offset: 29 },
  { name: 'lib-040-record-030', value: 1271, offset: 30 },
  { name: 'lib-040-record-031', value: 1312, offset: 31 },
  { name: 'lib-040-record-032', value: 1353, offset: 32 },
  { name: 'lib-040-record-033', value: 1394, offset: 33 },
  { name: 'lib-040-record-034', value: 1435, offset: 34 },
  { name: 'lib-040-record-035', value: 1476, offset: 35 },
  { name: 'lib-040-record-036', value: 1517, offset: 36 },
  { name: 'lib-040-record-037', value: 1558, offset: 37 },
  { name: 'lib-040-record-038', value: 1599, offset: 38 },
  { name: 'lib-040-record-039', value: 1640, offset: 39 },
  { name: 'lib-040-record-040', value: 1681, offset: 40 },
  { name: 'lib-040-record-041', value: 1722, offset: 41 },
  { name: 'lib-040-record-042', value: 1763, offset: 42 },
  { name: 'lib-040-record-043', value: 1804, offset: 43 },
  { name: 'lib-040-record-044', value: 1845, offset: 44 },
  { name: 'lib-040-record-045', value: 1886, offset: 45 },
  { name: 'lib-040-record-046', value: 1927, offset: 46 },
  { name: 'lib-040-record-047', value: 1968, offset: 47 },
  { name: 'lib-040-record-048', value: 2009, offset: 48 },
  { name: 'lib-040-record-049', value: 2050, offset: 49 },
  { name: 'lib-040-record-050', value: 2091, offset: 50 },
  { name: 'lib-040-record-051', value: 2132, offset: 51 },
  { name: 'lib-040-record-052', value: 2173, offset: 52 },
  { name: 'lib-040-record-053', value: 2214, offset: 53 },
  { name: 'lib-040-record-054', value: 2255, offset: 54 },
  { name: 'lib-040-record-055', value: 2296, offset: 55 },
  { name: 'lib-040-record-056', value: 2337, offset: 56 },
  { name: 'lib-040-record-057', value: 2378, offset: 57 },
  { name: 'lib-040-record-058', value: 2419, offset: 58 },
  { name: 'lib-040-record-059', value: 2460, offset: 59 },
  { name: 'lib-040-record-060', value: 2501, offset: 60 },
  { name: 'lib-040-record-061', value: 2542, offset: 61 },
  { name: 'lib-040-record-062', value: 2583, offset: 62 },
  { name: 'lib-040-record-063', value: 2624, offset: 63 },
];
export const total = sumBy(rows, 'value') + total030;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-040',
  standalone: true,
  imports: [Lib030Component],
  template: `<section><h2>lib-040: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-030 />
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib040Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
