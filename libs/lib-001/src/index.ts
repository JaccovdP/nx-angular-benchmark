import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';


const rows = [
  { name: 'lib-001-record-000', value: 2, offset: 0 },
  { name: 'lib-001-record-001', value: 4, offset: 1 },
  { name: 'lib-001-record-002', value: 6, offset: 2 },
  { name: 'lib-001-record-003', value: 8, offset: 3 },
  { name: 'lib-001-record-004', value: 10, offset: 4 },
  { name: 'lib-001-record-005', value: 12, offset: 5 },
  { name: 'lib-001-record-006', value: 14, offset: 6 },
  { name: 'lib-001-record-007', value: 16, offset: 7 },
  { name: 'lib-001-record-008', value: 18, offset: 8 },
  { name: 'lib-001-record-009', value: 20, offset: 9 },
  { name: 'lib-001-record-010', value: 22, offset: 10 },
  { name: 'lib-001-record-011', value: 24, offset: 11 },
  { name: 'lib-001-record-012', value: 26, offset: 12 },
  { name: 'lib-001-record-013', value: 28, offset: 13 },
  { name: 'lib-001-record-014', value: 30, offset: 14 },
  { name: 'lib-001-record-015', value: 32, offset: 15 },
  { name: 'lib-001-record-016', value: 34, offset: 16 },
  { name: 'lib-001-record-017', value: 36, offset: 17 },
  { name: 'lib-001-record-018', value: 38, offset: 18 },
  { name: 'lib-001-record-019', value: 40, offset: 19 },
  { name: 'lib-001-record-020', value: 42, offset: 20 },
  { name: 'lib-001-record-021', value: 44, offset: 21 },
  { name: 'lib-001-record-022', value: 46, offset: 22 },
  { name: 'lib-001-record-023', value: 48, offset: 23 },
  { name: 'lib-001-record-024', value: 50, offset: 24 },
  { name: 'lib-001-record-025', value: 52, offset: 25 },
  { name: 'lib-001-record-026', value: 54, offset: 26 },
  { name: 'lib-001-record-027', value: 56, offset: 27 },
  { name: 'lib-001-record-028', value: 58, offset: 28 },
  { name: 'lib-001-record-029', value: 60, offset: 29 },
  { name: 'lib-001-record-030', value: 62, offset: 30 },
  { name: 'lib-001-record-031', value: 64, offset: 31 },
  { name: 'lib-001-record-032', value: 66, offset: 32 },
  { name: 'lib-001-record-033', value: 68, offset: 33 },
  { name: 'lib-001-record-034', value: 70, offset: 34 },
  { name: 'lib-001-record-035', value: 72, offset: 35 },
  { name: 'lib-001-record-036', value: 74, offset: 36 },
  { name: 'lib-001-record-037', value: 76, offset: 37 },
  { name: 'lib-001-record-038', value: 78, offset: 38 },
  { name: 'lib-001-record-039', value: 80, offset: 39 },
  { name: 'lib-001-record-040', value: 82, offset: 40 },
  { name: 'lib-001-record-041', value: 84, offset: 41 },
  { name: 'lib-001-record-042', value: 86, offset: 42 },
  { name: 'lib-001-record-043', value: 88, offset: 43 },
  { name: 'lib-001-record-044', value: 90, offset: 44 },
  { name: 'lib-001-record-045', value: 92, offset: 45 },
  { name: 'lib-001-record-046', value: 94, offset: 46 },
  { name: 'lib-001-record-047', value: 96, offset: 47 },
  { name: 'lib-001-record-048', value: 98, offset: 48 },
  { name: 'lib-001-record-049', value: 100, offset: 49 },
  { name: 'lib-001-record-050', value: 102, offset: 50 },
  { name: 'lib-001-record-051', value: 104, offset: 51 },
  { name: 'lib-001-record-052', value: 106, offset: 52 },
  { name: 'lib-001-record-053', value: 108, offset: 53 },
  { name: 'lib-001-record-054', value: 110, offset: 54 },
  { name: 'lib-001-record-055', value: 112, offset: 55 },
  { name: 'lib-001-record-056', value: 114, offset: 56 },
  { name: 'lib-001-record-057', value: 116, offset: 57 },
  { name: 'lib-001-record-058', value: 118, offset: 58 },
  { name: 'lib-001-record-059', value: 120, offset: 59 },
  { name: 'lib-001-record-060', value: 122, offset: 60 },
  { name: 'lib-001-record-061', value: 124, offset: 61 },
  { name: 'lib-001-record-062', value: 126, offset: 62 },
  { name: 'lib-001-record-063', value: 128, offset: 63 },
];
export const total = sumBy(rows, 'value');
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-001',
  standalone: true,
  imports: [],
  template: `<section><h2>lib-001: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib001Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
