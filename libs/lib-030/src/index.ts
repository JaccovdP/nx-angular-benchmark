import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib020Component, total as total020 } from '@bench/lib-020';

const rows = [
  { name: 'lib-030-record-000', value: 31, offset: 0 },
  { name: 'lib-030-record-001', value: 62, offset: 1 },
  { name: 'lib-030-record-002', value: 93, offset: 2 },
  { name: 'lib-030-record-003', value: 124, offset: 3 },
  { name: 'lib-030-record-004', value: 155, offset: 4 },
  { name: 'lib-030-record-005', value: 186, offset: 5 },
  { name: 'lib-030-record-006', value: 217, offset: 6 },
  { name: 'lib-030-record-007', value: 248, offset: 7 },
  { name: 'lib-030-record-008', value: 279, offset: 8 },
  { name: 'lib-030-record-009', value: 310, offset: 9 },
  { name: 'lib-030-record-010', value: 341, offset: 10 },
  { name: 'lib-030-record-011', value: 372, offset: 11 },
  { name: 'lib-030-record-012', value: 403, offset: 12 },
  { name: 'lib-030-record-013', value: 434, offset: 13 },
  { name: 'lib-030-record-014', value: 465, offset: 14 },
  { name: 'lib-030-record-015', value: 496, offset: 15 },
  { name: 'lib-030-record-016', value: 527, offset: 16 },
  { name: 'lib-030-record-017', value: 558, offset: 17 },
  { name: 'lib-030-record-018', value: 589, offset: 18 },
  { name: 'lib-030-record-019', value: 620, offset: 19 },
  { name: 'lib-030-record-020', value: 651, offset: 20 },
  { name: 'lib-030-record-021', value: 682, offset: 21 },
  { name: 'lib-030-record-022', value: 713, offset: 22 },
  { name: 'lib-030-record-023', value: 744, offset: 23 },
  { name: 'lib-030-record-024', value: 775, offset: 24 },
  { name: 'lib-030-record-025', value: 806, offset: 25 },
  { name: 'lib-030-record-026', value: 837, offset: 26 },
  { name: 'lib-030-record-027', value: 868, offset: 27 },
  { name: 'lib-030-record-028', value: 899, offset: 28 },
  { name: 'lib-030-record-029', value: 930, offset: 29 },
  { name: 'lib-030-record-030', value: 961, offset: 30 },
  { name: 'lib-030-record-031', value: 992, offset: 31 },
  { name: 'lib-030-record-032', value: 1023, offset: 32 },
  { name: 'lib-030-record-033', value: 1054, offset: 33 },
  { name: 'lib-030-record-034', value: 1085, offset: 34 },
  { name: 'lib-030-record-035', value: 1116, offset: 35 },
  { name: 'lib-030-record-036', value: 1147, offset: 36 },
  { name: 'lib-030-record-037', value: 1178, offset: 37 },
  { name: 'lib-030-record-038', value: 1209, offset: 38 },
  { name: 'lib-030-record-039', value: 1240, offset: 39 },
  { name: 'lib-030-record-040', value: 1271, offset: 40 },
  { name: 'lib-030-record-041', value: 1302, offset: 41 },
  { name: 'lib-030-record-042', value: 1333, offset: 42 },
  { name: 'lib-030-record-043', value: 1364, offset: 43 },
  { name: 'lib-030-record-044', value: 1395, offset: 44 },
  { name: 'lib-030-record-045', value: 1426, offset: 45 },
  { name: 'lib-030-record-046', value: 1457, offset: 46 },
  { name: 'lib-030-record-047', value: 1488, offset: 47 },
  { name: 'lib-030-record-048', value: 1519, offset: 48 },
  { name: 'lib-030-record-049', value: 1550, offset: 49 },
  { name: 'lib-030-record-050', value: 1581, offset: 50 },
  { name: 'lib-030-record-051', value: 1612, offset: 51 },
  { name: 'lib-030-record-052', value: 1643, offset: 52 },
  { name: 'lib-030-record-053', value: 1674, offset: 53 },
  { name: 'lib-030-record-054', value: 1705, offset: 54 },
  { name: 'lib-030-record-055', value: 1736, offset: 55 },
  { name: 'lib-030-record-056', value: 1767, offset: 56 },
  { name: 'lib-030-record-057', value: 1798, offset: 57 },
  { name: 'lib-030-record-058', value: 1829, offset: 58 },
  { name: 'lib-030-record-059', value: 1860, offset: 59 },
  { name: 'lib-030-record-060', value: 1891, offset: 60 },
  { name: 'lib-030-record-061', value: 1922, offset: 61 },
  { name: 'lib-030-record-062', value: 1953, offset: 62 },
  { name: 'lib-030-record-063', value: 1984, offset: 63 },
];
export const total = sumBy(rows, 'value') + total020;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-030',
  standalone: true,
  imports: [Lib020Component],
  template: `<section><h2>lib-030: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-020 />
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib030Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
