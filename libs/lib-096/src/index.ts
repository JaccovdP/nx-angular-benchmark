import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib086Component, total as total086 } from '@bench/lib-086';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-096-record-000', value: 97, offset: 0 },
  { name: 'lib-096-record-001', value: 194, offset: 1 },
  { name: 'lib-096-record-002', value: 291, offset: 2 },
  { name: 'lib-096-record-003', value: 388, offset: 3 },
  { name: 'lib-096-record-004', value: 485, offset: 4 },
  { name: 'lib-096-record-005', value: 582, offset: 5 },
  { name: 'lib-096-record-006', value: 679, offset: 6 },
  { name: 'lib-096-record-007', value: 776, offset: 7 },
  { name: 'lib-096-record-008', value: 873, offset: 8 },
  { name: 'lib-096-record-009', value: 970, offset: 9 },
  { name: 'lib-096-record-010', value: 1067, offset: 10 },
  { name: 'lib-096-record-011', value: 1164, offset: 11 },
  { name: 'lib-096-record-012', value: 1261, offset: 12 },
  { name: 'lib-096-record-013', value: 1358, offset: 13 },
  { name: 'lib-096-record-014', value: 1455, offset: 14 },
  { name: 'lib-096-record-015', value: 1552, offset: 15 },
  { name: 'lib-096-record-016', value: 1649, offset: 16 },
  { name: 'lib-096-record-017', value: 1746, offset: 17 },
  { name: 'lib-096-record-018', value: 1843, offset: 18 },
  { name: 'lib-096-record-019', value: 1940, offset: 19 },
  { name: 'lib-096-record-020', value: 2037, offset: 20 },
  { name: 'lib-096-record-021', value: 2134, offset: 21 },
  { name: 'lib-096-record-022', value: 2231, offset: 22 },
  { name: 'lib-096-record-023', value: 2328, offset: 23 },
  { name: 'lib-096-record-024', value: 2425, offset: 24 },
  { name: 'lib-096-record-025', value: 2522, offset: 25 },
  { name: 'lib-096-record-026', value: 2619, offset: 26 },
  { name: 'lib-096-record-027', value: 2716, offset: 27 },
  { name: 'lib-096-record-028', value: 2813, offset: 28 },
  { name: 'lib-096-record-029', value: 2910, offset: 29 },
  { name: 'lib-096-record-030', value: 3007, offset: 30 },
  { name: 'lib-096-record-031', value: 3104, offset: 31 },
  { name: 'lib-096-record-032', value: 3201, offset: 32 },
  { name: 'lib-096-record-033', value: 3298, offset: 33 },
  { name: 'lib-096-record-034', value: 3395, offset: 34 },
  { name: 'lib-096-record-035', value: 3492, offset: 35 },
  { name: 'lib-096-record-036', value: 3589, offset: 36 },
  { name: 'lib-096-record-037', value: 3686, offset: 37 },
  { name: 'lib-096-record-038', value: 3783, offset: 38 },
  { name: 'lib-096-record-039', value: 3880, offset: 39 },
  { name: 'lib-096-record-040', value: 3977, offset: 40 },
  { name: 'lib-096-record-041', value: 4074, offset: 41 },
  { name: 'lib-096-record-042', value: 4171, offset: 42 },
  { name: 'lib-096-record-043', value: 4268, offset: 43 },
  { name: 'lib-096-record-044', value: 4365, offset: 44 },
  { name: 'lib-096-record-045', value: 4462, offset: 45 },
  { name: 'lib-096-record-046', value: 4559, offset: 46 },
  { name: 'lib-096-record-047', value: 4656, offset: 47 },
  { name: 'lib-096-record-048', value: 4753, offset: 48 },
  { name: 'lib-096-record-049', value: 4850, offset: 49 },
  { name: 'lib-096-record-050', value: 4947, offset: 50 },
  { name: 'lib-096-record-051', value: 5044, offset: 51 },
  { name: 'lib-096-record-052', value: 5141, offset: 52 },
  { name: 'lib-096-record-053', value: 5238, offset: 53 },
  { name: 'lib-096-record-054', value: 5335, offset: 54 },
  { name: 'lib-096-record-055', value: 5432, offset: 55 },
  { name: 'lib-096-record-056', value: 5529, offset: 56 },
  { name: 'lib-096-record-057', value: 5626, offset: 57 },
  { name: 'lib-096-record-058', value: 5723, offset: 58 },
  { name: 'lib-096-record-059', value: 5820, offset: 59 },
  { name: 'lib-096-record-060', value: 5917, offset: 60 },
  { name: 'lib-096-record-061', value: 6014, offset: 61 },
  { name: 'lib-096-record-062', value: 6111, offset: 62 },
  { name: 'lib-096-record-063', value: 6208, offset: 63 },
];
export const total = sumBy(rows, 'value') + total086 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-096',
  standalone: true,
  imports: [Lib086Component, Lib000Component],
  template: `<section><h2>lib-096: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-086 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib096Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
