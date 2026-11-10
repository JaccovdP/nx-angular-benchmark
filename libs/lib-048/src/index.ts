import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib038Component, total as total038 } from '@bench/lib-038';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-048-record-000', value: 49, offset: 0 },
  { name: 'lib-048-record-001', value: 98, offset: 1 },
  { name: 'lib-048-record-002', value: 147, offset: 2 },
  { name: 'lib-048-record-003', value: 196, offset: 3 },
  { name: 'lib-048-record-004', value: 245, offset: 4 },
  { name: 'lib-048-record-005', value: 294, offset: 5 },
  { name: 'lib-048-record-006', value: 343, offset: 6 },
  { name: 'lib-048-record-007', value: 392, offset: 7 },
  { name: 'lib-048-record-008', value: 441, offset: 8 },
  { name: 'lib-048-record-009', value: 490, offset: 9 },
  { name: 'lib-048-record-010', value: 539, offset: 10 },
  { name: 'lib-048-record-011', value: 588, offset: 11 },
  { name: 'lib-048-record-012', value: 637, offset: 12 },
  { name: 'lib-048-record-013', value: 686, offset: 13 },
  { name: 'lib-048-record-014', value: 735, offset: 14 },
  { name: 'lib-048-record-015', value: 784, offset: 15 },
  { name: 'lib-048-record-016', value: 833, offset: 16 },
  { name: 'lib-048-record-017', value: 882, offset: 17 },
  { name: 'lib-048-record-018', value: 931, offset: 18 },
  { name: 'lib-048-record-019', value: 980, offset: 19 },
  { name: 'lib-048-record-020', value: 1029, offset: 20 },
  { name: 'lib-048-record-021', value: 1078, offset: 21 },
  { name: 'lib-048-record-022', value: 1127, offset: 22 },
  { name: 'lib-048-record-023', value: 1176, offset: 23 },
  { name: 'lib-048-record-024', value: 1225, offset: 24 },
  { name: 'lib-048-record-025', value: 1274, offset: 25 },
  { name: 'lib-048-record-026', value: 1323, offset: 26 },
  { name: 'lib-048-record-027', value: 1372, offset: 27 },
  { name: 'lib-048-record-028', value: 1421, offset: 28 },
  { name: 'lib-048-record-029', value: 1470, offset: 29 },
  { name: 'lib-048-record-030', value: 1519, offset: 30 },
  { name: 'lib-048-record-031', value: 1568, offset: 31 },
  { name: 'lib-048-record-032', value: 1617, offset: 32 },
  { name: 'lib-048-record-033', value: 1666, offset: 33 },
  { name: 'lib-048-record-034', value: 1715, offset: 34 },
  { name: 'lib-048-record-035', value: 1764, offset: 35 },
  { name: 'lib-048-record-036', value: 1813, offset: 36 },
  { name: 'lib-048-record-037', value: 1862, offset: 37 },
  { name: 'lib-048-record-038', value: 1911, offset: 38 },
  { name: 'lib-048-record-039', value: 1960, offset: 39 },
  { name: 'lib-048-record-040', value: 2009, offset: 40 },
  { name: 'lib-048-record-041', value: 2058, offset: 41 },
  { name: 'lib-048-record-042', value: 2107, offset: 42 },
  { name: 'lib-048-record-043', value: 2156, offset: 43 },
  { name: 'lib-048-record-044', value: 2205, offset: 44 },
  { name: 'lib-048-record-045', value: 2254, offset: 45 },
  { name: 'lib-048-record-046', value: 2303, offset: 46 },
  { name: 'lib-048-record-047', value: 2352, offset: 47 },
  { name: 'lib-048-record-048', value: 2401, offset: 48 },
  { name: 'lib-048-record-049', value: 2450, offset: 49 },
  { name: 'lib-048-record-050', value: 2499, offset: 50 },
  { name: 'lib-048-record-051', value: 2548, offset: 51 },
  { name: 'lib-048-record-052', value: 2597, offset: 52 },
  { name: 'lib-048-record-053', value: 2646, offset: 53 },
  { name: 'lib-048-record-054', value: 2695, offset: 54 },
  { name: 'lib-048-record-055', value: 2744, offset: 55 },
  { name: 'lib-048-record-056', value: 2793, offset: 56 },
  { name: 'lib-048-record-057', value: 2842, offset: 57 },
  { name: 'lib-048-record-058', value: 2891, offset: 58 },
  { name: 'lib-048-record-059', value: 2940, offset: 59 },
  { name: 'lib-048-record-060', value: 2989, offset: 60 },
  { name: 'lib-048-record-061', value: 3038, offset: 61 },
  { name: 'lib-048-record-062', value: 3087, offset: 62 },
  { name: 'lib-048-record-063', value: 3136, offset: 63 },
];
export const total = sumBy(rows, 'value') + total038 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-048',
  standalone: true,
  imports: [Lib038Component, Lib000Component],
  template: `<section><h2>lib-048: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-038 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib048Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
