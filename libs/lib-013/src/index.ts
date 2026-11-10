import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib003Component, total as total003 } from '@bench/lib-003';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-013-record-000', value: 14, offset: 0 },
  { name: 'lib-013-record-001', value: 28, offset: 1 },
  { name: 'lib-013-record-002', value: 42, offset: 2 },
  { name: 'lib-013-record-003', value: 56, offset: 3 },
  { name: 'lib-013-record-004', value: 70, offset: 4 },
  { name: 'lib-013-record-005', value: 84, offset: 5 },
  { name: 'lib-013-record-006', value: 98, offset: 6 },
  { name: 'lib-013-record-007', value: 112, offset: 7 },
  { name: 'lib-013-record-008', value: 126, offset: 8 },
  { name: 'lib-013-record-009', value: 140, offset: 9 },
  { name: 'lib-013-record-010', value: 154, offset: 10 },
  { name: 'lib-013-record-011', value: 168, offset: 11 },
  { name: 'lib-013-record-012', value: 182, offset: 12 },
  { name: 'lib-013-record-013', value: 196, offset: 13 },
  { name: 'lib-013-record-014', value: 210, offset: 14 },
  { name: 'lib-013-record-015', value: 224, offset: 15 },
  { name: 'lib-013-record-016', value: 238, offset: 16 },
  { name: 'lib-013-record-017', value: 252, offset: 17 },
  { name: 'lib-013-record-018', value: 266, offset: 18 },
  { name: 'lib-013-record-019', value: 280, offset: 19 },
  { name: 'lib-013-record-020', value: 294, offset: 20 },
  { name: 'lib-013-record-021', value: 308, offset: 21 },
  { name: 'lib-013-record-022', value: 322, offset: 22 },
  { name: 'lib-013-record-023', value: 336, offset: 23 },
  { name: 'lib-013-record-024', value: 350, offset: 24 },
  { name: 'lib-013-record-025', value: 364, offset: 25 },
  { name: 'lib-013-record-026', value: 378, offset: 26 },
  { name: 'lib-013-record-027', value: 392, offset: 27 },
  { name: 'lib-013-record-028', value: 406, offset: 28 },
  { name: 'lib-013-record-029', value: 420, offset: 29 },
  { name: 'lib-013-record-030', value: 434, offset: 30 },
  { name: 'lib-013-record-031', value: 448, offset: 31 },
  { name: 'lib-013-record-032', value: 462, offset: 32 },
  { name: 'lib-013-record-033', value: 476, offset: 33 },
  { name: 'lib-013-record-034', value: 490, offset: 34 },
  { name: 'lib-013-record-035', value: 504, offset: 35 },
  { name: 'lib-013-record-036', value: 518, offset: 36 },
  { name: 'lib-013-record-037', value: 532, offset: 37 },
  { name: 'lib-013-record-038', value: 546, offset: 38 },
  { name: 'lib-013-record-039', value: 560, offset: 39 },
  { name: 'lib-013-record-040', value: 574, offset: 40 },
  { name: 'lib-013-record-041', value: 588, offset: 41 },
  { name: 'lib-013-record-042', value: 602, offset: 42 },
  { name: 'lib-013-record-043', value: 616, offset: 43 },
  { name: 'lib-013-record-044', value: 630, offset: 44 },
  { name: 'lib-013-record-045', value: 644, offset: 45 },
  { name: 'lib-013-record-046', value: 658, offset: 46 },
  { name: 'lib-013-record-047', value: 672, offset: 47 },
  { name: 'lib-013-record-048', value: 686, offset: 48 },
  { name: 'lib-013-record-049', value: 700, offset: 49 },
  { name: 'lib-013-record-050', value: 714, offset: 50 },
  { name: 'lib-013-record-051', value: 728, offset: 51 },
  { name: 'lib-013-record-052', value: 742, offset: 52 },
  { name: 'lib-013-record-053', value: 756, offset: 53 },
  { name: 'lib-013-record-054', value: 770, offset: 54 },
  { name: 'lib-013-record-055', value: 784, offset: 55 },
  { name: 'lib-013-record-056', value: 798, offset: 56 },
  { name: 'lib-013-record-057', value: 812, offset: 57 },
  { name: 'lib-013-record-058', value: 826, offset: 58 },
  { name: 'lib-013-record-059', value: 840, offset: 59 },
  { name: 'lib-013-record-060', value: 854, offset: 60 },
  { name: 'lib-013-record-061', value: 868, offset: 61 },
  { name: 'lib-013-record-062', value: 882, offset: 62 },
  { name: 'lib-013-record-063', value: 896, offset: 63 },
];
export const total = sumBy(rows, 'value') + total003 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-013',
  standalone: true,
  imports: [Lib003Component, Lib000Component],
  template: `<section><h2>lib-013: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-003 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib013Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
