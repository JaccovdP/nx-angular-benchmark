import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib006Component, total as total006 } from '@bench/lib-006';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-016-record-000', value: 17, offset: 0 },
  { name: 'lib-016-record-001', value: 34, offset: 1 },
  { name: 'lib-016-record-002', value: 51, offset: 2 },
  { name: 'lib-016-record-003', value: 68, offset: 3 },
  { name: 'lib-016-record-004', value: 85, offset: 4 },
  { name: 'lib-016-record-005', value: 102, offset: 5 },
  { name: 'lib-016-record-006', value: 119, offset: 6 },
  { name: 'lib-016-record-007', value: 136, offset: 7 },
  { name: 'lib-016-record-008', value: 153, offset: 8 },
  { name: 'lib-016-record-009', value: 170, offset: 9 },
  { name: 'lib-016-record-010', value: 187, offset: 10 },
  { name: 'lib-016-record-011', value: 204, offset: 11 },
  { name: 'lib-016-record-012', value: 221, offset: 12 },
  { name: 'lib-016-record-013', value: 238, offset: 13 },
  { name: 'lib-016-record-014', value: 255, offset: 14 },
  { name: 'lib-016-record-015', value: 272, offset: 15 },
  { name: 'lib-016-record-016', value: 289, offset: 16 },
  { name: 'lib-016-record-017', value: 306, offset: 17 },
  { name: 'lib-016-record-018', value: 323, offset: 18 },
  { name: 'lib-016-record-019', value: 340, offset: 19 },
  { name: 'lib-016-record-020', value: 357, offset: 20 },
  { name: 'lib-016-record-021', value: 374, offset: 21 },
  { name: 'lib-016-record-022', value: 391, offset: 22 },
  { name: 'lib-016-record-023', value: 408, offset: 23 },
  { name: 'lib-016-record-024', value: 425, offset: 24 },
  { name: 'lib-016-record-025', value: 442, offset: 25 },
  { name: 'lib-016-record-026', value: 459, offset: 26 },
  { name: 'lib-016-record-027', value: 476, offset: 27 },
  { name: 'lib-016-record-028', value: 493, offset: 28 },
  { name: 'lib-016-record-029', value: 510, offset: 29 },
  { name: 'lib-016-record-030', value: 527, offset: 30 },
  { name: 'lib-016-record-031', value: 544, offset: 31 },
  { name: 'lib-016-record-032', value: 561, offset: 32 },
  { name: 'lib-016-record-033', value: 578, offset: 33 },
  { name: 'lib-016-record-034', value: 595, offset: 34 },
  { name: 'lib-016-record-035', value: 612, offset: 35 },
  { name: 'lib-016-record-036', value: 629, offset: 36 },
  { name: 'lib-016-record-037', value: 646, offset: 37 },
  { name: 'lib-016-record-038', value: 663, offset: 38 },
  { name: 'lib-016-record-039', value: 680, offset: 39 },
  { name: 'lib-016-record-040', value: 697, offset: 40 },
  { name: 'lib-016-record-041', value: 714, offset: 41 },
  { name: 'lib-016-record-042', value: 731, offset: 42 },
  { name: 'lib-016-record-043', value: 748, offset: 43 },
  { name: 'lib-016-record-044', value: 765, offset: 44 },
  { name: 'lib-016-record-045', value: 782, offset: 45 },
  { name: 'lib-016-record-046', value: 799, offset: 46 },
  { name: 'lib-016-record-047', value: 816, offset: 47 },
  { name: 'lib-016-record-048', value: 833, offset: 48 },
  { name: 'lib-016-record-049', value: 850, offset: 49 },
  { name: 'lib-016-record-050', value: 867, offset: 50 },
  { name: 'lib-016-record-051', value: 884, offset: 51 },
  { name: 'lib-016-record-052', value: 901, offset: 52 },
  { name: 'lib-016-record-053', value: 918, offset: 53 },
  { name: 'lib-016-record-054', value: 935, offset: 54 },
  { name: 'lib-016-record-055', value: 952, offset: 55 },
  { name: 'lib-016-record-056', value: 969, offset: 56 },
  { name: 'lib-016-record-057', value: 986, offset: 57 },
  { name: 'lib-016-record-058', value: 1003, offset: 58 },
  { name: 'lib-016-record-059', value: 1020, offset: 59 },
  { name: 'lib-016-record-060', value: 1037, offset: 60 },
  { name: 'lib-016-record-061', value: 1054, offset: 61 },
  { name: 'lib-016-record-062', value: 1071, offset: 62 },
  { name: 'lib-016-record-063', value: 1088, offset: 63 },
];
export const total = sumBy(rows, 'value') + total006 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-016',
  standalone: true,
  imports: [Lib006Component, Lib000Component],
  template: `<section><h2>lib-016: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-006 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib016Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
