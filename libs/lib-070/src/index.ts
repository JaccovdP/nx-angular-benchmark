import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib060Component, total as total060 } from '@bench/lib-060';

const rows = [
  { name: 'lib-070-record-000', value: 71, offset: 0 },
  { name: 'lib-070-record-001', value: 142, offset: 1 },
  { name: 'lib-070-record-002', value: 213, offset: 2 },
  { name: 'lib-070-record-003', value: 284, offset: 3 },
  { name: 'lib-070-record-004', value: 355, offset: 4 },
  { name: 'lib-070-record-005', value: 426, offset: 5 },
  { name: 'lib-070-record-006', value: 497, offset: 6 },
  { name: 'lib-070-record-007', value: 568, offset: 7 },
  { name: 'lib-070-record-008', value: 639, offset: 8 },
  { name: 'lib-070-record-009', value: 710, offset: 9 },
  { name: 'lib-070-record-010', value: 781, offset: 10 },
  { name: 'lib-070-record-011', value: 852, offset: 11 },
  { name: 'lib-070-record-012', value: 923, offset: 12 },
  { name: 'lib-070-record-013', value: 994, offset: 13 },
  { name: 'lib-070-record-014', value: 1065, offset: 14 },
  { name: 'lib-070-record-015', value: 1136, offset: 15 },
  { name: 'lib-070-record-016', value: 1207, offset: 16 },
  { name: 'lib-070-record-017', value: 1278, offset: 17 },
  { name: 'lib-070-record-018', value: 1349, offset: 18 },
  { name: 'lib-070-record-019', value: 1420, offset: 19 },
  { name: 'lib-070-record-020', value: 1491, offset: 20 },
  { name: 'lib-070-record-021', value: 1562, offset: 21 },
  { name: 'lib-070-record-022', value: 1633, offset: 22 },
  { name: 'lib-070-record-023', value: 1704, offset: 23 },
  { name: 'lib-070-record-024', value: 1775, offset: 24 },
  { name: 'lib-070-record-025', value: 1846, offset: 25 },
  { name: 'lib-070-record-026', value: 1917, offset: 26 },
  { name: 'lib-070-record-027', value: 1988, offset: 27 },
  { name: 'lib-070-record-028', value: 2059, offset: 28 },
  { name: 'lib-070-record-029', value: 2130, offset: 29 },
  { name: 'lib-070-record-030', value: 2201, offset: 30 },
  { name: 'lib-070-record-031', value: 2272, offset: 31 },
  { name: 'lib-070-record-032', value: 2343, offset: 32 },
  { name: 'lib-070-record-033', value: 2414, offset: 33 },
  { name: 'lib-070-record-034', value: 2485, offset: 34 },
  { name: 'lib-070-record-035', value: 2556, offset: 35 },
  { name: 'lib-070-record-036', value: 2627, offset: 36 },
  { name: 'lib-070-record-037', value: 2698, offset: 37 },
  { name: 'lib-070-record-038', value: 2769, offset: 38 },
  { name: 'lib-070-record-039', value: 2840, offset: 39 },
  { name: 'lib-070-record-040', value: 2911, offset: 40 },
  { name: 'lib-070-record-041', value: 2982, offset: 41 },
  { name: 'lib-070-record-042', value: 3053, offset: 42 },
  { name: 'lib-070-record-043', value: 3124, offset: 43 },
  { name: 'lib-070-record-044', value: 3195, offset: 44 },
  { name: 'lib-070-record-045', value: 3266, offset: 45 },
  { name: 'lib-070-record-046', value: 3337, offset: 46 },
  { name: 'lib-070-record-047', value: 3408, offset: 47 },
  { name: 'lib-070-record-048', value: 3479, offset: 48 },
  { name: 'lib-070-record-049', value: 3550, offset: 49 },
  { name: 'lib-070-record-050', value: 3621, offset: 50 },
  { name: 'lib-070-record-051', value: 3692, offset: 51 },
  { name: 'lib-070-record-052', value: 3763, offset: 52 },
  { name: 'lib-070-record-053', value: 3834, offset: 53 },
  { name: 'lib-070-record-054', value: 3905, offset: 54 },
  { name: 'lib-070-record-055', value: 3976, offset: 55 },
  { name: 'lib-070-record-056', value: 4047, offset: 56 },
  { name: 'lib-070-record-057', value: 4118, offset: 57 },
  { name: 'lib-070-record-058', value: 4189, offset: 58 },
  { name: 'lib-070-record-059', value: 4260, offset: 59 },
  { name: 'lib-070-record-060', value: 4331, offset: 60 },
  { name: 'lib-070-record-061', value: 4402, offset: 61 },
  { name: 'lib-070-record-062', value: 4473, offset: 62 },
  { name: 'lib-070-record-063', value: 4544, offset: 63 },
];
export const total = sumBy(rows, 'value') + total060;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-070',
  standalone: true,
  imports: [Lib060Component],
  template: `<section><h2>lib-070: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-060 />
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib070Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
