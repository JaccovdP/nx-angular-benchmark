import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib080Component, total as total080 } from '@bench/lib-080';

const rows = [
  { name: 'lib-090-record-000', value: 91, offset: 0 },
  { name: 'lib-090-record-001', value: 182, offset: 1 },
  { name: 'lib-090-record-002', value: 273, offset: 2 },
  { name: 'lib-090-record-003', value: 364, offset: 3 },
  { name: 'lib-090-record-004', value: 455, offset: 4 },
  { name: 'lib-090-record-005', value: 546, offset: 5 },
  { name: 'lib-090-record-006', value: 637, offset: 6 },
  { name: 'lib-090-record-007', value: 728, offset: 7 },
  { name: 'lib-090-record-008', value: 819, offset: 8 },
  { name: 'lib-090-record-009', value: 910, offset: 9 },
  { name: 'lib-090-record-010', value: 1001, offset: 10 },
  { name: 'lib-090-record-011', value: 1092, offset: 11 },
  { name: 'lib-090-record-012', value: 1183, offset: 12 },
  { name: 'lib-090-record-013', value: 1274, offset: 13 },
  { name: 'lib-090-record-014', value: 1365, offset: 14 },
  { name: 'lib-090-record-015', value: 1456, offset: 15 },
  { name: 'lib-090-record-016', value: 1547, offset: 16 },
  { name: 'lib-090-record-017', value: 1638, offset: 17 },
  { name: 'lib-090-record-018', value: 1729, offset: 18 },
  { name: 'lib-090-record-019', value: 1820, offset: 19 },
  { name: 'lib-090-record-020', value: 1911, offset: 20 },
  { name: 'lib-090-record-021', value: 2002, offset: 21 },
  { name: 'lib-090-record-022', value: 2093, offset: 22 },
  { name: 'lib-090-record-023', value: 2184, offset: 23 },
  { name: 'lib-090-record-024', value: 2275, offset: 24 },
  { name: 'lib-090-record-025', value: 2366, offset: 25 },
  { name: 'lib-090-record-026', value: 2457, offset: 26 },
  { name: 'lib-090-record-027', value: 2548, offset: 27 },
  { name: 'lib-090-record-028', value: 2639, offset: 28 },
  { name: 'lib-090-record-029', value: 2730, offset: 29 },
  { name: 'lib-090-record-030', value: 2821, offset: 30 },
  { name: 'lib-090-record-031', value: 2912, offset: 31 },
  { name: 'lib-090-record-032', value: 3003, offset: 32 },
  { name: 'lib-090-record-033', value: 3094, offset: 33 },
  { name: 'lib-090-record-034', value: 3185, offset: 34 },
  { name: 'lib-090-record-035', value: 3276, offset: 35 },
  { name: 'lib-090-record-036', value: 3367, offset: 36 },
  { name: 'lib-090-record-037', value: 3458, offset: 37 },
  { name: 'lib-090-record-038', value: 3549, offset: 38 },
  { name: 'lib-090-record-039', value: 3640, offset: 39 },
  { name: 'lib-090-record-040', value: 3731, offset: 40 },
  { name: 'lib-090-record-041', value: 3822, offset: 41 },
  { name: 'lib-090-record-042', value: 3913, offset: 42 },
  { name: 'lib-090-record-043', value: 4004, offset: 43 },
  { name: 'lib-090-record-044', value: 4095, offset: 44 },
  { name: 'lib-090-record-045', value: 4186, offset: 45 },
  { name: 'lib-090-record-046', value: 4277, offset: 46 },
  { name: 'lib-090-record-047', value: 4368, offset: 47 },
  { name: 'lib-090-record-048', value: 4459, offset: 48 },
  { name: 'lib-090-record-049', value: 4550, offset: 49 },
  { name: 'lib-090-record-050', value: 4641, offset: 50 },
  { name: 'lib-090-record-051', value: 4732, offset: 51 },
  { name: 'lib-090-record-052', value: 4823, offset: 52 },
  { name: 'lib-090-record-053', value: 4914, offset: 53 },
  { name: 'lib-090-record-054', value: 5005, offset: 54 },
  { name: 'lib-090-record-055', value: 5096, offset: 55 },
  { name: 'lib-090-record-056', value: 5187, offset: 56 },
  { name: 'lib-090-record-057', value: 5278, offset: 57 },
  { name: 'lib-090-record-058', value: 5369, offset: 58 },
  { name: 'lib-090-record-059', value: 5460, offset: 59 },
  { name: 'lib-090-record-060', value: 5551, offset: 60 },
  { name: 'lib-090-record-061', value: 5642, offset: 61 },
  { name: 'lib-090-record-062', value: 5733, offset: 62 },
  { name: 'lib-090-record-063', value: 5824, offset: 63 },
];
export const total = sumBy(rows, 'value') + total080;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-090',
  standalone: true,
  imports: [Lib080Component],
  template: `<section><h2>lib-090: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-080 />
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib090Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
