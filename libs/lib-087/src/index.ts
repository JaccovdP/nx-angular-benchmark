import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib077Component, total as total077 } from '@bench/lib-077';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-087-record-000', value: 88, offset: 0 },
  { name: 'lib-087-record-001', value: 176, offset: 1 },
  { name: 'lib-087-record-002', value: 264, offset: 2 },
  { name: 'lib-087-record-003', value: 352, offset: 3 },
  { name: 'lib-087-record-004', value: 440, offset: 4 },
  { name: 'lib-087-record-005', value: 528, offset: 5 },
  { name: 'lib-087-record-006', value: 616, offset: 6 },
  { name: 'lib-087-record-007', value: 704, offset: 7 },
  { name: 'lib-087-record-008', value: 792, offset: 8 },
  { name: 'lib-087-record-009', value: 880, offset: 9 },
  { name: 'lib-087-record-010', value: 968, offset: 10 },
  { name: 'lib-087-record-011', value: 1056, offset: 11 },
  { name: 'lib-087-record-012', value: 1144, offset: 12 },
  { name: 'lib-087-record-013', value: 1232, offset: 13 },
  { name: 'lib-087-record-014', value: 1320, offset: 14 },
  { name: 'lib-087-record-015', value: 1408, offset: 15 },
  { name: 'lib-087-record-016', value: 1496, offset: 16 },
  { name: 'lib-087-record-017', value: 1584, offset: 17 },
  { name: 'lib-087-record-018', value: 1672, offset: 18 },
  { name: 'lib-087-record-019', value: 1760, offset: 19 },
  { name: 'lib-087-record-020', value: 1848, offset: 20 },
  { name: 'lib-087-record-021', value: 1936, offset: 21 },
  { name: 'lib-087-record-022', value: 2024, offset: 22 },
  { name: 'lib-087-record-023', value: 2112, offset: 23 },
  { name: 'lib-087-record-024', value: 2200, offset: 24 },
  { name: 'lib-087-record-025', value: 2288, offset: 25 },
  { name: 'lib-087-record-026', value: 2376, offset: 26 },
  { name: 'lib-087-record-027', value: 2464, offset: 27 },
  { name: 'lib-087-record-028', value: 2552, offset: 28 },
  { name: 'lib-087-record-029', value: 2640, offset: 29 },
  { name: 'lib-087-record-030', value: 2728, offset: 30 },
  { name: 'lib-087-record-031', value: 2816, offset: 31 },
  { name: 'lib-087-record-032', value: 2904, offset: 32 },
  { name: 'lib-087-record-033', value: 2992, offset: 33 },
  { name: 'lib-087-record-034', value: 3080, offset: 34 },
  { name: 'lib-087-record-035', value: 3168, offset: 35 },
  { name: 'lib-087-record-036', value: 3256, offset: 36 },
  { name: 'lib-087-record-037', value: 3344, offset: 37 },
  { name: 'lib-087-record-038', value: 3432, offset: 38 },
  { name: 'lib-087-record-039', value: 3520, offset: 39 },
  { name: 'lib-087-record-040', value: 3608, offset: 40 },
  { name: 'lib-087-record-041', value: 3696, offset: 41 },
  { name: 'lib-087-record-042', value: 3784, offset: 42 },
  { name: 'lib-087-record-043', value: 3872, offset: 43 },
  { name: 'lib-087-record-044', value: 3960, offset: 44 },
  { name: 'lib-087-record-045', value: 4048, offset: 45 },
  { name: 'lib-087-record-046', value: 4136, offset: 46 },
  { name: 'lib-087-record-047', value: 4224, offset: 47 },
  { name: 'lib-087-record-048', value: 4312, offset: 48 },
  { name: 'lib-087-record-049', value: 4400, offset: 49 },
  { name: 'lib-087-record-050', value: 4488, offset: 50 },
  { name: 'lib-087-record-051', value: 4576, offset: 51 },
  { name: 'lib-087-record-052', value: 4664, offset: 52 },
  { name: 'lib-087-record-053', value: 4752, offset: 53 },
  { name: 'lib-087-record-054', value: 4840, offset: 54 },
  { name: 'lib-087-record-055', value: 4928, offset: 55 },
  { name: 'lib-087-record-056', value: 5016, offset: 56 },
  { name: 'lib-087-record-057', value: 5104, offset: 57 },
  { name: 'lib-087-record-058', value: 5192, offset: 58 },
  { name: 'lib-087-record-059', value: 5280, offset: 59 },
  { name: 'lib-087-record-060', value: 5368, offset: 60 },
  { name: 'lib-087-record-061', value: 5456, offset: 61 },
  { name: 'lib-087-record-062', value: 5544, offset: 62 },
  { name: 'lib-087-record-063', value: 5632, offset: 63 },
];
export const total = sumBy(rows, 'value') + total077 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-087',
  standalone: true,
  imports: [Lib077Component, Lib000Component],
  template: `<section><h2>lib-087: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-077 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib087Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
