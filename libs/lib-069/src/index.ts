import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib059Component, total as total059 } from '@bench/lib-059';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-069-record-000', value: 70, offset: 0 },
  { name: 'lib-069-record-001', value: 140, offset: 1 },
  { name: 'lib-069-record-002', value: 210, offset: 2 },
  { name: 'lib-069-record-003', value: 280, offset: 3 },
  { name: 'lib-069-record-004', value: 350, offset: 4 },
  { name: 'lib-069-record-005', value: 420, offset: 5 },
  { name: 'lib-069-record-006', value: 490, offset: 6 },
  { name: 'lib-069-record-007', value: 560, offset: 7 },
  { name: 'lib-069-record-008', value: 630, offset: 8 },
  { name: 'lib-069-record-009', value: 700, offset: 9 },
  { name: 'lib-069-record-010', value: 770, offset: 10 },
  { name: 'lib-069-record-011', value: 840, offset: 11 },
  { name: 'lib-069-record-012', value: 910, offset: 12 },
  { name: 'lib-069-record-013', value: 980, offset: 13 },
  { name: 'lib-069-record-014', value: 1050, offset: 14 },
  { name: 'lib-069-record-015', value: 1120, offset: 15 },
  { name: 'lib-069-record-016', value: 1190, offset: 16 },
  { name: 'lib-069-record-017', value: 1260, offset: 17 },
  { name: 'lib-069-record-018', value: 1330, offset: 18 },
  { name: 'lib-069-record-019', value: 1400, offset: 19 },
  { name: 'lib-069-record-020', value: 1470, offset: 20 },
  { name: 'lib-069-record-021', value: 1540, offset: 21 },
  { name: 'lib-069-record-022', value: 1610, offset: 22 },
  { name: 'lib-069-record-023', value: 1680, offset: 23 },
  { name: 'lib-069-record-024', value: 1750, offset: 24 },
  { name: 'lib-069-record-025', value: 1820, offset: 25 },
  { name: 'lib-069-record-026', value: 1890, offset: 26 },
  { name: 'lib-069-record-027', value: 1960, offset: 27 },
  { name: 'lib-069-record-028', value: 2030, offset: 28 },
  { name: 'lib-069-record-029', value: 2100, offset: 29 },
  { name: 'lib-069-record-030', value: 2170, offset: 30 },
  { name: 'lib-069-record-031', value: 2240, offset: 31 },
  { name: 'lib-069-record-032', value: 2310, offset: 32 },
  { name: 'lib-069-record-033', value: 2380, offset: 33 },
  { name: 'lib-069-record-034', value: 2450, offset: 34 },
  { name: 'lib-069-record-035', value: 2520, offset: 35 },
  { name: 'lib-069-record-036', value: 2590, offset: 36 },
  { name: 'lib-069-record-037', value: 2660, offset: 37 },
  { name: 'lib-069-record-038', value: 2730, offset: 38 },
  { name: 'lib-069-record-039', value: 2800, offset: 39 },
  { name: 'lib-069-record-040', value: 2870, offset: 40 },
  { name: 'lib-069-record-041', value: 2940, offset: 41 },
  { name: 'lib-069-record-042', value: 3010, offset: 42 },
  { name: 'lib-069-record-043', value: 3080, offset: 43 },
  { name: 'lib-069-record-044', value: 3150, offset: 44 },
  { name: 'lib-069-record-045', value: 3220, offset: 45 },
  { name: 'lib-069-record-046', value: 3290, offset: 46 },
  { name: 'lib-069-record-047', value: 3360, offset: 47 },
  { name: 'lib-069-record-048', value: 3430, offset: 48 },
  { name: 'lib-069-record-049', value: 3500, offset: 49 },
  { name: 'lib-069-record-050', value: 3570, offset: 50 },
  { name: 'lib-069-record-051', value: 3640, offset: 51 },
  { name: 'lib-069-record-052', value: 3710, offset: 52 },
  { name: 'lib-069-record-053', value: 3780, offset: 53 },
  { name: 'lib-069-record-054', value: 3850, offset: 54 },
  { name: 'lib-069-record-055', value: 3920, offset: 55 },
  { name: 'lib-069-record-056', value: 3990, offset: 56 },
  { name: 'lib-069-record-057', value: 4060, offset: 57 },
  { name: 'lib-069-record-058', value: 4130, offset: 58 },
  { name: 'lib-069-record-059', value: 4200, offset: 59 },
  { name: 'lib-069-record-060', value: 4270, offset: 60 },
  { name: 'lib-069-record-061', value: 4340, offset: 61 },
  { name: 'lib-069-record-062', value: 4410, offset: 62 },
  { name: 'lib-069-record-063', value: 4480, offset: 63 },
];
export const total = sumBy(rows, 'value') + total059 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-069',
  standalone: true,
  imports: [Lib059Component, Lib000Component],
  template: `<section><h2>lib-069: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-059 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib069Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
