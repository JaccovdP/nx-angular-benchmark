import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib084Component, total as total084 } from '@bench/lib-084';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-094-record-000', value: 95, offset: 0 },
  { name: 'lib-094-record-001', value: 190, offset: 1 },
  { name: 'lib-094-record-002', value: 285, offset: 2 },
  { name: 'lib-094-record-003', value: 380, offset: 3 },
  { name: 'lib-094-record-004', value: 475, offset: 4 },
  { name: 'lib-094-record-005', value: 570, offset: 5 },
  { name: 'lib-094-record-006', value: 665, offset: 6 },
  { name: 'lib-094-record-007', value: 760, offset: 7 },
  { name: 'lib-094-record-008', value: 855, offset: 8 },
  { name: 'lib-094-record-009', value: 950, offset: 9 },
  { name: 'lib-094-record-010', value: 1045, offset: 10 },
  { name: 'lib-094-record-011', value: 1140, offset: 11 },
  { name: 'lib-094-record-012', value: 1235, offset: 12 },
  { name: 'lib-094-record-013', value: 1330, offset: 13 },
  { name: 'lib-094-record-014', value: 1425, offset: 14 },
  { name: 'lib-094-record-015', value: 1520, offset: 15 },
  { name: 'lib-094-record-016', value: 1615, offset: 16 },
  { name: 'lib-094-record-017', value: 1710, offset: 17 },
  { name: 'lib-094-record-018', value: 1805, offset: 18 },
  { name: 'lib-094-record-019', value: 1900, offset: 19 },
  { name: 'lib-094-record-020', value: 1995, offset: 20 },
  { name: 'lib-094-record-021', value: 2090, offset: 21 },
  { name: 'lib-094-record-022', value: 2185, offset: 22 },
  { name: 'lib-094-record-023', value: 2280, offset: 23 },
  { name: 'lib-094-record-024', value: 2375, offset: 24 },
  { name: 'lib-094-record-025', value: 2470, offset: 25 },
  { name: 'lib-094-record-026', value: 2565, offset: 26 },
  { name: 'lib-094-record-027', value: 2660, offset: 27 },
  { name: 'lib-094-record-028', value: 2755, offset: 28 },
  { name: 'lib-094-record-029', value: 2850, offset: 29 },
  { name: 'lib-094-record-030', value: 2945, offset: 30 },
  { name: 'lib-094-record-031', value: 3040, offset: 31 },
  { name: 'lib-094-record-032', value: 3135, offset: 32 },
  { name: 'lib-094-record-033', value: 3230, offset: 33 },
  { name: 'lib-094-record-034', value: 3325, offset: 34 },
  { name: 'lib-094-record-035', value: 3420, offset: 35 },
  { name: 'lib-094-record-036', value: 3515, offset: 36 },
  { name: 'lib-094-record-037', value: 3610, offset: 37 },
  { name: 'lib-094-record-038', value: 3705, offset: 38 },
  { name: 'lib-094-record-039', value: 3800, offset: 39 },
  { name: 'lib-094-record-040', value: 3895, offset: 40 },
  { name: 'lib-094-record-041', value: 3990, offset: 41 },
  { name: 'lib-094-record-042', value: 4085, offset: 42 },
  { name: 'lib-094-record-043', value: 4180, offset: 43 },
  { name: 'lib-094-record-044', value: 4275, offset: 44 },
  { name: 'lib-094-record-045', value: 4370, offset: 45 },
  { name: 'lib-094-record-046', value: 4465, offset: 46 },
  { name: 'lib-094-record-047', value: 4560, offset: 47 },
  { name: 'lib-094-record-048', value: 4655, offset: 48 },
  { name: 'lib-094-record-049', value: 4750, offset: 49 },
  { name: 'lib-094-record-050', value: 4845, offset: 50 },
  { name: 'lib-094-record-051', value: 4940, offset: 51 },
  { name: 'lib-094-record-052', value: 5035, offset: 52 },
  { name: 'lib-094-record-053', value: 5130, offset: 53 },
  { name: 'lib-094-record-054', value: 5225, offset: 54 },
  { name: 'lib-094-record-055', value: 5320, offset: 55 },
  { name: 'lib-094-record-056', value: 5415, offset: 56 },
  { name: 'lib-094-record-057', value: 5510, offset: 57 },
  { name: 'lib-094-record-058', value: 5605, offset: 58 },
  { name: 'lib-094-record-059', value: 5700, offset: 59 },
  { name: 'lib-094-record-060', value: 5795, offset: 60 },
  { name: 'lib-094-record-061', value: 5890, offset: 61 },
  { name: 'lib-094-record-062', value: 5985, offset: 62 },
  { name: 'lib-094-record-063', value: 6080, offset: 63 },
];
export const total = sumBy(rows, 'value') + total084 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-094',
  standalone: true,
  imports: [Lib084Component, Lib000Component],
  template: `<section><h2>lib-094: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-084 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib094Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
