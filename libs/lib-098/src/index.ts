import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib088Component, total as total088 } from '@bench/lib-088';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-098-record-000', value: 99, offset: 0 },
  { name: 'lib-098-record-001', value: 198, offset: 1 },
  { name: 'lib-098-record-002', value: 297, offset: 2 },
  { name: 'lib-098-record-003', value: 396, offset: 3 },
  { name: 'lib-098-record-004', value: 495, offset: 4 },
  { name: 'lib-098-record-005', value: 594, offset: 5 },
  { name: 'lib-098-record-006', value: 693, offset: 6 },
  { name: 'lib-098-record-007', value: 792, offset: 7 },
  { name: 'lib-098-record-008', value: 891, offset: 8 },
  { name: 'lib-098-record-009', value: 990, offset: 9 },
  { name: 'lib-098-record-010', value: 1089, offset: 10 },
  { name: 'lib-098-record-011', value: 1188, offset: 11 },
  { name: 'lib-098-record-012', value: 1287, offset: 12 },
  { name: 'lib-098-record-013', value: 1386, offset: 13 },
  { name: 'lib-098-record-014', value: 1485, offset: 14 },
  { name: 'lib-098-record-015', value: 1584, offset: 15 },
  { name: 'lib-098-record-016', value: 1683, offset: 16 },
  { name: 'lib-098-record-017', value: 1782, offset: 17 },
  { name: 'lib-098-record-018', value: 1881, offset: 18 },
  { name: 'lib-098-record-019', value: 1980, offset: 19 },
  { name: 'lib-098-record-020', value: 2079, offset: 20 },
  { name: 'lib-098-record-021', value: 2178, offset: 21 },
  { name: 'lib-098-record-022', value: 2277, offset: 22 },
  { name: 'lib-098-record-023', value: 2376, offset: 23 },
  { name: 'lib-098-record-024', value: 2475, offset: 24 },
  { name: 'lib-098-record-025', value: 2574, offset: 25 },
  { name: 'lib-098-record-026', value: 2673, offset: 26 },
  { name: 'lib-098-record-027', value: 2772, offset: 27 },
  { name: 'lib-098-record-028', value: 2871, offset: 28 },
  { name: 'lib-098-record-029', value: 2970, offset: 29 },
  { name: 'lib-098-record-030', value: 3069, offset: 30 },
  { name: 'lib-098-record-031', value: 3168, offset: 31 },
  { name: 'lib-098-record-032', value: 3267, offset: 32 },
  { name: 'lib-098-record-033', value: 3366, offset: 33 },
  { name: 'lib-098-record-034', value: 3465, offset: 34 },
  { name: 'lib-098-record-035', value: 3564, offset: 35 },
  { name: 'lib-098-record-036', value: 3663, offset: 36 },
  { name: 'lib-098-record-037', value: 3762, offset: 37 },
  { name: 'lib-098-record-038', value: 3861, offset: 38 },
  { name: 'lib-098-record-039', value: 3960, offset: 39 },
  { name: 'lib-098-record-040', value: 4059, offset: 40 },
  { name: 'lib-098-record-041', value: 4158, offset: 41 },
  { name: 'lib-098-record-042', value: 4257, offset: 42 },
  { name: 'lib-098-record-043', value: 4356, offset: 43 },
  { name: 'lib-098-record-044', value: 4455, offset: 44 },
  { name: 'lib-098-record-045', value: 4554, offset: 45 },
  { name: 'lib-098-record-046', value: 4653, offset: 46 },
  { name: 'lib-098-record-047', value: 4752, offset: 47 },
  { name: 'lib-098-record-048', value: 4851, offset: 48 },
  { name: 'lib-098-record-049', value: 4950, offset: 49 },
  { name: 'lib-098-record-050', value: 5049, offset: 50 },
  { name: 'lib-098-record-051', value: 5148, offset: 51 },
  { name: 'lib-098-record-052', value: 5247, offset: 52 },
  { name: 'lib-098-record-053', value: 5346, offset: 53 },
  { name: 'lib-098-record-054', value: 5445, offset: 54 },
  { name: 'lib-098-record-055', value: 5544, offset: 55 },
  { name: 'lib-098-record-056', value: 5643, offset: 56 },
  { name: 'lib-098-record-057', value: 5742, offset: 57 },
  { name: 'lib-098-record-058', value: 5841, offset: 58 },
  { name: 'lib-098-record-059', value: 5940, offset: 59 },
  { name: 'lib-098-record-060', value: 6039, offset: 60 },
  { name: 'lib-098-record-061', value: 6138, offset: 61 },
  { name: 'lib-098-record-062', value: 6237, offset: 62 },
  { name: 'lib-098-record-063', value: 6336, offset: 63 },
];
export const total = sumBy(rows, 'value') + total088 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-098',
  standalone: true,
  imports: [Lib088Component, Lib000Component],
  template: `<section><h2>lib-098: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-088 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib098Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
