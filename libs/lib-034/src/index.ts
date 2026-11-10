import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib024Component, total as total024 } from '@bench/lib-024';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-034-record-000', value: 35, offset: 0 },
  { name: 'lib-034-record-001', value: 70, offset: 1 },
  { name: 'lib-034-record-002', value: 105, offset: 2 },
  { name: 'lib-034-record-003', value: 140, offset: 3 },
  { name: 'lib-034-record-004', value: 175, offset: 4 },
  { name: 'lib-034-record-005', value: 210, offset: 5 },
  { name: 'lib-034-record-006', value: 245, offset: 6 },
  { name: 'lib-034-record-007', value: 280, offset: 7 },
  { name: 'lib-034-record-008', value: 315, offset: 8 },
  { name: 'lib-034-record-009', value: 350, offset: 9 },
  { name: 'lib-034-record-010', value: 385, offset: 10 },
  { name: 'lib-034-record-011', value: 420, offset: 11 },
  { name: 'lib-034-record-012', value: 455, offset: 12 },
  { name: 'lib-034-record-013', value: 490, offset: 13 },
  { name: 'lib-034-record-014', value: 525, offset: 14 },
  { name: 'lib-034-record-015', value: 560, offset: 15 },
  { name: 'lib-034-record-016', value: 595, offset: 16 },
  { name: 'lib-034-record-017', value: 630, offset: 17 },
  { name: 'lib-034-record-018', value: 665, offset: 18 },
  { name: 'lib-034-record-019', value: 700, offset: 19 },
  { name: 'lib-034-record-020', value: 735, offset: 20 },
  { name: 'lib-034-record-021', value: 770, offset: 21 },
  { name: 'lib-034-record-022', value: 805, offset: 22 },
  { name: 'lib-034-record-023', value: 840, offset: 23 },
  { name: 'lib-034-record-024', value: 875, offset: 24 },
  { name: 'lib-034-record-025', value: 910, offset: 25 },
  { name: 'lib-034-record-026', value: 945, offset: 26 },
  { name: 'lib-034-record-027', value: 980, offset: 27 },
  { name: 'lib-034-record-028', value: 1015, offset: 28 },
  { name: 'lib-034-record-029', value: 1050, offset: 29 },
  { name: 'lib-034-record-030', value: 1085, offset: 30 },
  { name: 'lib-034-record-031', value: 1120, offset: 31 },
  { name: 'lib-034-record-032', value: 1155, offset: 32 },
  { name: 'lib-034-record-033', value: 1190, offset: 33 },
  { name: 'lib-034-record-034', value: 1225, offset: 34 },
  { name: 'lib-034-record-035', value: 1260, offset: 35 },
  { name: 'lib-034-record-036', value: 1295, offset: 36 },
  { name: 'lib-034-record-037', value: 1330, offset: 37 },
  { name: 'lib-034-record-038', value: 1365, offset: 38 },
  { name: 'lib-034-record-039', value: 1400, offset: 39 },
  { name: 'lib-034-record-040', value: 1435, offset: 40 },
  { name: 'lib-034-record-041', value: 1470, offset: 41 },
  { name: 'lib-034-record-042', value: 1505, offset: 42 },
  { name: 'lib-034-record-043', value: 1540, offset: 43 },
  { name: 'lib-034-record-044', value: 1575, offset: 44 },
  { name: 'lib-034-record-045', value: 1610, offset: 45 },
  { name: 'lib-034-record-046', value: 1645, offset: 46 },
  { name: 'lib-034-record-047', value: 1680, offset: 47 },
  { name: 'lib-034-record-048', value: 1715, offset: 48 },
  { name: 'lib-034-record-049', value: 1750, offset: 49 },
  { name: 'lib-034-record-050', value: 1785, offset: 50 },
  { name: 'lib-034-record-051', value: 1820, offset: 51 },
  { name: 'lib-034-record-052', value: 1855, offset: 52 },
  { name: 'lib-034-record-053', value: 1890, offset: 53 },
  { name: 'lib-034-record-054', value: 1925, offset: 54 },
  { name: 'lib-034-record-055', value: 1960, offset: 55 },
  { name: 'lib-034-record-056', value: 1995, offset: 56 },
  { name: 'lib-034-record-057', value: 2030, offset: 57 },
  { name: 'lib-034-record-058', value: 2065, offset: 58 },
  { name: 'lib-034-record-059', value: 2100, offset: 59 },
  { name: 'lib-034-record-060', value: 2135, offset: 60 },
  { name: 'lib-034-record-061', value: 2170, offset: 61 },
  { name: 'lib-034-record-062', value: 2205, offset: 62 },
  { name: 'lib-034-record-063', value: 2240, offset: 63 },
];
export const total = sumBy(rows, 'value') + total024 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-034',
  standalone: true,
  imports: [Lib024Component, Lib000Component],
  template: `<section><h2>lib-034: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-024 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib034Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
