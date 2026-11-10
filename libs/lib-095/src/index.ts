import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib085Component, total as total085 } from '@bench/lib-085';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-095-record-000', value: 96, offset: 0 },
  { name: 'lib-095-record-001', value: 192, offset: 1 },
  { name: 'lib-095-record-002', value: 288, offset: 2 },
  { name: 'lib-095-record-003', value: 384, offset: 3 },
  { name: 'lib-095-record-004', value: 480, offset: 4 },
  { name: 'lib-095-record-005', value: 576, offset: 5 },
  { name: 'lib-095-record-006', value: 672, offset: 6 },
  { name: 'lib-095-record-007', value: 768, offset: 7 },
  { name: 'lib-095-record-008', value: 864, offset: 8 },
  { name: 'lib-095-record-009', value: 960, offset: 9 },
  { name: 'lib-095-record-010', value: 1056, offset: 10 },
  { name: 'lib-095-record-011', value: 1152, offset: 11 },
  { name: 'lib-095-record-012', value: 1248, offset: 12 },
  { name: 'lib-095-record-013', value: 1344, offset: 13 },
  { name: 'lib-095-record-014', value: 1440, offset: 14 },
  { name: 'lib-095-record-015', value: 1536, offset: 15 },
  { name: 'lib-095-record-016', value: 1632, offset: 16 },
  { name: 'lib-095-record-017', value: 1728, offset: 17 },
  { name: 'lib-095-record-018', value: 1824, offset: 18 },
  { name: 'lib-095-record-019', value: 1920, offset: 19 },
  { name: 'lib-095-record-020', value: 2016, offset: 20 },
  { name: 'lib-095-record-021', value: 2112, offset: 21 },
  { name: 'lib-095-record-022', value: 2208, offset: 22 },
  { name: 'lib-095-record-023', value: 2304, offset: 23 },
  { name: 'lib-095-record-024', value: 2400, offset: 24 },
  { name: 'lib-095-record-025', value: 2496, offset: 25 },
  { name: 'lib-095-record-026', value: 2592, offset: 26 },
  { name: 'lib-095-record-027', value: 2688, offset: 27 },
  { name: 'lib-095-record-028', value: 2784, offset: 28 },
  { name: 'lib-095-record-029', value: 2880, offset: 29 },
  { name: 'lib-095-record-030', value: 2976, offset: 30 },
  { name: 'lib-095-record-031', value: 3072, offset: 31 },
  { name: 'lib-095-record-032', value: 3168, offset: 32 },
  { name: 'lib-095-record-033', value: 3264, offset: 33 },
  { name: 'lib-095-record-034', value: 3360, offset: 34 },
  { name: 'lib-095-record-035', value: 3456, offset: 35 },
  { name: 'lib-095-record-036', value: 3552, offset: 36 },
  { name: 'lib-095-record-037', value: 3648, offset: 37 },
  { name: 'lib-095-record-038', value: 3744, offset: 38 },
  { name: 'lib-095-record-039', value: 3840, offset: 39 },
  { name: 'lib-095-record-040', value: 3936, offset: 40 },
  { name: 'lib-095-record-041', value: 4032, offset: 41 },
  { name: 'lib-095-record-042', value: 4128, offset: 42 },
  { name: 'lib-095-record-043', value: 4224, offset: 43 },
  { name: 'lib-095-record-044', value: 4320, offset: 44 },
  { name: 'lib-095-record-045', value: 4416, offset: 45 },
  { name: 'lib-095-record-046', value: 4512, offset: 46 },
  { name: 'lib-095-record-047', value: 4608, offset: 47 },
  { name: 'lib-095-record-048', value: 4704, offset: 48 },
  { name: 'lib-095-record-049', value: 4800, offset: 49 },
  { name: 'lib-095-record-050', value: 4896, offset: 50 },
  { name: 'lib-095-record-051', value: 4992, offset: 51 },
  { name: 'lib-095-record-052', value: 5088, offset: 52 },
  { name: 'lib-095-record-053', value: 5184, offset: 53 },
  { name: 'lib-095-record-054', value: 5280, offset: 54 },
  { name: 'lib-095-record-055', value: 5376, offset: 55 },
  { name: 'lib-095-record-056', value: 5472, offset: 56 },
  { name: 'lib-095-record-057', value: 5568, offset: 57 },
  { name: 'lib-095-record-058', value: 5664, offset: 58 },
  { name: 'lib-095-record-059', value: 5760, offset: 59 },
  { name: 'lib-095-record-060', value: 5856, offset: 60 },
  { name: 'lib-095-record-061', value: 5952, offset: 61 },
  { name: 'lib-095-record-062', value: 6048, offset: 62 },
  { name: 'lib-095-record-063', value: 6144, offset: 63 },
];
export const total = sumBy(rows, 'value') + total085 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-095',
  standalone: true,
  imports: [Lib085Component, Lib000Component],
  template: `<section><h2>lib-095: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-085 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib095Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
