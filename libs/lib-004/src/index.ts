import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';


const rows = [
  { name: 'lib-004-record-000', value: 5, offset: 0 },
  { name: 'lib-004-record-001', value: 10, offset: 1 },
  { name: 'lib-004-record-002', value: 15, offset: 2 },
  { name: 'lib-004-record-003', value: 20, offset: 3 },
  { name: 'lib-004-record-004', value: 25, offset: 4 },
  { name: 'lib-004-record-005', value: 30, offset: 5 },
  { name: 'lib-004-record-006', value: 35, offset: 6 },
  { name: 'lib-004-record-007', value: 40, offset: 7 },
  { name: 'lib-004-record-008', value: 45, offset: 8 },
  { name: 'lib-004-record-009', value: 50, offset: 9 },
  { name: 'lib-004-record-010', value: 55, offset: 10 },
  { name: 'lib-004-record-011', value: 60, offset: 11 },
  { name: 'lib-004-record-012', value: 65, offset: 12 },
  { name: 'lib-004-record-013', value: 70, offset: 13 },
  { name: 'lib-004-record-014', value: 75, offset: 14 },
  { name: 'lib-004-record-015', value: 80, offset: 15 },
  { name: 'lib-004-record-016', value: 85, offset: 16 },
  { name: 'lib-004-record-017', value: 90, offset: 17 },
  { name: 'lib-004-record-018', value: 95, offset: 18 },
  { name: 'lib-004-record-019', value: 100, offset: 19 },
  { name: 'lib-004-record-020', value: 105, offset: 20 },
  { name: 'lib-004-record-021', value: 110, offset: 21 },
  { name: 'lib-004-record-022', value: 115, offset: 22 },
  { name: 'lib-004-record-023', value: 120, offset: 23 },
  { name: 'lib-004-record-024', value: 125, offset: 24 },
  { name: 'lib-004-record-025', value: 130, offset: 25 },
  { name: 'lib-004-record-026', value: 135, offset: 26 },
  { name: 'lib-004-record-027', value: 140, offset: 27 },
  { name: 'lib-004-record-028', value: 145, offset: 28 },
  { name: 'lib-004-record-029', value: 150, offset: 29 },
  { name: 'lib-004-record-030', value: 155, offset: 30 },
  { name: 'lib-004-record-031', value: 160, offset: 31 },
  { name: 'lib-004-record-032', value: 165, offset: 32 },
  { name: 'lib-004-record-033', value: 170, offset: 33 },
  { name: 'lib-004-record-034', value: 175, offset: 34 },
  { name: 'lib-004-record-035', value: 180, offset: 35 },
  { name: 'lib-004-record-036', value: 185, offset: 36 },
  { name: 'lib-004-record-037', value: 190, offset: 37 },
  { name: 'lib-004-record-038', value: 195, offset: 38 },
  { name: 'lib-004-record-039', value: 200, offset: 39 },
  { name: 'lib-004-record-040', value: 205, offset: 40 },
  { name: 'lib-004-record-041', value: 210, offset: 41 },
  { name: 'lib-004-record-042', value: 215, offset: 42 },
  { name: 'lib-004-record-043', value: 220, offset: 43 },
  { name: 'lib-004-record-044', value: 225, offset: 44 },
  { name: 'lib-004-record-045', value: 230, offset: 45 },
  { name: 'lib-004-record-046', value: 235, offset: 46 },
  { name: 'lib-004-record-047', value: 240, offset: 47 },
  { name: 'lib-004-record-048', value: 245, offset: 48 },
  { name: 'lib-004-record-049', value: 250, offset: 49 },
  { name: 'lib-004-record-050', value: 255, offset: 50 },
  { name: 'lib-004-record-051', value: 260, offset: 51 },
  { name: 'lib-004-record-052', value: 265, offset: 52 },
  { name: 'lib-004-record-053', value: 270, offset: 53 },
  { name: 'lib-004-record-054', value: 275, offset: 54 },
  { name: 'lib-004-record-055', value: 280, offset: 55 },
  { name: 'lib-004-record-056', value: 285, offset: 56 },
  { name: 'lib-004-record-057', value: 290, offset: 57 },
  { name: 'lib-004-record-058', value: 295, offset: 58 },
  { name: 'lib-004-record-059', value: 300, offset: 59 },
  { name: 'lib-004-record-060', value: 305, offset: 60 },
  { name: 'lib-004-record-061', value: 310, offset: 61 },
  { name: 'lib-004-record-062', value: 315, offset: 62 },
  { name: 'lib-004-record-063', value: 320, offset: 63 },
];
export const total = sumBy(rows, 'value');
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-004',
  standalone: true,
  imports: [],
  template: `<section><h2>lib-004: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib004Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
