import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib076Component, total as total076 } from '@bench/lib-076';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-086-record-000', value: 87, offset: 0 },
  { name: 'lib-086-record-001', value: 174, offset: 1 },
  { name: 'lib-086-record-002', value: 261, offset: 2 },
  { name: 'lib-086-record-003', value: 348, offset: 3 },
  { name: 'lib-086-record-004', value: 435, offset: 4 },
  { name: 'lib-086-record-005', value: 522, offset: 5 },
  { name: 'lib-086-record-006', value: 609, offset: 6 },
  { name: 'lib-086-record-007', value: 696, offset: 7 },
  { name: 'lib-086-record-008', value: 783, offset: 8 },
  { name: 'lib-086-record-009', value: 870, offset: 9 },
  { name: 'lib-086-record-010', value: 957, offset: 10 },
  { name: 'lib-086-record-011', value: 1044, offset: 11 },
  { name: 'lib-086-record-012', value: 1131, offset: 12 },
  { name: 'lib-086-record-013', value: 1218, offset: 13 },
  { name: 'lib-086-record-014', value: 1305, offset: 14 },
  { name: 'lib-086-record-015', value: 1392, offset: 15 },
  { name: 'lib-086-record-016', value: 1479, offset: 16 },
  { name: 'lib-086-record-017', value: 1566, offset: 17 },
  { name: 'lib-086-record-018', value: 1653, offset: 18 },
  { name: 'lib-086-record-019', value: 1740, offset: 19 },
  { name: 'lib-086-record-020', value: 1827, offset: 20 },
  { name: 'lib-086-record-021', value: 1914, offset: 21 },
  { name: 'lib-086-record-022', value: 2001, offset: 22 },
  { name: 'lib-086-record-023', value: 2088, offset: 23 },
  { name: 'lib-086-record-024', value: 2175, offset: 24 },
  { name: 'lib-086-record-025', value: 2262, offset: 25 },
  { name: 'lib-086-record-026', value: 2349, offset: 26 },
  { name: 'lib-086-record-027', value: 2436, offset: 27 },
  { name: 'lib-086-record-028', value: 2523, offset: 28 },
  { name: 'lib-086-record-029', value: 2610, offset: 29 },
  { name: 'lib-086-record-030', value: 2697, offset: 30 },
  { name: 'lib-086-record-031', value: 2784, offset: 31 },
  { name: 'lib-086-record-032', value: 2871, offset: 32 },
  { name: 'lib-086-record-033', value: 2958, offset: 33 },
  { name: 'lib-086-record-034', value: 3045, offset: 34 },
  { name: 'lib-086-record-035', value: 3132, offset: 35 },
  { name: 'lib-086-record-036', value: 3219, offset: 36 },
  { name: 'lib-086-record-037', value: 3306, offset: 37 },
  { name: 'lib-086-record-038', value: 3393, offset: 38 },
  { name: 'lib-086-record-039', value: 3480, offset: 39 },
  { name: 'lib-086-record-040', value: 3567, offset: 40 },
  { name: 'lib-086-record-041', value: 3654, offset: 41 },
  { name: 'lib-086-record-042', value: 3741, offset: 42 },
  { name: 'lib-086-record-043', value: 3828, offset: 43 },
  { name: 'lib-086-record-044', value: 3915, offset: 44 },
  { name: 'lib-086-record-045', value: 4002, offset: 45 },
  { name: 'lib-086-record-046', value: 4089, offset: 46 },
  { name: 'lib-086-record-047', value: 4176, offset: 47 },
  { name: 'lib-086-record-048', value: 4263, offset: 48 },
  { name: 'lib-086-record-049', value: 4350, offset: 49 },
  { name: 'lib-086-record-050', value: 4437, offset: 50 },
  { name: 'lib-086-record-051', value: 4524, offset: 51 },
  { name: 'lib-086-record-052', value: 4611, offset: 52 },
  { name: 'lib-086-record-053', value: 4698, offset: 53 },
  { name: 'lib-086-record-054', value: 4785, offset: 54 },
  { name: 'lib-086-record-055', value: 4872, offset: 55 },
  { name: 'lib-086-record-056', value: 4959, offset: 56 },
  { name: 'lib-086-record-057', value: 5046, offset: 57 },
  { name: 'lib-086-record-058', value: 5133, offset: 58 },
  { name: 'lib-086-record-059', value: 5220, offset: 59 },
  { name: 'lib-086-record-060', value: 5307, offset: 60 },
  { name: 'lib-086-record-061', value: 5394, offset: 61 },
  { name: 'lib-086-record-062', value: 5481, offset: 62 },
  { name: 'lib-086-record-063', value: 5568, offset: 63 },
];
export const total = sumBy(rows, 'value') + total076 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-086',
  standalone: true,
  imports: [Lib076Component, Lib000Component],
  template: `<section><h2>lib-086: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-076 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib086Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
