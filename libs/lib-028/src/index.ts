import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib018Component, total as total018 } from '@bench/lib-018';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-028-record-000', value: 29, offset: 0 },
  { name: 'lib-028-record-001', value: 58, offset: 1 },
  { name: 'lib-028-record-002', value: 87, offset: 2 },
  { name: 'lib-028-record-003', value: 116, offset: 3 },
  { name: 'lib-028-record-004', value: 145, offset: 4 },
  { name: 'lib-028-record-005', value: 174, offset: 5 },
  { name: 'lib-028-record-006', value: 203, offset: 6 },
  { name: 'lib-028-record-007', value: 232, offset: 7 },
  { name: 'lib-028-record-008', value: 261, offset: 8 },
  { name: 'lib-028-record-009', value: 290, offset: 9 },
  { name: 'lib-028-record-010', value: 319, offset: 10 },
  { name: 'lib-028-record-011', value: 348, offset: 11 },
  { name: 'lib-028-record-012', value: 377, offset: 12 },
  { name: 'lib-028-record-013', value: 406, offset: 13 },
  { name: 'lib-028-record-014', value: 435, offset: 14 },
  { name: 'lib-028-record-015', value: 464, offset: 15 },
  { name: 'lib-028-record-016', value: 493, offset: 16 },
  { name: 'lib-028-record-017', value: 522, offset: 17 },
  { name: 'lib-028-record-018', value: 551, offset: 18 },
  { name: 'lib-028-record-019', value: 580, offset: 19 },
  { name: 'lib-028-record-020', value: 609, offset: 20 },
  { name: 'lib-028-record-021', value: 638, offset: 21 },
  { name: 'lib-028-record-022', value: 667, offset: 22 },
  { name: 'lib-028-record-023', value: 696, offset: 23 },
  { name: 'lib-028-record-024', value: 725, offset: 24 },
  { name: 'lib-028-record-025', value: 754, offset: 25 },
  { name: 'lib-028-record-026', value: 783, offset: 26 },
  { name: 'lib-028-record-027', value: 812, offset: 27 },
  { name: 'lib-028-record-028', value: 841, offset: 28 },
  { name: 'lib-028-record-029', value: 870, offset: 29 },
  { name: 'lib-028-record-030', value: 899, offset: 30 },
  { name: 'lib-028-record-031', value: 928, offset: 31 },
  { name: 'lib-028-record-032', value: 957, offset: 32 },
  { name: 'lib-028-record-033', value: 986, offset: 33 },
  { name: 'lib-028-record-034', value: 1015, offset: 34 },
  { name: 'lib-028-record-035', value: 1044, offset: 35 },
  { name: 'lib-028-record-036', value: 1073, offset: 36 },
  { name: 'lib-028-record-037', value: 1102, offset: 37 },
  { name: 'lib-028-record-038', value: 1131, offset: 38 },
  { name: 'lib-028-record-039', value: 1160, offset: 39 },
  { name: 'lib-028-record-040', value: 1189, offset: 40 },
  { name: 'lib-028-record-041', value: 1218, offset: 41 },
  { name: 'lib-028-record-042', value: 1247, offset: 42 },
  { name: 'lib-028-record-043', value: 1276, offset: 43 },
  { name: 'lib-028-record-044', value: 1305, offset: 44 },
  { name: 'lib-028-record-045', value: 1334, offset: 45 },
  { name: 'lib-028-record-046', value: 1363, offset: 46 },
  { name: 'lib-028-record-047', value: 1392, offset: 47 },
  { name: 'lib-028-record-048', value: 1421, offset: 48 },
  { name: 'lib-028-record-049', value: 1450, offset: 49 },
  { name: 'lib-028-record-050', value: 1479, offset: 50 },
  { name: 'lib-028-record-051', value: 1508, offset: 51 },
  { name: 'lib-028-record-052', value: 1537, offset: 52 },
  { name: 'lib-028-record-053', value: 1566, offset: 53 },
  { name: 'lib-028-record-054', value: 1595, offset: 54 },
  { name: 'lib-028-record-055', value: 1624, offset: 55 },
  { name: 'lib-028-record-056', value: 1653, offset: 56 },
  { name: 'lib-028-record-057', value: 1682, offset: 57 },
  { name: 'lib-028-record-058', value: 1711, offset: 58 },
  { name: 'lib-028-record-059', value: 1740, offset: 59 },
  { name: 'lib-028-record-060', value: 1769, offset: 60 },
  { name: 'lib-028-record-061', value: 1798, offset: 61 },
  { name: 'lib-028-record-062', value: 1827, offset: 62 },
  { name: 'lib-028-record-063', value: 1856, offset: 63 },
];
export const total = sumBy(rows, 'value') + total018 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-028',
  standalone: true,
  imports: [Lib018Component, Lib000Component],
  template: `<section><h2>lib-028: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-018 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib028Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
