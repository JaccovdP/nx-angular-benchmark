import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib087Component, total as total087 } from '@bench/lib-087';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-097-record-000', value: 98, offset: 0 },
  { name: 'lib-097-record-001', value: 196, offset: 1 },
  { name: 'lib-097-record-002', value: 294, offset: 2 },
  { name: 'lib-097-record-003', value: 392, offset: 3 },
  { name: 'lib-097-record-004', value: 490, offset: 4 },
  { name: 'lib-097-record-005', value: 588, offset: 5 },
  { name: 'lib-097-record-006', value: 686, offset: 6 },
  { name: 'lib-097-record-007', value: 784, offset: 7 },
  { name: 'lib-097-record-008', value: 882, offset: 8 },
  { name: 'lib-097-record-009', value: 980, offset: 9 },
  { name: 'lib-097-record-010', value: 1078, offset: 10 },
  { name: 'lib-097-record-011', value: 1176, offset: 11 },
  { name: 'lib-097-record-012', value: 1274, offset: 12 },
  { name: 'lib-097-record-013', value: 1372, offset: 13 },
  { name: 'lib-097-record-014', value: 1470, offset: 14 },
  { name: 'lib-097-record-015', value: 1568, offset: 15 },
  { name: 'lib-097-record-016', value: 1666, offset: 16 },
  { name: 'lib-097-record-017', value: 1764, offset: 17 },
  { name: 'lib-097-record-018', value: 1862, offset: 18 },
  { name: 'lib-097-record-019', value: 1960, offset: 19 },
  { name: 'lib-097-record-020', value: 2058, offset: 20 },
  { name: 'lib-097-record-021', value: 2156, offset: 21 },
  { name: 'lib-097-record-022', value: 2254, offset: 22 },
  { name: 'lib-097-record-023', value: 2352, offset: 23 },
  { name: 'lib-097-record-024', value: 2450, offset: 24 },
  { name: 'lib-097-record-025', value: 2548, offset: 25 },
  { name: 'lib-097-record-026', value: 2646, offset: 26 },
  { name: 'lib-097-record-027', value: 2744, offset: 27 },
  { name: 'lib-097-record-028', value: 2842, offset: 28 },
  { name: 'lib-097-record-029', value: 2940, offset: 29 },
  { name: 'lib-097-record-030', value: 3038, offset: 30 },
  { name: 'lib-097-record-031', value: 3136, offset: 31 },
  { name: 'lib-097-record-032', value: 3234, offset: 32 },
  { name: 'lib-097-record-033', value: 3332, offset: 33 },
  { name: 'lib-097-record-034', value: 3430, offset: 34 },
  { name: 'lib-097-record-035', value: 3528, offset: 35 },
  { name: 'lib-097-record-036', value: 3626, offset: 36 },
  { name: 'lib-097-record-037', value: 3724, offset: 37 },
  { name: 'lib-097-record-038', value: 3822, offset: 38 },
  { name: 'lib-097-record-039', value: 3920, offset: 39 },
  { name: 'lib-097-record-040', value: 4018, offset: 40 },
  { name: 'lib-097-record-041', value: 4116, offset: 41 },
  { name: 'lib-097-record-042', value: 4214, offset: 42 },
  { name: 'lib-097-record-043', value: 4312, offset: 43 },
  { name: 'lib-097-record-044', value: 4410, offset: 44 },
  { name: 'lib-097-record-045', value: 4508, offset: 45 },
  { name: 'lib-097-record-046', value: 4606, offset: 46 },
  { name: 'lib-097-record-047', value: 4704, offset: 47 },
  { name: 'lib-097-record-048', value: 4802, offset: 48 },
  { name: 'lib-097-record-049', value: 4900, offset: 49 },
  { name: 'lib-097-record-050', value: 4998, offset: 50 },
  { name: 'lib-097-record-051', value: 5096, offset: 51 },
  { name: 'lib-097-record-052', value: 5194, offset: 52 },
  { name: 'lib-097-record-053', value: 5292, offset: 53 },
  { name: 'lib-097-record-054', value: 5390, offset: 54 },
  { name: 'lib-097-record-055', value: 5488, offset: 55 },
  { name: 'lib-097-record-056', value: 5586, offset: 56 },
  { name: 'lib-097-record-057', value: 5684, offset: 57 },
  { name: 'lib-097-record-058', value: 5782, offset: 58 },
  { name: 'lib-097-record-059', value: 5880, offset: 59 },
  { name: 'lib-097-record-060', value: 5978, offset: 60 },
  { name: 'lib-097-record-061', value: 6076, offset: 61 },
  { name: 'lib-097-record-062', value: 6174, offset: 62 },
  { name: 'lib-097-record-063', value: 6272, offset: 63 },
];
export const total = sumBy(rows, 'value') + total087 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-097',
  standalone: true,
  imports: [Lib087Component, Lib000Component],
  template: `<section><h2>lib-097: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-087 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib097Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
