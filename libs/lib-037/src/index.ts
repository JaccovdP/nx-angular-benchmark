import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib027Component, total as total027 } from '@bench/lib-027';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-037-record-000', value: 38, offset: 0 },
  { name: 'lib-037-record-001', value: 76, offset: 1 },
  { name: 'lib-037-record-002', value: 114, offset: 2 },
  { name: 'lib-037-record-003', value: 152, offset: 3 },
  { name: 'lib-037-record-004', value: 190, offset: 4 },
  { name: 'lib-037-record-005', value: 228, offset: 5 },
  { name: 'lib-037-record-006', value: 266, offset: 6 },
  { name: 'lib-037-record-007', value: 304, offset: 7 },
  { name: 'lib-037-record-008', value: 342, offset: 8 },
  { name: 'lib-037-record-009', value: 380, offset: 9 },
  { name: 'lib-037-record-010', value: 418, offset: 10 },
  { name: 'lib-037-record-011', value: 456, offset: 11 },
  { name: 'lib-037-record-012', value: 494, offset: 12 },
  { name: 'lib-037-record-013', value: 532, offset: 13 },
  { name: 'lib-037-record-014', value: 570, offset: 14 },
  { name: 'lib-037-record-015', value: 608, offset: 15 },
  { name: 'lib-037-record-016', value: 646, offset: 16 },
  { name: 'lib-037-record-017', value: 684, offset: 17 },
  { name: 'lib-037-record-018', value: 722, offset: 18 },
  { name: 'lib-037-record-019', value: 760, offset: 19 },
  { name: 'lib-037-record-020', value: 798, offset: 20 },
  { name: 'lib-037-record-021', value: 836, offset: 21 },
  { name: 'lib-037-record-022', value: 874, offset: 22 },
  { name: 'lib-037-record-023', value: 912, offset: 23 },
  { name: 'lib-037-record-024', value: 950, offset: 24 },
  { name: 'lib-037-record-025', value: 988, offset: 25 },
  { name: 'lib-037-record-026', value: 1026, offset: 26 },
  { name: 'lib-037-record-027', value: 1064, offset: 27 },
  { name: 'lib-037-record-028', value: 1102, offset: 28 },
  { name: 'lib-037-record-029', value: 1140, offset: 29 },
  { name: 'lib-037-record-030', value: 1178, offset: 30 },
  { name: 'lib-037-record-031', value: 1216, offset: 31 },
  { name: 'lib-037-record-032', value: 1254, offset: 32 },
  { name: 'lib-037-record-033', value: 1292, offset: 33 },
  { name: 'lib-037-record-034', value: 1330, offset: 34 },
  { name: 'lib-037-record-035', value: 1368, offset: 35 },
  { name: 'lib-037-record-036', value: 1406, offset: 36 },
  { name: 'lib-037-record-037', value: 1444, offset: 37 },
  { name: 'lib-037-record-038', value: 1482, offset: 38 },
  { name: 'lib-037-record-039', value: 1520, offset: 39 },
  { name: 'lib-037-record-040', value: 1558, offset: 40 },
  { name: 'lib-037-record-041', value: 1596, offset: 41 },
  { name: 'lib-037-record-042', value: 1634, offset: 42 },
  { name: 'lib-037-record-043', value: 1672, offset: 43 },
  { name: 'lib-037-record-044', value: 1710, offset: 44 },
  { name: 'lib-037-record-045', value: 1748, offset: 45 },
  { name: 'lib-037-record-046', value: 1786, offset: 46 },
  { name: 'lib-037-record-047', value: 1824, offset: 47 },
  { name: 'lib-037-record-048', value: 1862, offset: 48 },
  { name: 'lib-037-record-049', value: 1900, offset: 49 },
  { name: 'lib-037-record-050', value: 1938, offset: 50 },
  { name: 'lib-037-record-051', value: 1976, offset: 51 },
  { name: 'lib-037-record-052', value: 2014, offset: 52 },
  { name: 'lib-037-record-053', value: 2052, offset: 53 },
  { name: 'lib-037-record-054', value: 2090, offset: 54 },
  { name: 'lib-037-record-055', value: 2128, offset: 55 },
  { name: 'lib-037-record-056', value: 2166, offset: 56 },
  { name: 'lib-037-record-057', value: 2204, offset: 57 },
  { name: 'lib-037-record-058', value: 2242, offset: 58 },
  { name: 'lib-037-record-059', value: 2280, offset: 59 },
  { name: 'lib-037-record-060', value: 2318, offset: 60 },
  { name: 'lib-037-record-061', value: 2356, offset: 61 },
  { name: 'lib-037-record-062', value: 2394, offset: 62 },
  { name: 'lib-037-record-063', value: 2432, offset: 63 },
];
export const total = sumBy(rows, 'value') + total027 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-037',
  standalone: true,
  imports: [Lib027Component, Lib000Component],
  template: `<section><h2>lib-037: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-027 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib037Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
