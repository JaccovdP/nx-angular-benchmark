import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib066Component, total as total066 } from '@bench/lib-066';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-076-record-000', value: 77, offset: 0 },
  { name: 'lib-076-record-001', value: 154, offset: 1 },
  { name: 'lib-076-record-002', value: 231, offset: 2 },
  { name: 'lib-076-record-003', value: 308, offset: 3 },
  { name: 'lib-076-record-004', value: 385, offset: 4 },
  { name: 'lib-076-record-005', value: 462, offset: 5 },
  { name: 'lib-076-record-006', value: 539, offset: 6 },
  { name: 'lib-076-record-007', value: 616, offset: 7 },
  { name: 'lib-076-record-008', value: 693, offset: 8 },
  { name: 'lib-076-record-009', value: 770, offset: 9 },
  { name: 'lib-076-record-010', value: 847, offset: 10 },
  { name: 'lib-076-record-011', value: 924, offset: 11 },
  { name: 'lib-076-record-012', value: 1001, offset: 12 },
  { name: 'lib-076-record-013', value: 1078, offset: 13 },
  { name: 'lib-076-record-014', value: 1155, offset: 14 },
  { name: 'lib-076-record-015', value: 1232, offset: 15 },
  { name: 'lib-076-record-016', value: 1309, offset: 16 },
  { name: 'lib-076-record-017', value: 1386, offset: 17 },
  { name: 'lib-076-record-018', value: 1463, offset: 18 },
  { name: 'lib-076-record-019', value: 1540, offset: 19 },
  { name: 'lib-076-record-020', value: 1617, offset: 20 },
  { name: 'lib-076-record-021', value: 1694, offset: 21 },
  { name: 'lib-076-record-022', value: 1771, offset: 22 },
  { name: 'lib-076-record-023', value: 1848, offset: 23 },
  { name: 'lib-076-record-024', value: 1925, offset: 24 },
  { name: 'lib-076-record-025', value: 2002, offset: 25 },
  { name: 'lib-076-record-026', value: 2079, offset: 26 },
  { name: 'lib-076-record-027', value: 2156, offset: 27 },
  { name: 'lib-076-record-028', value: 2233, offset: 28 },
  { name: 'lib-076-record-029', value: 2310, offset: 29 },
  { name: 'lib-076-record-030', value: 2387, offset: 30 },
  { name: 'lib-076-record-031', value: 2464, offset: 31 },
  { name: 'lib-076-record-032', value: 2541, offset: 32 },
  { name: 'lib-076-record-033', value: 2618, offset: 33 },
  { name: 'lib-076-record-034', value: 2695, offset: 34 },
  { name: 'lib-076-record-035', value: 2772, offset: 35 },
  { name: 'lib-076-record-036', value: 2849, offset: 36 },
  { name: 'lib-076-record-037', value: 2926, offset: 37 },
  { name: 'lib-076-record-038', value: 3003, offset: 38 },
  { name: 'lib-076-record-039', value: 3080, offset: 39 },
  { name: 'lib-076-record-040', value: 3157, offset: 40 },
  { name: 'lib-076-record-041', value: 3234, offset: 41 },
  { name: 'lib-076-record-042', value: 3311, offset: 42 },
  { name: 'lib-076-record-043', value: 3388, offset: 43 },
  { name: 'lib-076-record-044', value: 3465, offset: 44 },
  { name: 'lib-076-record-045', value: 3542, offset: 45 },
  { name: 'lib-076-record-046', value: 3619, offset: 46 },
  { name: 'lib-076-record-047', value: 3696, offset: 47 },
  { name: 'lib-076-record-048', value: 3773, offset: 48 },
  { name: 'lib-076-record-049', value: 3850, offset: 49 },
  { name: 'lib-076-record-050', value: 3927, offset: 50 },
  { name: 'lib-076-record-051', value: 4004, offset: 51 },
  { name: 'lib-076-record-052', value: 4081, offset: 52 },
  { name: 'lib-076-record-053', value: 4158, offset: 53 },
  { name: 'lib-076-record-054', value: 4235, offset: 54 },
  { name: 'lib-076-record-055', value: 4312, offset: 55 },
  { name: 'lib-076-record-056', value: 4389, offset: 56 },
  { name: 'lib-076-record-057', value: 4466, offset: 57 },
  { name: 'lib-076-record-058', value: 4543, offset: 58 },
  { name: 'lib-076-record-059', value: 4620, offset: 59 },
  { name: 'lib-076-record-060', value: 4697, offset: 60 },
  { name: 'lib-076-record-061', value: 4774, offset: 61 },
  { name: 'lib-076-record-062', value: 4851, offset: 62 },
  { name: 'lib-076-record-063', value: 4928, offset: 63 },
];
export const total = sumBy(rows, 'value') + total066 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-076',
  standalone: true,
  imports: [Lib066Component, Lib000Component],
  template: `<section><h2>lib-076: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-066 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib076Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
