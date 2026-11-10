import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib036Component, total as total036 } from '@bench/lib-036';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-046-record-000', value: 47, offset: 0 },
  { name: 'lib-046-record-001', value: 94, offset: 1 },
  { name: 'lib-046-record-002', value: 141, offset: 2 },
  { name: 'lib-046-record-003', value: 188, offset: 3 },
  { name: 'lib-046-record-004', value: 235, offset: 4 },
  { name: 'lib-046-record-005', value: 282, offset: 5 },
  { name: 'lib-046-record-006', value: 329, offset: 6 },
  { name: 'lib-046-record-007', value: 376, offset: 7 },
  { name: 'lib-046-record-008', value: 423, offset: 8 },
  { name: 'lib-046-record-009', value: 470, offset: 9 },
  { name: 'lib-046-record-010', value: 517, offset: 10 },
  { name: 'lib-046-record-011', value: 564, offset: 11 },
  { name: 'lib-046-record-012', value: 611, offset: 12 },
  { name: 'lib-046-record-013', value: 658, offset: 13 },
  { name: 'lib-046-record-014', value: 705, offset: 14 },
  { name: 'lib-046-record-015', value: 752, offset: 15 },
  { name: 'lib-046-record-016', value: 799, offset: 16 },
  { name: 'lib-046-record-017', value: 846, offset: 17 },
  { name: 'lib-046-record-018', value: 893, offset: 18 },
  { name: 'lib-046-record-019', value: 940, offset: 19 },
  { name: 'lib-046-record-020', value: 987, offset: 20 },
  { name: 'lib-046-record-021', value: 1034, offset: 21 },
  { name: 'lib-046-record-022', value: 1081, offset: 22 },
  { name: 'lib-046-record-023', value: 1128, offset: 23 },
  { name: 'lib-046-record-024', value: 1175, offset: 24 },
  { name: 'lib-046-record-025', value: 1222, offset: 25 },
  { name: 'lib-046-record-026', value: 1269, offset: 26 },
  { name: 'lib-046-record-027', value: 1316, offset: 27 },
  { name: 'lib-046-record-028', value: 1363, offset: 28 },
  { name: 'lib-046-record-029', value: 1410, offset: 29 },
  { name: 'lib-046-record-030', value: 1457, offset: 30 },
  { name: 'lib-046-record-031', value: 1504, offset: 31 },
  { name: 'lib-046-record-032', value: 1551, offset: 32 },
  { name: 'lib-046-record-033', value: 1598, offset: 33 },
  { name: 'lib-046-record-034', value: 1645, offset: 34 },
  { name: 'lib-046-record-035', value: 1692, offset: 35 },
  { name: 'lib-046-record-036', value: 1739, offset: 36 },
  { name: 'lib-046-record-037', value: 1786, offset: 37 },
  { name: 'lib-046-record-038', value: 1833, offset: 38 },
  { name: 'lib-046-record-039', value: 1880, offset: 39 },
  { name: 'lib-046-record-040', value: 1927, offset: 40 },
  { name: 'lib-046-record-041', value: 1974, offset: 41 },
  { name: 'lib-046-record-042', value: 2021, offset: 42 },
  { name: 'lib-046-record-043', value: 2068, offset: 43 },
  { name: 'lib-046-record-044', value: 2115, offset: 44 },
  { name: 'lib-046-record-045', value: 2162, offset: 45 },
  { name: 'lib-046-record-046', value: 2209, offset: 46 },
  { name: 'lib-046-record-047', value: 2256, offset: 47 },
  { name: 'lib-046-record-048', value: 2303, offset: 48 },
  { name: 'lib-046-record-049', value: 2350, offset: 49 },
  { name: 'lib-046-record-050', value: 2397, offset: 50 },
  { name: 'lib-046-record-051', value: 2444, offset: 51 },
  { name: 'lib-046-record-052', value: 2491, offset: 52 },
  { name: 'lib-046-record-053', value: 2538, offset: 53 },
  { name: 'lib-046-record-054', value: 2585, offset: 54 },
  { name: 'lib-046-record-055', value: 2632, offset: 55 },
  { name: 'lib-046-record-056', value: 2679, offset: 56 },
  { name: 'lib-046-record-057', value: 2726, offset: 57 },
  { name: 'lib-046-record-058', value: 2773, offset: 58 },
  { name: 'lib-046-record-059', value: 2820, offset: 59 },
  { name: 'lib-046-record-060', value: 2867, offset: 60 },
  { name: 'lib-046-record-061', value: 2914, offset: 61 },
  { name: 'lib-046-record-062', value: 2961, offset: 62 },
  { name: 'lib-046-record-063', value: 3008, offset: 63 },
];
export const total = sumBy(rows, 'value') + total036 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-046',
  standalone: true,
  imports: [Lib036Component, Lib000Component],
  template: `<section><h2>lib-046: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-036 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib046Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
