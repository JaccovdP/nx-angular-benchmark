import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib057Component, total as total057 } from '@bench/lib-057';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-067-record-000', value: 68, offset: 0 },
  { name: 'lib-067-record-001', value: 136, offset: 1 },
  { name: 'lib-067-record-002', value: 204, offset: 2 },
  { name: 'lib-067-record-003', value: 272, offset: 3 },
  { name: 'lib-067-record-004', value: 340, offset: 4 },
  { name: 'lib-067-record-005', value: 408, offset: 5 },
  { name: 'lib-067-record-006', value: 476, offset: 6 },
  { name: 'lib-067-record-007', value: 544, offset: 7 },
  { name: 'lib-067-record-008', value: 612, offset: 8 },
  { name: 'lib-067-record-009', value: 680, offset: 9 },
  { name: 'lib-067-record-010', value: 748, offset: 10 },
  { name: 'lib-067-record-011', value: 816, offset: 11 },
  { name: 'lib-067-record-012', value: 884, offset: 12 },
  { name: 'lib-067-record-013', value: 952, offset: 13 },
  { name: 'lib-067-record-014', value: 1020, offset: 14 },
  { name: 'lib-067-record-015', value: 1088, offset: 15 },
  { name: 'lib-067-record-016', value: 1156, offset: 16 },
  { name: 'lib-067-record-017', value: 1224, offset: 17 },
  { name: 'lib-067-record-018', value: 1292, offset: 18 },
  { name: 'lib-067-record-019', value: 1360, offset: 19 },
  { name: 'lib-067-record-020', value: 1428, offset: 20 },
  { name: 'lib-067-record-021', value: 1496, offset: 21 },
  { name: 'lib-067-record-022', value: 1564, offset: 22 },
  { name: 'lib-067-record-023', value: 1632, offset: 23 },
  { name: 'lib-067-record-024', value: 1700, offset: 24 },
  { name: 'lib-067-record-025', value: 1768, offset: 25 },
  { name: 'lib-067-record-026', value: 1836, offset: 26 },
  { name: 'lib-067-record-027', value: 1904, offset: 27 },
  { name: 'lib-067-record-028', value: 1972, offset: 28 },
  { name: 'lib-067-record-029', value: 2040, offset: 29 },
  { name: 'lib-067-record-030', value: 2108, offset: 30 },
  { name: 'lib-067-record-031', value: 2176, offset: 31 },
  { name: 'lib-067-record-032', value: 2244, offset: 32 },
  { name: 'lib-067-record-033', value: 2312, offset: 33 },
  { name: 'lib-067-record-034', value: 2380, offset: 34 },
  { name: 'lib-067-record-035', value: 2448, offset: 35 },
  { name: 'lib-067-record-036', value: 2516, offset: 36 },
  { name: 'lib-067-record-037', value: 2584, offset: 37 },
  { name: 'lib-067-record-038', value: 2652, offset: 38 },
  { name: 'lib-067-record-039', value: 2720, offset: 39 },
  { name: 'lib-067-record-040', value: 2788, offset: 40 },
  { name: 'lib-067-record-041', value: 2856, offset: 41 },
  { name: 'lib-067-record-042', value: 2924, offset: 42 },
  { name: 'lib-067-record-043', value: 2992, offset: 43 },
  { name: 'lib-067-record-044', value: 3060, offset: 44 },
  { name: 'lib-067-record-045', value: 3128, offset: 45 },
  { name: 'lib-067-record-046', value: 3196, offset: 46 },
  { name: 'lib-067-record-047', value: 3264, offset: 47 },
  { name: 'lib-067-record-048', value: 3332, offset: 48 },
  { name: 'lib-067-record-049', value: 3400, offset: 49 },
  { name: 'lib-067-record-050', value: 3468, offset: 50 },
  { name: 'lib-067-record-051', value: 3536, offset: 51 },
  { name: 'lib-067-record-052', value: 3604, offset: 52 },
  { name: 'lib-067-record-053', value: 3672, offset: 53 },
  { name: 'lib-067-record-054', value: 3740, offset: 54 },
  { name: 'lib-067-record-055', value: 3808, offset: 55 },
  { name: 'lib-067-record-056', value: 3876, offset: 56 },
  { name: 'lib-067-record-057', value: 3944, offset: 57 },
  { name: 'lib-067-record-058', value: 4012, offset: 58 },
  { name: 'lib-067-record-059', value: 4080, offset: 59 },
  { name: 'lib-067-record-060', value: 4148, offset: 60 },
  { name: 'lib-067-record-061', value: 4216, offset: 61 },
  { name: 'lib-067-record-062', value: 4284, offset: 62 },
  { name: 'lib-067-record-063', value: 4352, offset: 63 },
];
export const total = sumBy(rows, 'value') + total057 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-067',
  standalone: true,
  imports: [Lib057Component, Lib000Component],
  template: `<section><h2>lib-067: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-057 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib067Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
