import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';


const rows = [
  { name: 'lib-002-record-000', value: 3, offset: 0 },
  { name: 'lib-002-record-001', value: 6, offset: 1 },
  { name: 'lib-002-record-002', value: 9, offset: 2 },
  { name: 'lib-002-record-003', value: 12, offset: 3 },
  { name: 'lib-002-record-004', value: 15, offset: 4 },
  { name: 'lib-002-record-005', value: 18, offset: 5 },
  { name: 'lib-002-record-006', value: 21, offset: 6 },
  { name: 'lib-002-record-007', value: 24, offset: 7 },
  { name: 'lib-002-record-008', value: 27, offset: 8 },
  { name: 'lib-002-record-009', value: 30, offset: 9 },
  { name: 'lib-002-record-010', value: 33, offset: 10 },
  { name: 'lib-002-record-011', value: 36, offset: 11 },
  { name: 'lib-002-record-012', value: 39, offset: 12 },
  { name: 'lib-002-record-013', value: 42, offset: 13 },
  { name: 'lib-002-record-014', value: 45, offset: 14 },
  { name: 'lib-002-record-015', value: 48, offset: 15 },
  { name: 'lib-002-record-016', value: 51, offset: 16 },
  { name: 'lib-002-record-017', value: 54, offset: 17 },
  { name: 'lib-002-record-018', value: 57, offset: 18 },
  { name: 'lib-002-record-019', value: 60, offset: 19 },
  { name: 'lib-002-record-020', value: 63, offset: 20 },
  { name: 'lib-002-record-021', value: 66, offset: 21 },
  { name: 'lib-002-record-022', value: 69, offset: 22 },
  { name: 'lib-002-record-023', value: 72, offset: 23 },
  { name: 'lib-002-record-024', value: 75, offset: 24 },
  { name: 'lib-002-record-025', value: 78, offset: 25 },
  { name: 'lib-002-record-026', value: 81, offset: 26 },
  { name: 'lib-002-record-027', value: 84, offset: 27 },
  { name: 'lib-002-record-028', value: 87, offset: 28 },
  { name: 'lib-002-record-029', value: 90, offset: 29 },
  { name: 'lib-002-record-030', value: 93, offset: 30 },
  { name: 'lib-002-record-031', value: 96, offset: 31 },
  { name: 'lib-002-record-032', value: 99, offset: 32 },
  { name: 'lib-002-record-033', value: 102, offset: 33 },
  { name: 'lib-002-record-034', value: 105, offset: 34 },
  { name: 'lib-002-record-035', value: 108, offset: 35 },
  { name: 'lib-002-record-036', value: 111, offset: 36 },
  { name: 'lib-002-record-037', value: 114, offset: 37 },
  { name: 'lib-002-record-038', value: 117, offset: 38 },
  { name: 'lib-002-record-039', value: 120, offset: 39 },
  { name: 'lib-002-record-040', value: 123, offset: 40 },
  { name: 'lib-002-record-041', value: 126, offset: 41 },
  { name: 'lib-002-record-042', value: 129, offset: 42 },
  { name: 'lib-002-record-043', value: 132, offset: 43 },
  { name: 'lib-002-record-044', value: 135, offset: 44 },
  { name: 'lib-002-record-045', value: 138, offset: 45 },
  { name: 'lib-002-record-046', value: 141, offset: 46 },
  { name: 'lib-002-record-047', value: 144, offset: 47 },
  { name: 'lib-002-record-048', value: 147, offset: 48 },
  { name: 'lib-002-record-049', value: 150, offset: 49 },
  { name: 'lib-002-record-050', value: 153, offset: 50 },
  { name: 'lib-002-record-051', value: 156, offset: 51 },
  { name: 'lib-002-record-052', value: 159, offset: 52 },
  { name: 'lib-002-record-053', value: 162, offset: 53 },
  { name: 'lib-002-record-054', value: 165, offset: 54 },
  { name: 'lib-002-record-055', value: 168, offset: 55 },
  { name: 'lib-002-record-056', value: 171, offset: 56 },
  { name: 'lib-002-record-057', value: 174, offset: 57 },
  { name: 'lib-002-record-058', value: 177, offset: 58 },
  { name: 'lib-002-record-059', value: 180, offset: 59 },
  { name: 'lib-002-record-060', value: 183, offset: 60 },
  { name: 'lib-002-record-061', value: 186, offset: 61 },
  { name: 'lib-002-record-062', value: 189, offset: 62 },
  { name: 'lib-002-record-063', value: 192, offset: 63 },
];
export const total = sumBy(rows, 'value');
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-002',
  standalone: true,
  imports: [],
  template: `<section><h2>lib-002: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib002Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
