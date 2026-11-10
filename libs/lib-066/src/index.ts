import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib056Component, total as total056 } from '@bench/lib-056';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-066-record-000', value: 67, offset: 0 },
  { name: 'lib-066-record-001', value: 134, offset: 1 },
  { name: 'lib-066-record-002', value: 201, offset: 2 },
  { name: 'lib-066-record-003', value: 268, offset: 3 },
  { name: 'lib-066-record-004', value: 335, offset: 4 },
  { name: 'lib-066-record-005', value: 402, offset: 5 },
  { name: 'lib-066-record-006', value: 469, offset: 6 },
  { name: 'lib-066-record-007', value: 536, offset: 7 },
  { name: 'lib-066-record-008', value: 603, offset: 8 },
  { name: 'lib-066-record-009', value: 670, offset: 9 },
  { name: 'lib-066-record-010', value: 737, offset: 10 },
  { name: 'lib-066-record-011', value: 804, offset: 11 },
  { name: 'lib-066-record-012', value: 871, offset: 12 },
  { name: 'lib-066-record-013', value: 938, offset: 13 },
  { name: 'lib-066-record-014', value: 1005, offset: 14 },
  { name: 'lib-066-record-015', value: 1072, offset: 15 },
  { name: 'lib-066-record-016', value: 1139, offset: 16 },
  { name: 'lib-066-record-017', value: 1206, offset: 17 },
  { name: 'lib-066-record-018', value: 1273, offset: 18 },
  { name: 'lib-066-record-019', value: 1340, offset: 19 },
  { name: 'lib-066-record-020', value: 1407, offset: 20 },
  { name: 'lib-066-record-021', value: 1474, offset: 21 },
  { name: 'lib-066-record-022', value: 1541, offset: 22 },
  { name: 'lib-066-record-023', value: 1608, offset: 23 },
  { name: 'lib-066-record-024', value: 1675, offset: 24 },
  { name: 'lib-066-record-025', value: 1742, offset: 25 },
  { name: 'lib-066-record-026', value: 1809, offset: 26 },
  { name: 'lib-066-record-027', value: 1876, offset: 27 },
  { name: 'lib-066-record-028', value: 1943, offset: 28 },
  { name: 'lib-066-record-029', value: 2010, offset: 29 },
  { name: 'lib-066-record-030', value: 2077, offset: 30 },
  { name: 'lib-066-record-031', value: 2144, offset: 31 },
  { name: 'lib-066-record-032', value: 2211, offset: 32 },
  { name: 'lib-066-record-033', value: 2278, offset: 33 },
  { name: 'lib-066-record-034', value: 2345, offset: 34 },
  { name: 'lib-066-record-035', value: 2412, offset: 35 },
  { name: 'lib-066-record-036', value: 2479, offset: 36 },
  { name: 'lib-066-record-037', value: 2546, offset: 37 },
  { name: 'lib-066-record-038', value: 2613, offset: 38 },
  { name: 'lib-066-record-039', value: 2680, offset: 39 },
  { name: 'lib-066-record-040', value: 2747, offset: 40 },
  { name: 'lib-066-record-041', value: 2814, offset: 41 },
  { name: 'lib-066-record-042', value: 2881, offset: 42 },
  { name: 'lib-066-record-043', value: 2948, offset: 43 },
  { name: 'lib-066-record-044', value: 3015, offset: 44 },
  { name: 'lib-066-record-045', value: 3082, offset: 45 },
  { name: 'lib-066-record-046', value: 3149, offset: 46 },
  { name: 'lib-066-record-047', value: 3216, offset: 47 },
  { name: 'lib-066-record-048', value: 3283, offset: 48 },
  { name: 'lib-066-record-049', value: 3350, offset: 49 },
  { name: 'lib-066-record-050', value: 3417, offset: 50 },
  { name: 'lib-066-record-051', value: 3484, offset: 51 },
  { name: 'lib-066-record-052', value: 3551, offset: 52 },
  { name: 'lib-066-record-053', value: 3618, offset: 53 },
  { name: 'lib-066-record-054', value: 3685, offset: 54 },
  { name: 'lib-066-record-055', value: 3752, offset: 55 },
  { name: 'lib-066-record-056', value: 3819, offset: 56 },
  { name: 'lib-066-record-057', value: 3886, offset: 57 },
  { name: 'lib-066-record-058', value: 3953, offset: 58 },
  { name: 'lib-066-record-059', value: 4020, offset: 59 },
  { name: 'lib-066-record-060', value: 4087, offset: 60 },
  { name: 'lib-066-record-061', value: 4154, offset: 61 },
  { name: 'lib-066-record-062', value: 4221, offset: 62 },
  { name: 'lib-066-record-063', value: 4288, offset: 63 },
];
export const total = sumBy(rows, 'value') + total056 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-066',
  standalone: true,
  imports: [Lib056Component, Lib000Component],
  template: `<section><h2>lib-066: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-056 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib066Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
