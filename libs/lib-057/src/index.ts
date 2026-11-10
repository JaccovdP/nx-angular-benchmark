import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib047Component, total as total047 } from '@bench/lib-047';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-057-record-000', value: 58, offset: 0 },
  { name: 'lib-057-record-001', value: 116, offset: 1 },
  { name: 'lib-057-record-002', value: 174, offset: 2 },
  { name: 'lib-057-record-003', value: 232, offset: 3 },
  { name: 'lib-057-record-004', value: 290, offset: 4 },
  { name: 'lib-057-record-005', value: 348, offset: 5 },
  { name: 'lib-057-record-006', value: 406, offset: 6 },
  { name: 'lib-057-record-007', value: 464, offset: 7 },
  { name: 'lib-057-record-008', value: 522, offset: 8 },
  { name: 'lib-057-record-009', value: 580, offset: 9 },
  { name: 'lib-057-record-010', value: 638, offset: 10 },
  { name: 'lib-057-record-011', value: 696, offset: 11 },
  { name: 'lib-057-record-012', value: 754, offset: 12 },
  { name: 'lib-057-record-013', value: 812, offset: 13 },
  { name: 'lib-057-record-014', value: 870, offset: 14 },
  { name: 'lib-057-record-015', value: 928, offset: 15 },
  { name: 'lib-057-record-016', value: 986, offset: 16 },
  { name: 'lib-057-record-017', value: 1044, offset: 17 },
  { name: 'lib-057-record-018', value: 1102, offset: 18 },
  { name: 'lib-057-record-019', value: 1160, offset: 19 },
  { name: 'lib-057-record-020', value: 1218, offset: 20 },
  { name: 'lib-057-record-021', value: 1276, offset: 21 },
  { name: 'lib-057-record-022', value: 1334, offset: 22 },
  { name: 'lib-057-record-023', value: 1392, offset: 23 },
  { name: 'lib-057-record-024', value: 1450, offset: 24 },
  { name: 'lib-057-record-025', value: 1508, offset: 25 },
  { name: 'lib-057-record-026', value: 1566, offset: 26 },
  { name: 'lib-057-record-027', value: 1624, offset: 27 },
  { name: 'lib-057-record-028', value: 1682, offset: 28 },
  { name: 'lib-057-record-029', value: 1740, offset: 29 },
  { name: 'lib-057-record-030', value: 1798, offset: 30 },
  { name: 'lib-057-record-031', value: 1856, offset: 31 },
  { name: 'lib-057-record-032', value: 1914, offset: 32 },
  { name: 'lib-057-record-033', value: 1972, offset: 33 },
  { name: 'lib-057-record-034', value: 2030, offset: 34 },
  { name: 'lib-057-record-035', value: 2088, offset: 35 },
  { name: 'lib-057-record-036', value: 2146, offset: 36 },
  { name: 'lib-057-record-037', value: 2204, offset: 37 },
  { name: 'lib-057-record-038', value: 2262, offset: 38 },
  { name: 'lib-057-record-039', value: 2320, offset: 39 },
  { name: 'lib-057-record-040', value: 2378, offset: 40 },
  { name: 'lib-057-record-041', value: 2436, offset: 41 },
  { name: 'lib-057-record-042', value: 2494, offset: 42 },
  { name: 'lib-057-record-043', value: 2552, offset: 43 },
  { name: 'lib-057-record-044', value: 2610, offset: 44 },
  { name: 'lib-057-record-045', value: 2668, offset: 45 },
  { name: 'lib-057-record-046', value: 2726, offset: 46 },
  { name: 'lib-057-record-047', value: 2784, offset: 47 },
  { name: 'lib-057-record-048', value: 2842, offset: 48 },
  { name: 'lib-057-record-049', value: 2900, offset: 49 },
  { name: 'lib-057-record-050', value: 2958, offset: 50 },
  { name: 'lib-057-record-051', value: 3016, offset: 51 },
  { name: 'lib-057-record-052', value: 3074, offset: 52 },
  { name: 'lib-057-record-053', value: 3132, offset: 53 },
  { name: 'lib-057-record-054', value: 3190, offset: 54 },
  { name: 'lib-057-record-055', value: 3248, offset: 55 },
  { name: 'lib-057-record-056', value: 3306, offset: 56 },
  { name: 'lib-057-record-057', value: 3364, offset: 57 },
  { name: 'lib-057-record-058', value: 3422, offset: 58 },
  { name: 'lib-057-record-059', value: 3480, offset: 59 },
  { name: 'lib-057-record-060', value: 3538, offset: 60 },
  { name: 'lib-057-record-061', value: 3596, offset: 61 },
  { name: 'lib-057-record-062', value: 3654, offset: 62 },
  { name: 'lib-057-record-063', value: 3712, offset: 63 },
];
export const total = sumBy(rows, 'value') + total047 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-057',
  standalone: true,
  imports: [Lib047Component, Lib000Component],
  template: `<section><h2>lib-057: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-047 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib057Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
