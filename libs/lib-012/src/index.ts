import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib002Component, total as total002 } from '@bench/lib-002';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-012-record-000', value: 13, offset: 0 },
  { name: 'lib-012-record-001', value: 26, offset: 1 },
  { name: 'lib-012-record-002', value: 39, offset: 2 },
  { name: 'lib-012-record-003', value: 52, offset: 3 },
  { name: 'lib-012-record-004', value: 65, offset: 4 },
  { name: 'lib-012-record-005', value: 78, offset: 5 },
  { name: 'lib-012-record-006', value: 91, offset: 6 },
  { name: 'lib-012-record-007', value: 104, offset: 7 },
  { name: 'lib-012-record-008', value: 117, offset: 8 },
  { name: 'lib-012-record-009', value: 130, offset: 9 },
  { name: 'lib-012-record-010', value: 143, offset: 10 },
  { name: 'lib-012-record-011', value: 156, offset: 11 },
  { name: 'lib-012-record-012', value: 169, offset: 12 },
  { name: 'lib-012-record-013', value: 182, offset: 13 },
  { name: 'lib-012-record-014', value: 195, offset: 14 },
  { name: 'lib-012-record-015', value: 208, offset: 15 },
  { name: 'lib-012-record-016', value: 221, offset: 16 },
  { name: 'lib-012-record-017', value: 234, offset: 17 },
  { name: 'lib-012-record-018', value: 247, offset: 18 },
  { name: 'lib-012-record-019', value: 260, offset: 19 },
  { name: 'lib-012-record-020', value: 273, offset: 20 },
  { name: 'lib-012-record-021', value: 286, offset: 21 },
  { name: 'lib-012-record-022', value: 299, offset: 22 },
  { name: 'lib-012-record-023', value: 312, offset: 23 },
  { name: 'lib-012-record-024', value: 325, offset: 24 },
  { name: 'lib-012-record-025', value: 338, offset: 25 },
  { name: 'lib-012-record-026', value: 351, offset: 26 },
  { name: 'lib-012-record-027', value: 364, offset: 27 },
  { name: 'lib-012-record-028', value: 377, offset: 28 },
  { name: 'lib-012-record-029', value: 390, offset: 29 },
  { name: 'lib-012-record-030', value: 403, offset: 30 },
  { name: 'lib-012-record-031', value: 416, offset: 31 },
  { name: 'lib-012-record-032', value: 429, offset: 32 },
  { name: 'lib-012-record-033', value: 442, offset: 33 },
  { name: 'lib-012-record-034', value: 455, offset: 34 },
  { name: 'lib-012-record-035', value: 468, offset: 35 },
  { name: 'lib-012-record-036', value: 481, offset: 36 },
  { name: 'lib-012-record-037', value: 494, offset: 37 },
  { name: 'lib-012-record-038', value: 507, offset: 38 },
  { name: 'lib-012-record-039', value: 520, offset: 39 },
  { name: 'lib-012-record-040', value: 533, offset: 40 },
  { name: 'lib-012-record-041', value: 546, offset: 41 },
  { name: 'lib-012-record-042', value: 559, offset: 42 },
  { name: 'lib-012-record-043', value: 572, offset: 43 },
  { name: 'lib-012-record-044', value: 585, offset: 44 },
  { name: 'lib-012-record-045', value: 598, offset: 45 },
  { name: 'lib-012-record-046', value: 611, offset: 46 },
  { name: 'lib-012-record-047', value: 624, offset: 47 },
  { name: 'lib-012-record-048', value: 637, offset: 48 },
  { name: 'lib-012-record-049', value: 650, offset: 49 },
  { name: 'lib-012-record-050', value: 663, offset: 50 },
  { name: 'lib-012-record-051', value: 676, offset: 51 },
  { name: 'lib-012-record-052', value: 689, offset: 52 },
  { name: 'lib-012-record-053', value: 702, offset: 53 },
  { name: 'lib-012-record-054', value: 715, offset: 54 },
  { name: 'lib-012-record-055', value: 728, offset: 55 },
  { name: 'lib-012-record-056', value: 741, offset: 56 },
  { name: 'lib-012-record-057', value: 754, offset: 57 },
  { name: 'lib-012-record-058', value: 767, offset: 58 },
  { name: 'lib-012-record-059', value: 780, offset: 59 },
  { name: 'lib-012-record-060', value: 793, offset: 60 },
  { name: 'lib-012-record-061', value: 806, offset: 61 },
  { name: 'lib-012-record-062', value: 819, offset: 62 },
  { name: 'lib-012-record-063', value: 832, offset: 63 },
];
export const total = sumBy(rows, 'value') + total002 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-012',
  standalone: true,
  imports: [Lib002Component, Lib000Component],
  template: `<section><h2>lib-012: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-002 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib012Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
