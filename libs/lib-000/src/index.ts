import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';


const rows = [
  { name: 'lib-000-record-000', value: 1, offset: 0 },
  { name: 'lib-000-record-001', value: 2, offset: 1 },
  { name: 'lib-000-record-002', value: 3, offset: 2 },
  { name: 'lib-000-record-003', value: 4, offset: 3 },
  { name: 'lib-000-record-004', value: 5, offset: 4 },
  { name: 'lib-000-record-005', value: 6, offset: 5 },
  { name: 'lib-000-record-006', value: 7, offset: 6 },
  { name: 'lib-000-record-007', value: 8, offset: 7 },
  { name: 'lib-000-record-008', value: 9, offset: 8 },
  { name: 'lib-000-record-009', value: 10, offset: 9 },
  { name: 'lib-000-record-010', value: 11, offset: 10 },
  { name: 'lib-000-record-011', value: 12, offset: 11 },
  { name: 'lib-000-record-012', value: 13, offset: 12 },
  { name: 'lib-000-record-013', value: 14, offset: 13 },
  { name: 'lib-000-record-014', value: 15, offset: 14 },
  { name: 'lib-000-record-015', value: 16, offset: 15 },
  { name: 'lib-000-record-016', value: 17, offset: 16 },
  { name: 'lib-000-record-017', value: 18, offset: 17 },
  { name: 'lib-000-record-018', value: 19, offset: 18 },
  { name: 'lib-000-record-019', value: 20, offset: 19 },
  { name: 'lib-000-record-020', value: 21, offset: 20 },
  { name: 'lib-000-record-021', value: 22, offset: 21 },
  { name: 'lib-000-record-022', value: 23, offset: 22 },
  { name: 'lib-000-record-023', value: 24, offset: 23 },
  { name: 'lib-000-record-024', value: 25, offset: 24 },
  { name: 'lib-000-record-025', value: 26, offset: 25 },
  { name: 'lib-000-record-026', value: 27, offset: 26 },
  { name: 'lib-000-record-027', value: 28, offset: 27 },
  { name: 'lib-000-record-028', value: 29, offset: 28 },
  { name: 'lib-000-record-029', value: 30, offset: 29 },
  { name: 'lib-000-record-030', value: 31, offset: 30 },
  { name: 'lib-000-record-031', value: 32, offset: 31 },
  { name: 'lib-000-record-032', value: 33, offset: 32 },
  { name: 'lib-000-record-033', value: 34, offset: 33 },
  { name: 'lib-000-record-034', value: 35, offset: 34 },
  { name: 'lib-000-record-035', value: 36, offset: 35 },
  { name: 'lib-000-record-036', value: 37, offset: 36 },
  { name: 'lib-000-record-037', value: 38, offset: 37 },
  { name: 'lib-000-record-038', value: 39, offset: 38 },
  { name: 'lib-000-record-039', value: 40, offset: 39 },
  { name: 'lib-000-record-040', value: 41, offset: 40 },
  { name: 'lib-000-record-041', value: 42, offset: 41 },
  { name: 'lib-000-record-042', value: 43, offset: 42 },
  { name: 'lib-000-record-043', value: 44, offset: 43 },
  { name: 'lib-000-record-044', value: 45, offset: 44 },
  { name: 'lib-000-record-045', value: 46, offset: 45 },
  { name: 'lib-000-record-046', value: 47, offset: 46 },
  { name: 'lib-000-record-047', value: 48, offset: 47 },
  { name: 'lib-000-record-048', value: 49, offset: 48 },
  { name: 'lib-000-record-049', value: 50, offset: 49 },
  { name: 'lib-000-record-050', value: 51, offset: 50 },
  { name: 'lib-000-record-051', value: 52, offset: 51 },
  { name: 'lib-000-record-052', value: 53, offset: 52 },
  { name: 'lib-000-record-053', value: 54, offset: 53 },
  { name: 'lib-000-record-054', value: 55, offset: 54 },
  { name: 'lib-000-record-055', value: 56, offset: 55 },
  { name: 'lib-000-record-056', value: 57, offset: 56 },
  { name: 'lib-000-record-057', value: 58, offset: 57 },
  { name: 'lib-000-record-058', value: 59, offset: 58 },
  { name: 'lib-000-record-059', value: 60, offset: 59 },
  { name: 'lib-000-record-060', value: 61, offset: 60 },
  { name: 'lib-000-record-061', value: 62, offset: 61 },
  { name: 'lib-000-record-062', value: 63, offset: 62 },
  { name: 'lib-000-record-063', value: 64, offset: 63 },
];
export const total = sumBy(rows, 'value');
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-000',
  standalone: true,
  imports: [],
  template: `<section><h2>lib-000: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib000Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
