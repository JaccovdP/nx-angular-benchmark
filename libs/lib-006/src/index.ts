import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';


const rows = [
  { name: 'lib-006-record-000', value: 7, offset: 0 },
  { name: 'lib-006-record-001', value: 14, offset: 1 },
  { name: 'lib-006-record-002', value: 21, offset: 2 },
  { name: 'lib-006-record-003', value: 28, offset: 3 },
  { name: 'lib-006-record-004', value: 35, offset: 4 },
  { name: 'lib-006-record-005', value: 42, offset: 5 },
  { name: 'lib-006-record-006', value: 49, offset: 6 },
  { name: 'lib-006-record-007', value: 56, offset: 7 },
  { name: 'lib-006-record-008', value: 63, offset: 8 },
  { name: 'lib-006-record-009', value: 70, offset: 9 },
  { name: 'lib-006-record-010', value: 77, offset: 10 },
  { name: 'lib-006-record-011', value: 84, offset: 11 },
  { name: 'lib-006-record-012', value: 91, offset: 12 },
  { name: 'lib-006-record-013', value: 98, offset: 13 },
  { name: 'lib-006-record-014', value: 105, offset: 14 },
  { name: 'lib-006-record-015', value: 112, offset: 15 },
  { name: 'lib-006-record-016', value: 119, offset: 16 },
  { name: 'lib-006-record-017', value: 126, offset: 17 },
  { name: 'lib-006-record-018', value: 133, offset: 18 },
  { name: 'lib-006-record-019', value: 140, offset: 19 },
  { name: 'lib-006-record-020', value: 147, offset: 20 },
  { name: 'lib-006-record-021', value: 154, offset: 21 },
  { name: 'lib-006-record-022', value: 161, offset: 22 },
  { name: 'lib-006-record-023', value: 168, offset: 23 },
  { name: 'lib-006-record-024', value: 175, offset: 24 },
  { name: 'lib-006-record-025', value: 182, offset: 25 },
  { name: 'lib-006-record-026', value: 189, offset: 26 },
  { name: 'lib-006-record-027', value: 196, offset: 27 },
  { name: 'lib-006-record-028', value: 203, offset: 28 },
  { name: 'lib-006-record-029', value: 210, offset: 29 },
  { name: 'lib-006-record-030', value: 217, offset: 30 },
  { name: 'lib-006-record-031', value: 224, offset: 31 },
  { name: 'lib-006-record-032', value: 231, offset: 32 },
  { name: 'lib-006-record-033', value: 238, offset: 33 },
  { name: 'lib-006-record-034', value: 245, offset: 34 },
  { name: 'lib-006-record-035', value: 252, offset: 35 },
  { name: 'lib-006-record-036', value: 259, offset: 36 },
  { name: 'lib-006-record-037', value: 266, offset: 37 },
  { name: 'lib-006-record-038', value: 273, offset: 38 },
  { name: 'lib-006-record-039', value: 280, offset: 39 },
  { name: 'lib-006-record-040', value: 287, offset: 40 },
  { name: 'lib-006-record-041', value: 294, offset: 41 },
  { name: 'lib-006-record-042', value: 301, offset: 42 },
  { name: 'lib-006-record-043', value: 308, offset: 43 },
  { name: 'lib-006-record-044', value: 315, offset: 44 },
  { name: 'lib-006-record-045', value: 322, offset: 45 },
  { name: 'lib-006-record-046', value: 329, offset: 46 },
  { name: 'lib-006-record-047', value: 336, offset: 47 },
  { name: 'lib-006-record-048', value: 343, offset: 48 },
  { name: 'lib-006-record-049', value: 350, offset: 49 },
  { name: 'lib-006-record-050', value: 357, offset: 50 },
  { name: 'lib-006-record-051', value: 364, offset: 51 },
  { name: 'lib-006-record-052', value: 371, offset: 52 },
  { name: 'lib-006-record-053', value: 378, offset: 53 },
  { name: 'lib-006-record-054', value: 385, offset: 54 },
  { name: 'lib-006-record-055', value: 392, offset: 55 },
  { name: 'lib-006-record-056', value: 399, offset: 56 },
  { name: 'lib-006-record-057', value: 406, offset: 57 },
  { name: 'lib-006-record-058', value: 413, offset: 58 },
  { name: 'lib-006-record-059', value: 420, offset: 59 },
  { name: 'lib-006-record-060', value: 427, offset: 60 },
  { name: 'lib-006-record-061', value: 434, offset: 61 },
  { name: 'lib-006-record-062', value: 441, offset: 62 },
  { name: 'lib-006-record-063', value: 448, offset: 63 },
];
export const total = sumBy(rows, 'value');
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-006',
  standalone: true,
  imports: [],
  template: `<section><h2>lib-006: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib006Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
