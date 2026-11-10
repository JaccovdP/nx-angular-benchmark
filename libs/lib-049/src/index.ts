import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib039Component, total as total039 } from '@bench/lib-039';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-049-record-000', value: 50, offset: 0 },
  { name: 'lib-049-record-001', value: 100, offset: 1 },
  { name: 'lib-049-record-002', value: 150, offset: 2 },
  { name: 'lib-049-record-003', value: 200, offset: 3 },
  { name: 'lib-049-record-004', value: 250, offset: 4 },
  { name: 'lib-049-record-005', value: 300, offset: 5 },
  { name: 'lib-049-record-006', value: 350, offset: 6 },
  { name: 'lib-049-record-007', value: 400, offset: 7 },
  { name: 'lib-049-record-008', value: 450, offset: 8 },
  { name: 'lib-049-record-009', value: 500, offset: 9 },
  { name: 'lib-049-record-010', value: 550, offset: 10 },
  { name: 'lib-049-record-011', value: 600, offset: 11 },
  { name: 'lib-049-record-012', value: 650, offset: 12 },
  { name: 'lib-049-record-013', value: 700, offset: 13 },
  { name: 'lib-049-record-014', value: 750, offset: 14 },
  { name: 'lib-049-record-015', value: 800, offset: 15 },
  { name: 'lib-049-record-016', value: 850, offset: 16 },
  { name: 'lib-049-record-017', value: 900, offset: 17 },
  { name: 'lib-049-record-018', value: 950, offset: 18 },
  { name: 'lib-049-record-019', value: 1000, offset: 19 },
  { name: 'lib-049-record-020', value: 1050, offset: 20 },
  { name: 'lib-049-record-021', value: 1100, offset: 21 },
  { name: 'lib-049-record-022', value: 1150, offset: 22 },
  { name: 'lib-049-record-023', value: 1200, offset: 23 },
  { name: 'lib-049-record-024', value: 1250, offset: 24 },
  { name: 'lib-049-record-025', value: 1300, offset: 25 },
  { name: 'lib-049-record-026', value: 1350, offset: 26 },
  { name: 'lib-049-record-027', value: 1400, offset: 27 },
  { name: 'lib-049-record-028', value: 1450, offset: 28 },
  { name: 'lib-049-record-029', value: 1500, offset: 29 },
  { name: 'lib-049-record-030', value: 1550, offset: 30 },
  { name: 'lib-049-record-031', value: 1600, offset: 31 },
  { name: 'lib-049-record-032', value: 1650, offset: 32 },
  { name: 'lib-049-record-033', value: 1700, offset: 33 },
  { name: 'lib-049-record-034', value: 1750, offset: 34 },
  { name: 'lib-049-record-035', value: 1800, offset: 35 },
  { name: 'lib-049-record-036', value: 1850, offset: 36 },
  { name: 'lib-049-record-037', value: 1900, offset: 37 },
  { name: 'lib-049-record-038', value: 1950, offset: 38 },
  { name: 'lib-049-record-039', value: 2000, offset: 39 },
  { name: 'lib-049-record-040', value: 2050, offset: 40 },
  { name: 'lib-049-record-041', value: 2100, offset: 41 },
  { name: 'lib-049-record-042', value: 2150, offset: 42 },
  { name: 'lib-049-record-043', value: 2200, offset: 43 },
  { name: 'lib-049-record-044', value: 2250, offset: 44 },
  { name: 'lib-049-record-045', value: 2300, offset: 45 },
  { name: 'lib-049-record-046', value: 2350, offset: 46 },
  { name: 'lib-049-record-047', value: 2400, offset: 47 },
  { name: 'lib-049-record-048', value: 2450, offset: 48 },
  { name: 'lib-049-record-049', value: 2500, offset: 49 },
  { name: 'lib-049-record-050', value: 2550, offset: 50 },
  { name: 'lib-049-record-051', value: 2600, offset: 51 },
  { name: 'lib-049-record-052', value: 2650, offset: 52 },
  { name: 'lib-049-record-053', value: 2700, offset: 53 },
  { name: 'lib-049-record-054', value: 2750, offset: 54 },
  { name: 'lib-049-record-055', value: 2800, offset: 55 },
  { name: 'lib-049-record-056', value: 2850, offset: 56 },
  { name: 'lib-049-record-057', value: 2900, offset: 57 },
  { name: 'lib-049-record-058', value: 2950, offset: 58 },
  { name: 'lib-049-record-059', value: 3000, offset: 59 },
  { name: 'lib-049-record-060', value: 3050, offset: 60 },
  { name: 'lib-049-record-061', value: 3100, offset: 61 },
  { name: 'lib-049-record-062', value: 3150, offset: 62 },
  { name: 'lib-049-record-063', value: 3200, offset: 63 },
];
export const total = sumBy(rows, 'value') + total039 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-049',
  standalone: true,
  imports: [Lib039Component, Lib000Component],
  template: `<section><h2>lib-049: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-039 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib049Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
