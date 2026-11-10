import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib070Component, total as total070 } from '@bench/lib-070';

const rows = [
  { name: 'lib-080-record-000', value: 81, offset: 0 },
  { name: 'lib-080-record-001', value: 162, offset: 1 },
  { name: 'lib-080-record-002', value: 243, offset: 2 },
  { name: 'lib-080-record-003', value: 324, offset: 3 },
  { name: 'lib-080-record-004', value: 405, offset: 4 },
  { name: 'lib-080-record-005', value: 486, offset: 5 },
  { name: 'lib-080-record-006', value: 567, offset: 6 },
  { name: 'lib-080-record-007', value: 648, offset: 7 },
  { name: 'lib-080-record-008', value: 729, offset: 8 },
  { name: 'lib-080-record-009', value: 810, offset: 9 },
  { name: 'lib-080-record-010', value: 891, offset: 10 },
  { name: 'lib-080-record-011', value: 972, offset: 11 },
  { name: 'lib-080-record-012', value: 1053, offset: 12 },
  { name: 'lib-080-record-013', value: 1134, offset: 13 },
  { name: 'lib-080-record-014', value: 1215, offset: 14 },
  { name: 'lib-080-record-015', value: 1296, offset: 15 },
  { name: 'lib-080-record-016', value: 1377, offset: 16 },
  { name: 'lib-080-record-017', value: 1458, offset: 17 },
  { name: 'lib-080-record-018', value: 1539, offset: 18 },
  { name: 'lib-080-record-019', value: 1620, offset: 19 },
  { name: 'lib-080-record-020', value: 1701, offset: 20 },
  { name: 'lib-080-record-021', value: 1782, offset: 21 },
  { name: 'lib-080-record-022', value: 1863, offset: 22 },
  { name: 'lib-080-record-023', value: 1944, offset: 23 },
  { name: 'lib-080-record-024', value: 2025, offset: 24 },
  { name: 'lib-080-record-025', value: 2106, offset: 25 },
  { name: 'lib-080-record-026', value: 2187, offset: 26 },
  { name: 'lib-080-record-027', value: 2268, offset: 27 },
  { name: 'lib-080-record-028', value: 2349, offset: 28 },
  { name: 'lib-080-record-029', value: 2430, offset: 29 },
  { name: 'lib-080-record-030', value: 2511, offset: 30 },
  { name: 'lib-080-record-031', value: 2592, offset: 31 },
  { name: 'lib-080-record-032', value: 2673, offset: 32 },
  { name: 'lib-080-record-033', value: 2754, offset: 33 },
  { name: 'lib-080-record-034', value: 2835, offset: 34 },
  { name: 'lib-080-record-035', value: 2916, offset: 35 },
  { name: 'lib-080-record-036', value: 2997, offset: 36 },
  { name: 'lib-080-record-037', value: 3078, offset: 37 },
  { name: 'lib-080-record-038', value: 3159, offset: 38 },
  { name: 'lib-080-record-039', value: 3240, offset: 39 },
  { name: 'lib-080-record-040', value: 3321, offset: 40 },
  { name: 'lib-080-record-041', value: 3402, offset: 41 },
  { name: 'lib-080-record-042', value: 3483, offset: 42 },
  { name: 'lib-080-record-043', value: 3564, offset: 43 },
  { name: 'lib-080-record-044', value: 3645, offset: 44 },
  { name: 'lib-080-record-045', value: 3726, offset: 45 },
  { name: 'lib-080-record-046', value: 3807, offset: 46 },
  { name: 'lib-080-record-047', value: 3888, offset: 47 },
  { name: 'lib-080-record-048', value: 3969, offset: 48 },
  { name: 'lib-080-record-049', value: 4050, offset: 49 },
  { name: 'lib-080-record-050', value: 4131, offset: 50 },
  { name: 'lib-080-record-051', value: 4212, offset: 51 },
  { name: 'lib-080-record-052', value: 4293, offset: 52 },
  { name: 'lib-080-record-053', value: 4374, offset: 53 },
  { name: 'lib-080-record-054', value: 4455, offset: 54 },
  { name: 'lib-080-record-055', value: 4536, offset: 55 },
  { name: 'lib-080-record-056', value: 4617, offset: 56 },
  { name: 'lib-080-record-057', value: 4698, offset: 57 },
  { name: 'lib-080-record-058', value: 4779, offset: 58 },
  { name: 'lib-080-record-059', value: 4860, offset: 59 },
  { name: 'lib-080-record-060', value: 4941, offset: 60 },
  { name: 'lib-080-record-061', value: 5022, offset: 61 },
  { name: 'lib-080-record-062', value: 5103, offset: 62 },
  { name: 'lib-080-record-063', value: 5184, offset: 63 },
];
export const total = sumBy(rows, 'value') + total070;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-080',
  standalone: true,
  imports: [Lib070Component],
  template: `<section><h2>lib-080: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-070 />
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib080Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
