import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-010-record-000', value: 11, offset: 0 },
  { name: 'lib-010-record-001', value: 22, offset: 1 },
  { name: 'lib-010-record-002', value: 33, offset: 2 },
  { name: 'lib-010-record-003', value: 44, offset: 3 },
  { name: 'lib-010-record-004', value: 55, offset: 4 },
  { name: 'lib-010-record-005', value: 66, offset: 5 },
  { name: 'lib-010-record-006', value: 77, offset: 6 },
  { name: 'lib-010-record-007', value: 88, offset: 7 },
  { name: 'lib-010-record-008', value: 99, offset: 8 },
  { name: 'lib-010-record-009', value: 110, offset: 9 },
  { name: 'lib-010-record-010', value: 121, offset: 10 },
  { name: 'lib-010-record-011', value: 132, offset: 11 },
  { name: 'lib-010-record-012', value: 143, offset: 12 },
  { name: 'lib-010-record-013', value: 154, offset: 13 },
  { name: 'lib-010-record-014', value: 165, offset: 14 },
  { name: 'lib-010-record-015', value: 176, offset: 15 },
  { name: 'lib-010-record-016', value: 187, offset: 16 },
  { name: 'lib-010-record-017', value: 198, offset: 17 },
  { name: 'lib-010-record-018', value: 209, offset: 18 },
  { name: 'lib-010-record-019', value: 220, offset: 19 },
  { name: 'lib-010-record-020', value: 231, offset: 20 },
  { name: 'lib-010-record-021', value: 242, offset: 21 },
  { name: 'lib-010-record-022', value: 253, offset: 22 },
  { name: 'lib-010-record-023', value: 264, offset: 23 },
  { name: 'lib-010-record-024', value: 275, offset: 24 },
  { name: 'lib-010-record-025', value: 286, offset: 25 },
  { name: 'lib-010-record-026', value: 297, offset: 26 },
  { name: 'lib-010-record-027', value: 308, offset: 27 },
  { name: 'lib-010-record-028', value: 319, offset: 28 },
  { name: 'lib-010-record-029', value: 330, offset: 29 },
  { name: 'lib-010-record-030', value: 341, offset: 30 },
  { name: 'lib-010-record-031', value: 352, offset: 31 },
  { name: 'lib-010-record-032', value: 363, offset: 32 },
  { name: 'lib-010-record-033', value: 374, offset: 33 },
  { name: 'lib-010-record-034', value: 385, offset: 34 },
  { name: 'lib-010-record-035', value: 396, offset: 35 },
  { name: 'lib-010-record-036', value: 407, offset: 36 },
  { name: 'lib-010-record-037', value: 418, offset: 37 },
  { name: 'lib-010-record-038', value: 429, offset: 38 },
  { name: 'lib-010-record-039', value: 440, offset: 39 },
  { name: 'lib-010-record-040', value: 451, offset: 40 },
  { name: 'lib-010-record-041', value: 462, offset: 41 },
  { name: 'lib-010-record-042', value: 473, offset: 42 },
  { name: 'lib-010-record-043', value: 484, offset: 43 },
  { name: 'lib-010-record-044', value: 495, offset: 44 },
  { name: 'lib-010-record-045', value: 506, offset: 45 },
  { name: 'lib-010-record-046', value: 517, offset: 46 },
  { name: 'lib-010-record-047', value: 528, offset: 47 },
  { name: 'lib-010-record-048', value: 539, offset: 48 },
  { name: 'lib-010-record-049', value: 550, offset: 49 },
  { name: 'lib-010-record-050', value: 561, offset: 50 },
  { name: 'lib-010-record-051', value: 572, offset: 51 },
  { name: 'lib-010-record-052', value: 583, offset: 52 },
  { name: 'lib-010-record-053', value: 594, offset: 53 },
  { name: 'lib-010-record-054', value: 605, offset: 54 },
  { name: 'lib-010-record-055', value: 616, offset: 55 },
  { name: 'lib-010-record-056', value: 627, offset: 56 },
  { name: 'lib-010-record-057', value: 638, offset: 57 },
  { name: 'lib-010-record-058', value: 649, offset: 58 },
  { name: 'lib-010-record-059', value: 660, offset: 59 },
  { name: 'lib-010-record-060', value: 671, offset: 60 },
  { name: 'lib-010-record-061', value: 682, offset: 61 },
  { name: 'lib-010-record-062', value: 693, offset: 62 },
  { name: 'lib-010-record-063', value: 704, offset: 63 },
];
export const total = sumBy(rows, 'value') + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-010',
  standalone: true,
  imports: [Lib000Component],
  template: `<section><h2>lib-010: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-000 />
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib010Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
