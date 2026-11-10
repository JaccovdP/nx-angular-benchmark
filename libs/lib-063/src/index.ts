import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib053Component, total as total053 } from '@bench/lib-053';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-063-record-000', value: 64, offset: 0 },
  { name: 'lib-063-record-001', value: 128, offset: 1 },
  { name: 'lib-063-record-002', value: 192, offset: 2 },
  { name: 'lib-063-record-003', value: 256, offset: 3 },
  { name: 'lib-063-record-004', value: 320, offset: 4 },
  { name: 'lib-063-record-005', value: 384, offset: 5 },
  { name: 'lib-063-record-006', value: 448, offset: 6 },
  { name: 'lib-063-record-007', value: 512, offset: 7 },
  { name: 'lib-063-record-008', value: 576, offset: 8 },
  { name: 'lib-063-record-009', value: 640, offset: 9 },
  { name: 'lib-063-record-010', value: 704, offset: 10 },
  { name: 'lib-063-record-011', value: 768, offset: 11 },
  { name: 'lib-063-record-012', value: 832, offset: 12 },
  { name: 'lib-063-record-013', value: 896, offset: 13 },
  { name: 'lib-063-record-014', value: 960, offset: 14 },
  { name: 'lib-063-record-015', value: 1024, offset: 15 },
  { name: 'lib-063-record-016', value: 1088, offset: 16 },
  { name: 'lib-063-record-017', value: 1152, offset: 17 },
  { name: 'lib-063-record-018', value: 1216, offset: 18 },
  { name: 'lib-063-record-019', value: 1280, offset: 19 },
  { name: 'lib-063-record-020', value: 1344, offset: 20 },
  { name: 'lib-063-record-021', value: 1408, offset: 21 },
  { name: 'lib-063-record-022', value: 1472, offset: 22 },
  { name: 'lib-063-record-023', value: 1536, offset: 23 },
  { name: 'lib-063-record-024', value: 1600, offset: 24 },
  { name: 'lib-063-record-025', value: 1664, offset: 25 },
  { name: 'lib-063-record-026', value: 1728, offset: 26 },
  { name: 'lib-063-record-027', value: 1792, offset: 27 },
  { name: 'lib-063-record-028', value: 1856, offset: 28 },
  { name: 'lib-063-record-029', value: 1920, offset: 29 },
  { name: 'lib-063-record-030', value: 1984, offset: 30 },
  { name: 'lib-063-record-031', value: 2048, offset: 31 },
  { name: 'lib-063-record-032', value: 2112, offset: 32 },
  { name: 'lib-063-record-033', value: 2176, offset: 33 },
  { name: 'lib-063-record-034', value: 2240, offset: 34 },
  { name: 'lib-063-record-035', value: 2304, offset: 35 },
  { name: 'lib-063-record-036', value: 2368, offset: 36 },
  { name: 'lib-063-record-037', value: 2432, offset: 37 },
  { name: 'lib-063-record-038', value: 2496, offset: 38 },
  { name: 'lib-063-record-039', value: 2560, offset: 39 },
  { name: 'lib-063-record-040', value: 2624, offset: 40 },
  { name: 'lib-063-record-041', value: 2688, offset: 41 },
  { name: 'lib-063-record-042', value: 2752, offset: 42 },
  { name: 'lib-063-record-043', value: 2816, offset: 43 },
  { name: 'lib-063-record-044', value: 2880, offset: 44 },
  { name: 'lib-063-record-045', value: 2944, offset: 45 },
  { name: 'lib-063-record-046', value: 3008, offset: 46 },
  { name: 'lib-063-record-047', value: 3072, offset: 47 },
  { name: 'lib-063-record-048', value: 3136, offset: 48 },
  { name: 'lib-063-record-049', value: 3200, offset: 49 },
  { name: 'lib-063-record-050', value: 3264, offset: 50 },
  { name: 'lib-063-record-051', value: 3328, offset: 51 },
  { name: 'lib-063-record-052', value: 3392, offset: 52 },
  { name: 'lib-063-record-053', value: 3456, offset: 53 },
  { name: 'lib-063-record-054', value: 3520, offset: 54 },
  { name: 'lib-063-record-055', value: 3584, offset: 55 },
  { name: 'lib-063-record-056', value: 3648, offset: 56 },
  { name: 'lib-063-record-057', value: 3712, offset: 57 },
  { name: 'lib-063-record-058', value: 3776, offset: 58 },
  { name: 'lib-063-record-059', value: 3840, offset: 59 },
  { name: 'lib-063-record-060', value: 3904, offset: 60 },
  { name: 'lib-063-record-061', value: 3968, offset: 61 },
  { name: 'lib-063-record-062', value: 4032, offset: 62 },
  { name: 'lib-063-record-063', value: 4096, offset: 63 },
];
export const total = sumBy(rows, 'value') + total053 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-063',
  standalone: true,
  imports: [Lib053Component, Lib000Component],
  template: `<section><h2>lib-063: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-053 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib063Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
