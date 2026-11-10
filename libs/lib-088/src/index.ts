import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib078Component, total as total078 } from '@bench/lib-078';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-088-record-000', value: 89, offset: 0 },
  { name: 'lib-088-record-001', value: 178, offset: 1 },
  { name: 'lib-088-record-002', value: 267, offset: 2 },
  { name: 'lib-088-record-003', value: 356, offset: 3 },
  { name: 'lib-088-record-004', value: 445, offset: 4 },
  { name: 'lib-088-record-005', value: 534, offset: 5 },
  { name: 'lib-088-record-006', value: 623, offset: 6 },
  { name: 'lib-088-record-007', value: 712, offset: 7 },
  { name: 'lib-088-record-008', value: 801, offset: 8 },
  { name: 'lib-088-record-009', value: 890, offset: 9 },
  { name: 'lib-088-record-010', value: 979, offset: 10 },
  { name: 'lib-088-record-011', value: 1068, offset: 11 },
  { name: 'lib-088-record-012', value: 1157, offset: 12 },
  { name: 'lib-088-record-013', value: 1246, offset: 13 },
  { name: 'lib-088-record-014', value: 1335, offset: 14 },
  { name: 'lib-088-record-015', value: 1424, offset: 15 },
  { name: 'lib-088-record-016', value: 1513, offset: 16 },
  { name: 'lib-088-record-017', value: 1602, offset: 17 },
  { name: 'lib-088-record-018', value: 1691, offset: 18 },
  { name: 'lib-088-record-019', value: 1780, offset: 19 },
  { name: 'lib-088-record-020', value: 1869, offset: 20 },
  { name: 'lib-088-record-021', value: 1958, offset: 21 },
  { name: 'lib-088-record-022', value: 2047, offset: 22 },
  { name: 'lib-088-record-023', value: 2136, offset: 23 },
  { name: 'lib-088-record-024', value: 2225, offset: 24 },
  { name: 'lib-088-record-025', value: 2314, offset: 25 },
  { name: 'lib-088-record-026', value: 2403, offset: 26 },
  { name: 'lib-088-record-027', value: 2492, offset: 27 },
  { name: 'lib-088-record-028', value: 2581, offset: 28 },
  { name: 'lib-088-record-029', value: 2670, offset: 29 },
  { name: 'lib-088-record-030', value: 2759, offset: 30 },
  { name: 'lib-088-record-031', value: 2848, offset: 31 },
  { name: 'lib-088-record-032', value: 2937, offset: 32 },
  { name: 'lib-088-record-033', value: 3026, offset: 33 },
  { name: 'lib-088-record-034', value: 3115, offset: 34 },
  { name: 'lib-088-record-035', value: 3204, offset: 35 },
  { name: 'lib-088-record-036', value: 3293, offset: 36 },
  { name: 'lib-088-record-037', value: 3382, offset: 37 },
  { name: 'lib-088-record-038', value: 3471, offset: 38 },
  { name: 'lib-088-record-039', value: 3560, offset: 39 },
  { name: 'lib-088-record-040', value: 3649, offset: 40 },
  { name: 'lib-088-record-041', value: 3738, offset: 41 },
  { name: 'lib-088-record-042', value: 3827, offset: 42 },
  { name: 'lib-088-record-043', value: 3916, offset: 43 },
  { name: 'lib-088-record-044', value: 4005, offset: 44 },
  { name: 'lib-088-record-045', value: 4094, offset: 45 },
  { name: 'lib-088-record-046', value: 4183, offset: 46 },
  { name: 'lib-088-record-047', value: 4272, offset: 47 },
  { name: 'lib-088-record-048', value: 4361, offset: 48 },
  { name: 'lib-088-record-049', value: 4450, offset: 49 },
  { name: 'lib-088-record-050', value: 4539, offset: 50 },
  { name: 'lib-088-record-051', value: 4628, offset: 51 },
  { name: 'lib-088-record-052', value: 4717, offset: 52 },
  { name: 'lib-088-record-053', value: 4806, offset: 53 },
  { name: 'lib-088-record-054', value: 4895, offset: 54 },
  { name: 'lib-088-record-055', value: 4984, offset: 55 },
  { name: 'lib-088-record-056', value: 5073, offset: 56 },
  { name: 'lib-088-record-057', value: 5162, offset: 57 },
  { name: 'lib-088-record-058', value: 5251, offset: 58 },
  { name: 'lib-088-record-059', value: 5340, offset: 59 },
  { name: 'lib-088-record-060', value: 5429, offset: 60 },
  { name: 'lib-088-record-061', value: 5518, offset: 61 },
  { name: 'lib-088-record-062', value: 5607, offset: 62 },
  { name: 'lib-088-record-063', value: 5696, offset: 63 },
];
export const total = sumBy(rows, 'value') + total078 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-088',
  standalone: true,
  imports: [Lib078Component, Lib000Component],
  template: `<section><h2>lib-088: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-078 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib088Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
