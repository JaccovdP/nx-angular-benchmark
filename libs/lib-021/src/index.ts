import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib011Component, total as total011 } from '@bench/lib-011';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-021-record-000', value: 22, offset: 0 },
  { name: 'lib-021-record-001', value: 44, offset: 1 },
  { name: 'lib-021-record-002', value: 66, offset: 2 },
  { name: 'lib-021-record-003', value: 88, offset: 3 },
  { name: 'lib-021-record-004', value: 110, offset: 4 },
  { name: 'lib-021-record-005', value: 132, offset: 5 },
  { name: 'lib-021-record-006', value: 154, offset: 6 },
  { name: 'lib-021-record-007', value: 176, offset: 7 },
  { name: 'lib-021-record-008', value: 198, offset: 8 },
  { name: 'lib-021-record-009', value: 220, offset: 9 },
  { name: 'lib-021-record-010', value: 242, offset: 10 },
  { name: 'lib-021-record-011', value: 264, offset: 11 },
  { name: 'lib-021-record-012', value: 286, offset: 12 },
  { name: 'lib-021-record-013', value: 308, offset: 13 },
  { name: 'lib-021-record-014', value: 330, offset: 14 },
  { name: 'lib-021-record-015', value: 352, offset: 15 },
  { name: 'lib-021-record-016', value: 374, offset: 16 },
  { name: 'lib-021-record-017', value: 396, offset: 17 },
  { name: 'lib-021-record-018', value: 418, offset: 18 },
  { name: 'lib-021-record-019', value: 440, offset: 19 },
  { name: 'lib-021-record-020', value: 462, offset: 20 },
  { name: 'lib-021-record-021', value: 484, offset: 21 },
  { name: 'lib-021-record-022', value: 506, offset: 22 },
  { name: 'lib-021-record-023', value: 528, offset: 23 },
  { name: 'lib-021-record-024', value: 550, offset: 24 },
  { name: 'lib-021-record-025', value: 572, offset: 25 },
  { name: 'lib-021-record-026', value: 594, offset: 26 },
  { name: 'lib-021-record-027', value: 616, offset: 27 },
  { name: 'lib-021-record-028', value: 638, offset: 28 },
  { name: 'lib-021-record-029', value: 660, offset: 29 },
  { name: 'lib-021-record-030', value: 682, offset: 30 },
  { name: 'lib-021-record-031', value: 704, offset: 31 },
  { name: 'lib-021-record-032', value: 726, offset: 32 },
  { name: 'lib-021-record-033', value: 748, offset: 33 },
  { name: 'lib-021-record-034', value: 770, offset: 34 },
  { name: 'lib-021-record-035', value: 792, offset: 35 },
  { name: 'lib-021-record-036', value: 814, offset: 36 },
  { name: 'lib-021-record-037', value: 836, offset: 37 },
  { name: 'lib-021-record-038', value: 858, offset: 38 },
  { name: 'lib-021-record-039', value: 880, offset: 39 },
  { name: 'lib-021-record-040', value: 902, offset: 40 },
  { name: 'lib-021-record-041', value: 924, offset: 41 },
  { name: 'lib-021-record-042', value: 946, offset: 42 },
  { name: 'lib-021-record-043', value: 968, offset: 43 },
  { name: 'lib-021-record-044', value: 990, offset: 44 },
  { name: 'lib-021-record-045', value: 1012, offset: 45 },
  { name: 'lib-021-record-046', value: 1034, offset: 46 },
  { name: 'lib-021-record-047', value: 1056, offset: 47 },
  { name: 'lib-021-record-048', value: 1078, offset: 48 },
  { name: 'lib-021-record-049', value: 1100, offset: 49 },
  { name: 'lib-021-record-050', value: 1122, offset: 50 },
  { name: 'lib-021-record-051', value: 1144, offset: 51 },
  { name: 'lib-021-record-052', value: 1166, offset: 52 },
  { name: 'lib-021-record-053', value: 1188, offset: 53 },
  { name: 'lib-021-record-054', value: 1210, offset: 54 },
  { name: 'lib-021-record-055', value: 1232, offset: 55 },
  { name: 'lib-021-record-056', value: 1254, offset: 56 },
  { name: 'lib-021-record-057', value: 1276, offset: 57 },
  { name: 'lib-021-record-058', value: 1298, offset: 58 },
  { name: 'lib-021-record-059', value: 1320, offset: 59 },
  { name: 'lib-021-record-060', value: 1342, offset: 60 },
  { name: 'lib-021-record-061', value: 1364, offset: 61 },
  { name: 'lib-021-record-062', value: 1386, offset: 62 },
  { name: 'lib-021-record-063', value: 1408, offset: 63 },
];
export const total = sumBy(rows, 'value') + total011 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-021',
  standalone: true,
  imports: [Lib011Component, Lib000Component],
  template: `<section><h2>lib-021: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-011 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib021Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
