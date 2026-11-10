import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';


const rows = [
  { name: 'lib-007-record-000', value: 8, offset: 0 },
  { name: 'lib-007-record-001', value: 16, offset: 1 },
  { name: 'lib-007-record-002', value: 24, offset: 2 },
  { name: 'lib-007-record-003', value: 32, offset: 3 },
  { name: 'lib-007-record-004', value: 40, offset: 4 },
  { name: 'lib-007-record-005', value: 48, offset: 5 },
  { name: 'lib-007-record-006', value: 56, offset: 6 },
  { name: 'lib-007-record-007', value: 64, offset: 7 },
  { name: 'lib-007-record-008', value: 72, offset: 8 },
  { name: 'lib-007-record-009', value: 80, offset: 9 },
  { name: 'lib-007-record-010', value: 88, offset: 10 },
  { name: 'lib-007-record-011', value: 96, offset: 11 },
  { name: 'lib-007-record-012', value: 104, offset: 12 },
  { name: 'lib-007-record-013', value: 112, offset: 13 },
  { name: 'lib-007-record-014', value: 120, offset: 14 },
  { name: 'lib-007-record-015', value: 128, offset: 15 },
  { name: 'lib-007-record-016', value: 136, offset: 16 },
  { name: 'lib-007-record-017', value: 144, offset: 17 },
  { name: 'lib-007-record-018', value: 152, offset: 18 },
  { name: 'lib-007-record-019', value: 160, offset: 19 },
  { name: 'lib-007-record-020', value: 168, offset: 20 },
  { name: 'lib-007-record-021', value: 176, offset: 21 },
  { name: 'lib-007-record-022', value: 184, offset: 22 },
  { name: 'lib-007-record-023', value: 192, offset: 23 },
  { name: 'lib-007-record-024', value: 200, offset: 24 },
  { name: 'lib-007-record-025', value: 208, offset: 25 },
  { name: 'lib-007-record-026', value: 216, offset: 26 },
  { name: 'lib-007-record-027', value: 224, offset: 27 },
  { name: 'lib-007-record-028', value: 232, offset: 28 },
  { name: 'lib-007-record-029', value: 240, offset: 29 },
  { name: 'lib-007-record-030', value: 248, offset: 30 },
  { name: 'lib-007-record-031', value: 256, offset: 31 },
  { name: 'lib-007-record-032', value: 264, offset: 32 },
  { name: 'lib-007-record-033', value: 272, offset: 33 },
  { name: 'lib-007-record-034', value: 280, offset: 34 },
  { name: 'lib-007-record-035', value: 288, offset: 35 },
  { name: 'lib-007-record-036', value: 296, offset: 36 },
  { name: 'lib-007-record-037', value: 304, offset: 37 },
  { name: 'lib-007-record-038', value: 312, offset: 38 },
  { name: 'lib-007-record-039', value: 320, offset: 39 },
  { name: 'lib-007-record-040', value: 328, offset: 40 },
  { name: 'lib-007-record-041', value: 336, offset: 41 },
  { name: 'lib-007-record-042', value: 344, offset: 42 },
  { name: 'lib-007-record-043', value: 352, offset: 43 },
  { name: 'lib-007-record-044', value: 360, offset: 44 },
  { name: 'lib-007-record-045', value: 368, offset: 45 },
  { name: 'lib-007-record-046', value: 376, offset: 46 },
  { name: 'lib-007-record-047', value: 384, offset: 47 },
  { name: 'lib-007-record-048', value: 392, offset: 48 },
  { name: 'lib-007-record-049', value: 400, offset: 49 },
  { name: 'lib-007-record-050', value: 408, offset: 50 },
  { name: 'lib-007-record-051', value: 416, offset: 51 },
  { name: 'lib-007-record-052', value: 424, offset: 52 },
  { name: 'lib-007-record-053', value: 432, offset: 53 },
  { name: 'lib-007-record-054', value: 440, offset: 54 },
  { name: 'lib-007-record-055', value: 448, offset: 55 },
  { name: 'lib-007-record-056', value: 456, offset: 56 },
  { name: 'lib-007-record-057', value: 464, offset: 57 },
  { name: 'lib-007-record-058', value: 472, offset: 58 },
  { name: 'lib-007-record-059', value: 480, offset: 59 },
  { name: 'lib-007-record-060', value: 488, offset: 60 },
  { name: 'lib-007-record-061', value: 496, offset: 61 },
  { name: 'lib-007-record-062', value: 504, offset: 62 },
  { name: 'lib-007-record-063', value: 512, offset: 63 },
];
export const total = sumBy(rows, 'value');
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-007',
  standalone: true,
  imports: [],
  template: `<section><h2>lib-007: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib007Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
