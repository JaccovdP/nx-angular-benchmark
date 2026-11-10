import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib050Component, total as total050 } from '@bench/lib-050';

const rows = [
  { name: 'lib-060-record-000', value: 61, offset: 0 },
  { name: 'lib-060-record-001', value: 122, offset: 1 },
  { name: 'lib-060-record-002', value: 183, offset: 2 },
  { name: 'lib-060-record-003', value: 244, offset: 3 },
  { name: 'lib-060-record-004', value: 305, offset: 4 },
  { name: 'lib-060-record-005', value: 366, offset: 5 },
  { name: 'lib-060-record-006', value: 427, offset: 6 },
  { name: 'lib-060-record-007', value: 488, offset: 7 },
  { name: 'lib-060-record-008', value: 549, offset: 8 },
  { name: 'lib-060-record-009', value: 610, offset: 9 },
  { name: 'lib-060-record-010', value: 671, offset: 10 },
  { name: 'lib-060-record-011', value: 732, offset: 11 },
  { name: 'lib-060-record-012', value: 793, offset: 12 },
  { name: 'lib-060-record-013', value: 854, offset: 13 },
  { name: 'lib-060-record-014', value: 915, offset: 14 },
  { name: 'lib-060-record-015', value: 976, offset: 15 },
  { name: 'lib-060-record-016', value: 1037, offset: 16 },
  { name: 'lib-060-record-017', value: 1098, offset: 17 },
  { name: 'lib-060-record-018', value: 1159, offset: 18 },
  { name: 'lib-060-record-019', value: 1220, offset: 19 },
  { name: 'lib-060-record-020', value: 1281, offset: 20 },
  { name: 'lib-060-record-021', value: 1342, offset: 21 },
  { name: 'lib-060-record-022', value: 1403, offset: 22 },
  { name: 'lib-060-record-023', value: 1464, offset: 23 },
  { name: 'lib-060-record-024', value: 1525, offset: 24 },
  { name: 'lib-060-record-025', value: 1586, offset: 25 },
  { name: 'lib-060-record-026', value: 1647, offset: 26 },
  { name: 'lib-060-record-027', value: 1708, offset: 27 },
  { name: 'lib-060-record-028', value: 1769, offset: 28 },
  { name: 'lib-060-record-029', value: 1830, offset: 29 },
  { name: 'lib-060-record-030', value: 1891, offset: 30 },
  { name: 'lib-060-record-031', value: 1952, offset: 31 },
  { name: 'lib-060-record-032', value: 2013, offset: 32 },
  { name: 'lib-060-record-033', value: 2074, offset: 33 },
  { name: 'lib-060-record-034', value: 2135, offset: 34 },
  { name: 'lib-060-record-035', value: 2196, offset: 35 },
  { name: 'lib-060-record-036', value: 2257, offset: 36 },
  { name: 'lib-060-record-037', value: 2318, offset: 37 },
  { name: 'lib-060-record-038', value: 2379, offset: 38 },
  { name: 'lib-060-record-039', value: 2440, offset: 39 },
  { name: 'lib-060-record-040', value: 2501, offset: 40 },
  { name: 'lib-060-record-041', value: 2562, offset: 41 },
  { name: 'lib-060-record-042', value: 2623, offset: 42 },
  { name: 'lib-060-record-043', value: 2684, offset: 43 },
  { name: 'lib-060-record-044', value: 2745, offset: 44 },
  { name: 'lib-060-record-045', value: 2806, offset: 45 },
  { name: 'lib-060-record-046', value: 2867, offset: 46 },
  { name: 'lib-060-record-047', value: 2928, offset: 47 },
  { name: 'lib-060-record-048', value: 2989, offset: 48 },
  { name: 'lib-060-record-049', value: 3050, offset: 49 },
  { name: 'lib-060-record-050', value: 3111, offset: 50 },
  { name: 'lib-060-record-051', value: 3172, offset: 51 },
  { name: 'lib-060-record-052', value: 3233, offset: 52 },
  { name: 'lib-060-record-053', value: 3294, offset: 53 },
  { name: 'lib-060-record-054', value: 3355, offset: 54 },
  { name: 'lib-060-record-055', value: 3416, offset: 55 },
  { name: 'lib-060-record-056', value: 3477, offset: 56 },
  { name: 'lib-060-record-057', value: 3538, offset: 57 },
  { name: 'lib-060-record-058', value: 3599, offset: 58 },
  { name: 'lib-060-record-059', value: 3660, offset: 59 },
  { name: 'lib-060-record-060', value: 3721, offset: 60 },
  { name: 'lib-060-record-061', value: 3782, offset: 61 },
  { name: 'lib-060-record-062', value: 3843, offset: 62 },
  { name: 'lib-060-record-063', value: 3904, offset: 63 },
];
export const total = sumBy(rows, 'value') + total050;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-060',
  standalone: true,
  imports: [Lib050Component],
  template: `<section><h2>lib-060: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-050 />
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib060Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
