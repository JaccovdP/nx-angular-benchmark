import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib041Component, total as total041 } from '@bench/lib-041';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-051-record-000', value: 52, offset: 0 },
  { name: 'lib-051-record-001', value: 104, offset: 1 },
  { name: 'lib-051-record-002', value: 156, offset: 2 },
  { name: 'lib-051-record-003', value: 208, offset: 3 },
  { name: 'lib-051-record-004', value: 260, offset: 4 },
  { name: 'lib-051-record-005', value: 312, offset: 5 },
  { name: 'lib-051-record-006', value: 364, offset: 6 },
  { name: 'lib-051-record-007', value: 416, offset: 7 },
  { name: 'lib-051-record-008', value: 468, offset: 8 },
  { name: 'lib-051-record-009', value: 520, offset: 9 },
  { name: 'lib-051-record-010', value: 572, offset: 10 },
  { name: 'lib-051-record-011', value: 624, offset: 11 },
  { name: 'lib-051-record-012', value: 676, offset: 12 },
  { name: 'lib-051-record-013', value: 728, offset: 13 },
  { name: 'lib-051-record-014', value: 780, offset: 14 },
  { name: 'lib-051-record-015', value: 832, offset: 15 },
  { name: 'lib-051-record-016', value: 884, offset: 16 },
  { name: 'lib-051-record-017', value: 936, offset: 17 },
  { name: 'lib-051-record-018', value: 988, offset: 18 },
  { name: 'lib-051-record-019', value: 1040, offset: 19 },
  { name: 'lib-051-record-020', value: 1092, offset: 20 },
  { name: 'lib-051-record-021', value: 1144, offset: 21 },
  { name: 'lib-051-record-022', value: 1196, offset: 22 },
  { name: 'lib-051-record-023', value: 1248, offset: 23 },
  { name: 'lib-051-record-024', value: 1300, offset: 24 },
  { name: 'lib-051-record-025', value: 1352, offset: 25 },
  { name: 'lib-051-record-026', value: 1404, offset: 26 },
  { name: 'lib-051-record-027', value: 1456, offset: 27 },
  { name: 'lib-051-record-028', value: 1508, offset: 28 },
  { name: 'lib-051-record-029', value: 1560, offset: 29 },
  { name: 'lib-051-record-030', value: 1612, offset: 30 },
  { name: 'lib-051-record-031', value: 1664, offset: 31 },
  { name: 'lib-051-record-032', value: 1716, offset: 32 },
  { name: 'lib-051-record-033', value: 1768, offset: 33 },
  { name: 'lib-051-record-034', value: 1820, offset: 34 },
  { name: 'lib-051-record-035', value: 1872, offset: 35 },
  { name: 'lib-051-record-036', value: 1924, offset: 36 },
  { name: 'lib-051-record-037', value: 1976, offset: 37 },
  { name: 'lib-051-record-038', value: 2028, offset: 38 },
  { name: 'lib-051-record-039', value: 2080, offset: 39 },
  { name: 'lib-051-record-040', value: 2132, offset: 40 },
  { name: 'lib-051-record-041', value: 2184, offset: 41 },
  { name: 'lib-051-record-042', value: 2236, offset: 42 },
  { name: 'lib-051-record-043', value: 2288, offset: 43 },
  { name: 'lib-051-record-044', value: 2340, offset: 44 },
  { name: 'lib-051-record-045', value: 2392, offset: 45 },
  { name: 'lib-051-record-046', value: 2444, offset: 46 },
  { name: 'lib-051-record-047', value: 2496, offset: 47 },
  { name: 'lib-051-record-048', value: 2548, offset: 48 },
  { name: 'lib-051-record-049', value: 2600, offset: 49 },
  { name: 'lib-051-record-050', value: 2652, offset: 50 },
  { name: 'lib-051-record-051', value: 2704, offset: 51 },
  { name: 'lib-051-record-052', value: 2756, offset: 52 },
  { name: 'lib-051-record-053', value: 2808, offset: 53 },
  { name: 'lib-051-record-054', value: 2860, offset: 54 },
  { name: 'lib-051-record-055', value: 2912, offset: 55 },
  { name: 'lib-051-record-056', value: 2964, offset: 56 },
  { name: 'lib-051-record-057', value: 3016, offset: 57 },
  { name: 'lib-051-record-058', value: 3068, offset: 58 },
  { name: 'lib-051-record-059', value: 3120, offset: 59 },
  { name: 'lib-051-record-060', value: 3172, offset: 60 },
  { name: 'lib-051-record-061', value: 3224, offset: 61 },
  { name: 'lib-051-record-062', value: 3276, offset: 62 },
  { name: 'lib-051-record-063', value: 3328, offset: 63 },
];
export const total = sumBy(rows, 'value') + total041 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-051',
  standalone: true,
  imports: [Lib041Component, Lib000Component],
  template: `<section><h2>lib-051: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-041 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib051Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
