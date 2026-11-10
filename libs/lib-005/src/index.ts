import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';


const rows = [
  { name: 'lib-005-record-000', value: 6, offset: 0 },
  { name: 'lib-005-record-001', value: 12, offset: 1 },
  { name: 'lib-005-record-002', value: 18, offset: 2 },
  { name: 'lib-005-record-003', value: 24, offset: 3 },
  { name: 'lib-005-record-004', value: 30, offset: 4 },
  { name: 'lib-005-record-005', value: 36, offset: 5 },
  { name: 'lib-005-record-006', value: 42, offset: 6 },
  { name: 'lib-005-record-007', value: 48, offset: 7 },
  { name: 'lib-005-record-008', value: 54, offset: 8 },
  { name: 'lib-005-record-009', value: 60, offset: 9 },
  { name: 'lib-005-record-010', value: 66, offset: 10 },
  { name: 'lib-005-record-011', value: 72, offset: 11 },
  { name: 'lib-005-record-012', value: 78, offset: 12 },
  { name: 'lib-005-record-013', value: 84, offset: 13 },
  { name: 'lib-005-record-014', value: 90, offset: 14 },
  { name: 'lib-005-record-015', value: 96, offset: 15 },
  { name: 'lib-005-record-016', value: 102, offset: 16 },
  { name: 'lib-005-record-017', value: 108, offset: 17 },
  { name: 'lib-005-record-018', value: 114, offset: 18 },
  { name: 'lib-005-record-019', value: 120, offset: 19 },
  { name: 'lib-005-record-020', value: 126, offset: 20 },
  { name: 'lib-005-record-021', value: 132, offset: 21 },
  { name: 'lib-005-record-022', value: 138, offset: 22 },
  { name: 'lib-005-record-023', value: 144, offset: 23 },
  { name: 'lib-005-record-024', value: 150, offset: 24 },
  { name: 'lib-005-record-025', value: 156, offset: 25 },
  { name: 'lib-005-record-026', value: 162, offset: 26 },
  { name: 'lib-005-record-027', value: 168, offset: 27 },
  { name: 'lib-005-record-028', value: 174, offset: 28 },
  { name: 'lib-005-record-029', value: 180, offset: 29 },
  { name: 'lib-005-record-030', value: 186, offset: 30 },
  { name: 'lib-005-record-031', value: 192, offset: 31 },
  { name: 'lib-005-record-032', value: 198, offset: 32 },
  { name: 'lib-005-record-033', value: 204, offset: 33 },
  { name: 'lib-005-record-034', value: 210, offset: 34 },
  { name: 'lib-005-record-035', value: 216, offset: 35 },
  { name: 'lib-005-record-036', value: 222, offset: 36 },
  { name: 'lib-005-record-037', value: 228, offset: 37 },
  { name: 'lib-005-record-038', value: 234, offset: 38 },
  { name: 'lib-005-record-039', value: 240, offset: 39 },
  { name: 'lib-005-record-040', value: 246, offset: 40 },
  { name: 'lib-005-record-041', value: 252, offset: 41 },
  { name: 'lib-005-record-042', value: 258, offset: 42 },
  { name: 'lib-005-record-043', value: 264, offset: 43 },
  { name: 'lib-005-record-044', value: 270, offset: 44 },
  { name: 'lib-005-record-045', value: 276, offset: 45 },
  { name: 'lib-005-record-046', value: 282, offset: 46 },
  { name: 'lib-005-record-047', value: 288, offset: 47 },
  { name: 'lib-005-record-048', value: 294, offset: 48 },
  { name: 'lib-005-record-049', value: 300, offset: 49 },
  { name: 'lib-005-record-050', value: 306, offset: 50 },
  { name: 'lib-005-record-051', value: 312, offset: 51 },
  { name: 'lib-005-record-052', value: 318, offset: 52 },
  { name: 'lib-005-record-053', value: 324, offset: 53 },
  { name: 'lib-005-record-054', value: 330, offset: 54 },
  { name: 'lib-005-record-055', value: 336, offset: 55 },
  { name: 'lib-005-record-056', value: 342, offset: 56 },
  { name: 'lib-005-record-057', value: 348, offset: 57 },
  { name: 'lib-005-record-058', value: 354, offset: 58 },
  { name: 'lib-005-record-059', value: 360, offset: 59 },
  { name: 'lib-005-record-060', value: 366, offset: 60 },
  { name: 'lib-005-record-061', value: 372, offset: 61 },
  { name: 'lib-005-record-062', value: 378, offset: 62 },
  { name: 'lib-005-record-063', value: 384, offset: 63 },
];
export const total = sumBy(rows, 'value');
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-005',
  standalone: true,
  imports: [],
  template: `<section><h2>lib-005: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib005Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
