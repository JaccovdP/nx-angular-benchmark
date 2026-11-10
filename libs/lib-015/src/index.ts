import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib005Component, total as total005 } from '@bench/lib-005';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-015-record-000', value: 16, offset: 0 },
  { name: 'lib-015-record-001', value: 32, offset: 1 },
  { name: 'lib-015-record-002', value: 48, offset: 2 },
  { name: 'lib-015-record-003', value: 64, offset: 3 },
  { name: 'lib-015-record-004', value: 80, offset: 4 },
  { name: 'lib-015-record-005', value: 96, offset: 5 },
  { name: 'lib-015-record-006', value: 112, offset: 6 },
  { name: 'lib-015-record-007', value: 128, offset: 7 },
  { name: 'lib-015-record-008', value: 144, offset: 8 },
  { name: 'lib-015-record-009', value: 160, offset: 9 },
  { name: 'lib-015-record-010', value: 176, offset: 10 },
  { name: 'lib-015-record-011', value: 192, offset: 11 },
  { name: 'lib-015-record-012', value: 208, offset: 12 },
  { name: 'lib-015-record-013', value: 224, offset: 13 },
  { name: 'lib-015-record-014', value: 240, offset: 14 },
  { name: 'lib-015-record-015', value: 256, offset: 15 },
  { name: 'lib-015-record-016', value: 272, offset: 16 },
  { name: 'lib-015-record-017', value: 288, offset: 17 },
  { name: 'lib-015-record-018', value: 304, offset: 18 },
  { name: 'lib-015-record-019', value: 320, offset: 19 },
  { name: 'lib-015-record-020', value: 336, offset: 20 },
  { name: 'lib-015-record-021', value: 352, offset: 21 },
  { name: 'lib-015-record-022', value: 368, offset: 22 },
  { name: 'lib-015-record-023', value: 384, offset: 23 },
  { name: 'lib-015-record-024', value: 400, offset: 24 },
  { name: 'lib-015-record-025', value: 416, offset: 25 },
  { name: 'lib-015-record-026', value: 432, offset: 26 },
  { name: 'lib-015-record-027', value: 448, offset: 27 },
  { name: 'lib-015-record-028', value: 464, offset: 28 },
  { name: 'lib-015-record-029', value: 480, offset: 29 },
  { name: 'lib-015-record-030', value: 496, offset: 30 },
  { name: 'lib-015-record-031', value: 512, offset: 31 },
  { name: 'lib-015-record-032', value: 528, offset: 32 },
  { name: 'lib-015-record-033', value: 544, offset: 33 },
  { name: 'lib-015-record-034', value: 560, offset: 34 },
  { name: 'lib-015-record-035', value: 576, offset: 35 },
  { name: 'lib-015-record-036', value: 592, offset: 36 },
  { name: 'lib-015-record-037', value: 608, offset: 37 },
  { name: 'lib-015-record-038', value: 624, offset: 38 },
  { name: 'lib-015-record-039', value: 640, offset: 39 },
  { name: 'lib-015-record-040', value: 656, offset: 40 },
  { name: 'lib-015-record-041', value: 672, offset: 41 },
  { name: 'lib-015-record-042', value: 688, offset: 42 },
  { name: 'lib-015-record-043', value: 704, offset: 43 },
  { name: 'lib-015-record-044', value: 720, offset: 44 },
  { name: 'lib-015-record-045', value: 736, offset: 45 },
  { name: 'lib-015-record-046', value: 752, offset: 46 },
  { name: 'lib-015-record-047', value: 768, offset: 47 },
  { name: 'lib-015-record-048', value: 784, offset: 48 },
  { name: 'lib-015-record-049', value: 800, offset: 49 },
  { name: 'lib-015-record-050', value: 816, offset: 50 },
  { name: 'lib-015-record-051', value: 832, offset: 51 },
  { name: 'lib-015-record-052', value: 848, offset: 52 },
  { name: 'lib-015-record-053', value: 864, offset: 53 },
  { name: 'lib-015-record-054', value: 880, offset: 54 },
  { name: 'lib-015-record-055', value: 896, offset: 55 },
  { name: 'lib-015-record-056', value: 912, offset: 56 },
  { name: 'lib-015-record-057', value: 928, offset: 57 },
  { name: 'lib-015-record-058', value: 944, offset: 58 },
  { name: 'lib-015-record-059', value: 960, offset: 59 },
  { name: 'lib-015-record-060', value: 976, offset: 60 },
  { name: 'lib-015-record-061', value: 992, offset: 61 },
  { name: 'lib-015-record-062', value: 1008, offset: 62 },
  { name: 'lib-015-record-063', value: 1024, offset: 63 },
];
export const total = sumBy(rows, 'value') + total005 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-015',
  standalone: true,
  imports: [Lib005Component, Lib000Component],
  template: `<section><h2>lib-015: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-005 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib015Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
