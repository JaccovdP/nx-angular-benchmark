import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib010Component, total as total010 } from '@bench/lib-010';

const rows = [
  { name: 'lib-020-record-000', value: 21, offset: 0 },
  { name: 'lib-020-record-001', value: 42, offset: 1 },
  { name: 'lib-020-record-002', value: 63, offset: 2 },
  { name: 'lib-020-record-003', value: 84, offset: 3 },
  { name: 'lib-020-record-004', value: 105, offset: 4 },
  { name: 'lib-020-record-005', value: 126, offset: 5 },
  { name: 'lib-020-record-006', value: 147, offset: 6 },
  { name: 'lib-020-record-007', value: 168, offset: 7 },
  { name: 'lib-020-record-008', value: 189, offset: 8 },
  { name: 'lib-020-record-009', value: 210, offset: 9 },
  { name: 'lib-020-record-010', value: 231, offset: 10 },
  { name: 'lib-020-record-011', value: 252, offset: 11 },
  { name: 'lib-020-record-012', value: 273, offset: 12 },
  { name: 'lib-020-record-013', value: 294, offset: 13 },
  { name: 'lib-020-record-014', value: 315, offset: 14 },
  { name: 'lib-020-record-015', value: 336, offset: 15 },
  { name: 'lib-020-record-016', value: 357, offset: 16 },
  { name: 'lib-020-record-017', value: 378, offset: 17 },
  { name: 'lib-020-record-018', value: 399, offset: 18 },
  { name: 'lib-020-record-019', value: 420, offset: 19 },
  { name: 'lib-020-record-020', value: 441, offset: 20 },
  { name: 'lib-020-record-021', value: 462, offset: 21 },
  { name: 'lib-020-record-022', value: 483, offset: 22 },
  { name: 'lib-020-record-023', value: 504, offset: 23 },
  { name: 'lib-020-record-024', value: 525, offset: 24 },
  { name: 'lib-020-record-025', value: 546, offset: 25 },
  { name: 'lib-020-record-026', value: 567, offset: 26 },
  { name: 'lib-020-record-027', value: 588, offset: 27 },
  { name: 'lib-020-record-028', value: 609, offset: 28 },
  { name: 'lib-020-record-029', value: 630, offset: 29 },
  { name: 'lib-020-record-030', value: 651, offset: 30 },
  { name: 'lib-020-record-031', value: 672, offset: 31 },
  { name: 'lib-020-record-032', value: 693, offset: 32 },
  { name: 'lib-020-record-033', value: 714, offset: 33 },
  { name: 'lib-020-record-034', value: 735, offset: 34 },
  { name: 'lib-020-record-035', value: 756, offset: 35 },
  { name: 'lib-020-record-036', value: 777, offset: 36 },
  { name: 'lib-020-record-037', value: 798, offset: 37 },
  { name: 'lib-020-record-038', value: 819, offset: 38 },
  { name: 'lib-020-record-039', value: 840, offset: 39 },
  { name: 'lib-020-record-040', value: 861, offset: 40 },
  { name: 'lib-020-record-041', value: 882, offset: 41 },
  { name: 'lib-020-record-042', value: 903, offset: 42 },
  { name: 'lib-020-record-043', value: 924, offset: 43 },
  { name: 'lib-020-record-044', value: 945, offset: 44 },
  { name: 'lib-020-record-045', value: 966, offset: 45 },
  { name: 'lib-020-record-046', value: 987, offset: 46 },
  { name: 'lib-020-record-047', value: 1008, offset: 47 },
  { name: 'lib-020-record-048', value: 1029, offset: 48 },
  { name: 'lib-020-record-049', value: 1050, offset: 49 },
  { name: 'lib-020-record-050', value: 1071, offset: 50 },
  { name: 'lib-020-record-051', value: 1092, offset: 51 },
  { name: 'lib-020-record-052', value: 1113, offset: 52 },
  { name: 'lib-020-record-053', value: 1134, offset: 53 },
  { name: 'lib-020-record-054', value: 1155, offset: 54 },
  { name: 'lib-020-record-055', value: 1176, offset: 55 },
  { name: 'lib-020-record-056', value: 1197, offset: 56 },
  { name: 'lib-020-record-057', value: 1218, offset: 57 },
  { name: 'lib-020-record-058', value: 1239, offset: 58 },
  { name: 'lib-020-record-059', value: 1260, offset: 59 },
  { name: 'lib-020-record-060', value: 1281, offset: 60 },
  { name: 'lib-020-record-061', value: 1302, offset: 61 },
  { name: 'lib-020-record-062', value: 1323, offset: 62 },
  { name: 'lib-020-record-063', value: 1344, offset: 63 },
];
export const total = sumBy(rows, 'value') + total010;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-020',
  standalone: true,
  imports: [Lib010Component],
  template: `<section><h2>lib-020: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-010 />
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib020Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
