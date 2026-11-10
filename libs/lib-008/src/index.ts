import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';


const rows = [
  { name: 'lib-008-record-000', value: 9, offset: 0 },
  { name: 'lib-008-record-001', value: 18, offset: 1 },
  { name: 'lib-008-record-002', value: 27, offset: 2 },
  { name: 'lib-008-record-003', value: 36, offset: 3 },
  { name: 'lib-008-record-004', value: 45, offset: 4 },
  { name: 'lib-008-record-005', value: 54, offset: 5 },
  { name: 'lib-008-record-006', value: 63, offset: 6 },
  { name: 'lib-008-record-007', value: 72, offset: 7 },
  { name: 'lib-008-record-008', value: 81, offset: 8 },
  { name: 'lib-008-record-009', value: 90, offset: 9 },
  { name: 'lib-008-record-010', value: 99, offset: 10 },
  { name: 'lib-008-record-011', value: 108, offset: 11 },
  { name: 'lib-008-record-012', value: 117, offset: 12 },
  { name: 'lib-008-record-013', value: 126, offset: 13 },
  { name: 'lib-008-record-014', value: 135, offset: 14 },
  { name: 'lib-008-record-015', value: 144, offset: 15 },
  { name: 'lib-008-record-016', value: 153, offset: 16 },
  { name: 'lib-008-record-017', value: 162, offset: 17 },
  { name: 'lib-008-record-018', value: 171, offset: 18 },
  { name: 'lib-008-record-019', value: 180, offset: 19 },
  { name: 'lib-008-record-020', value: 189, offset: 20 },
  { name: 'lib-008-record-021', value: 198, offset: 21 },
  { name: 'lib-008-record-022', value: 207, offset: 22 },
  { name: 'lib-008-record-023', value: 216, offset: 23 },
  { name: 'lib-008-record-024', value: 225, offset: 24 },
  { name: 'lib-008-record-025', value: 234, offset: 25 },
  { name: 'lib-008-record-026', value: 243, offset: 26 },
  { name: 'lib-008-record-027', value: 252, offset: 27 },
  { name: 'lib-008-record-028', value: 261, offset: 28 },
  { name: 'lib-008-record-029', value: 270, offset: 29 },
  { name: 'lib-008-record-030', value: 279, offset: 30 },
  { name: 'lib-008-record-031', value: 288, offset: 31 },
  { name: 'lib-008-record-032', value: 297, offset: 32 },
  { name: 'lib-008-record-033', value: 306, offset: 33 },
  { name: 'lib-008-record-034', value: 315, offset: 34 },
  { name: 'lib-008-record-035', value: 324, offset: 35 },
  { name: 'lib-008-record-036', value: 333, offset: 36 },
  { name: 'lib-008-record-037', value: 342, offset: 37 },
  { name: 'lib-008-record-038', value: 351, offset: 38 },
  { name: 'lib-008-record-039', value: 360, offset: 39 },
  { name: 'lib-008-record-040', value: 369, offset: 40 },
  { name: 'lib-008-record-041', value: 378, offset: 41 },
  { name: 'lib-008-record-042', value: 387, offset: 42 },
  { name: 'lib-008-record-043', value: 396, offset: 43 },
  { name: 'lib-008-record-044', value: 405, offset: 44 },
  { name: 'lib-008-record-045', value: 414, offset: 45 },
  { name: 'lib-008-record-046', value: 423, offset: 46 },
  { name: 'lib-008-record-047', value: 432, offset: 47 },
  { name: 'lib-008-record-048', value: 441, offset: 48 },
  { name: 'lib-008-record-049', value: 450, offset: 49 },
  { name: 'lib-008-record-050', value: 459, offset: 50 },
  { name: 'lib-008-record-051', value: 468, offset: 51 },
  { name: 'lib-008-record-052', value: 477, offset: 52 },
  { name: 'lib-008-record-053', value: 486, offset: 53 },
  { name: 'lib-008-record-054', value: 495, offset: 54 },
  { name: 'lib-008-record-055', value: 504, offset: 55 },
  { name: 'lib-008-record-056', value: 513, offset: 56 },
  { name: 'lib-008-record-057', value: 522, offset: 57 },
  { name: 'lib-008-record-058', value: 531, offset: 58 },
  { name: 'lib-008-record-059', value: 540, offset: 59 },
  { name: 'lib-008-record-060', value: 549, offset: 60 },
  { name: 'lib-008-record-061', value: 558, offset: 61 },
  { name: 'lib-008-record-062', value: 567, offset: 62 },
  { name: 'lib-008-record-063', value: 576, offset: 63 },
];
export const total = sumBy(rows, 'value');
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-008',
  standalone: true,
  imports: [],
  template: `<section><h2>lib-008: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib008Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
