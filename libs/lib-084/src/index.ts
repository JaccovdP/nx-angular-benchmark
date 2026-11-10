import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib074Component, total as total074 } from '@bench/lib-074';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-084-record-000', value: 85, offset: 0 },
  { name: 'lib-084-record-001', value: 170, offset: 1 },
  { name: 'lib-084-record-002', value: 255, offset: 2 },
  { name: 'lib-084-record-003', value: 340, offset: 3 },
  { name: 'lib-084-record-004', value: 425, offset: 4 },
  { name: 'lib-084-record-005', value: 510, offset: 5 },
  { name: 'lib-084-record-006', value: 595, offset: 6 },
  { name: 'lib-084-record-007', value: 680, offset: 7 },
  { name: 'lib-084-record-008', value: 765, offset: 8 },
  { name: 'lib-084-record-009', value: 850, offset: 9 },
  { name: 'lib-084-record-010', value: 935, offset: 10 },
  { name: 'lib-084-record-011', value: 1020, offset: 11 },
  { name: 'lib-084-record-012', value: 1105, offset: 12 },
  { name: 'lib-084-record-013', value: 1190, offset: 13 },
  { name: 'lib-084-record-014', value: 1275, offset: 14 },
  { name: 'lib-084-record-015', value: 1360, offset: 15 },
  { name: 'lib-084-record-016', value: 1445, offset: 16 },
  { name: 'lib-084-record-017', value: 1530, offset: 17 },
  { name: 'lib-084-record-018', value: 1615, offset: 18 },
  { name: 'lib-084-record-019', value: 1700, offset: 19 },
  { name: 'lib-084-record-020', value: 1785, offset: 20 },
  { name: 'lib-084-record-021', value: 1870, offset: 21 },
  { name: 'lib-084-record-022', value: 1955, offset: 22 },
  { name: 'lib-084-record-023', value: 2040, offset: 23 },
  { name: 'lib-084-record-024', value: 2125, offset: 24 },
  { name: 'lib-084-record-025', value: 2210, offset: 25 },
  { name: 'lib-084-record-026', value: 2295, offset: 26 },
  { name: 'lib-084-record-027', value: 2380, offset: 27 },
  { name: 'lib-084-record-028', value: 2465, offset: 28 },
  { name: 'lib-084-record-029', value: 2550, offset: 29 },
  { name: 'lib-084-record-030', value: 2635, offset: 30 },
  { name: 'lib-084-record-031', value: 2720, offset: 31 },
  { name: 'lib-084-record-032', value: 2805, offset: 32 },
  { name: 'lib-084-record-033', value: 2890, offset: 33 },
  { name: 'lib-084-record-034', value: 2975, offset: 34 },
  { name: 'lib-084-record-035', value: 3060, offset: 35 },
  { name: 'lib-084-record-036', value: 3145, offset: 36 },
  { name: 'lib-084-record-037', value: 3230, offset: 37 },
  { name: 'lib-084-record-038', value: 3315, offset: 38 },
  { name: 'lib-084-record-039', value: 3400, offset: 39 },
  { name: 'lib-084-record-040', value: 3485, offset: 40 },
  { name: 'lib-084-record-041', value: 3570, offset: 41 },
  { name: 'lib-084-record-042', value: 3655, offset: 42 },
  { name: 'lib-084-record-043', value: 3740, offset: 43 },
  { name: 'lib-084-record-044', value: 3825, offset: 44 },
  { name: 'lib-084-record-045', value: 3910, offset: 45 },
  { name: 'lib-084-record-046', value: 3995, offset: 46 },
  { name: 'lib-084-record-047', value: 4080, offset: 47 },
  { name: 'lib-084-record-048', value: 4165, offset: 48 },
  { name: 'lib-084-record-049', value: 4250, offset: 49 },
  { name: 'lib-084-record-050', value: 4335, offset: 50 },
  { name: 'lib-084-record-051', value: 4420, offset: 51 },
  { name: 'lib-084-record-052', value: 4505, offset: 52 },
  { name: 'lib-084-record-053', value: 4590, offset: 53 },
  { name: 'lib-084-record-054', value: 4675, offset: 54 },
  { name: 'lib-084-record-055', value: 4760, offset: 55 },
  { name: 'lib-084-record-056', value: 4845, offset: 56 },
  { name: 'lib-084-record-057', value: 4930, offset: 57 },
  { name: 'lib-084-record-058', value: 5015, offset: 58 },
  { name: 'lib-084-record-059', value: 5100, offset: 59 },
  { name: 'lib-084-record-060', value: 5185, offset: 60 },
  { name: 'lib-084-record-061', value: 5270, offset: 61 },
  { name: 'lib-084-record-062', value: 5355, offset: 62 },
  { name: 'lib-084-record-063', value: 5440, offset: 63 },
];
export const total = sumBy(rows, 'value') + total074 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-084',
  standalone: true,
  imports: [Lib074Component, Lib000Component],
  template: `<section><h2>lib-084: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-074 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib084Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
