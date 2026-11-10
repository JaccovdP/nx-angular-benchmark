import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib069Component, total as total069 } from '@bench/lib-069';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-079-record-000', value: 80, offset: 0 },
  { name: 'lib-079-record-001', value: 160, offset: 1 },
  { name: 'lib-079-record-002', value: 240, offset: 2 },
  { name: 'lib-079-record-003', value: 320, offset: 3 },
  { name: 'lib-079-record-004', value: 400, offset: 4 },
  { name: 'lib-079-record-005', value: 480, offset: 5 },
  { name: 'lib-079-record-006', value: 560, offset: 6 },
  { name: 'lib-079-record-007', value: 640, offset: 7 },
  { name: 'lib-079-record-008', value: 720, offset: 8 },
  { name: 'lib-079-record-009', value: 800, offset: 9 },
  { name: 'lib-079-record-010', value: 880, offset: 10 },
  { name: 'lib-079-record-011', value: 960, offset: 11 },
  { name: 'lib-079-record-012', value: 1040, offset: 12 },
  { name: 'lib-079-record-013', value: 1120, offset: 13 },
  { name: 'lib-079-record-014', value: 1200, offset: 14 },
  { name: 'lib-079-record-015', value: 1280, offset: 15 },
  { name: 'lib-079-record-016', value: 1360, offset: 16 },
  { name: 'lib-079-record-017', value: 1440, offset: 17 },
  { name: 'lib-079-record-018', value: 1520, offset: 18 },
  { name: 'lib-079-record-019', value: 1600, offset: 19 },
  { name: 'lib-079-record-020', value: 1680, offset: 20 },
  { name: 'lib-079-record-021', value: 1760, offset: 21 },
  { name: 'lib-079-record-022', value: 1840, offset: 22 },
  { name: 'lib-079-record-023', value: 1920, offset: 23 },
  { name: 'lib-079-record-024', value: 2000, offset: 24 },
  { name: 'lib-079-record-025', value: 2080, offset: 25 },
  { name: 'lib-079-record-026', value: 2160, offset: 26 },
  { name: 'lib-079-record-027', value: 2240, offset: 27 },
  { name: 'lib-079-record-028', value: 2320, offset: 28 },
  { name: 'lib-079-record-029', value: 2400, offset: 29 },
  { name: 'lib-079-record-030', value: 2480, offset: 30 },
  { name: 'lib-079-record-031', value: 2560, offset: 31 },
  { name: 'lib-079-record-032', value: 2640, offset: 32 },
  { name: 'lib-079-record-033', value: 2720, offset: 33 },
  { name: 'lib-079-record-034', value: 2800, offset: 34 },
  { name: 'lib-079-record-035', value: 2880, offset: 35 },
  { name: 'lib-079-record-036', value: 2960, offset: 36 },
  { name: 'lib-079-record-037', value: 3040, offset: 37 },
  { name: 'lib-079-record-038', value: 3120, offset: 38 },
  { name: 'lib-079-record-039', value: 3200, offset: 39 },
  { name: 'lib-079-record-040', value: 3280, offset: 40 },
  { name: 'lib-079-record-041', value: 3360, offset: 41 },
  { name: 'lib-079-record-042', value: 3440, offset: 42 },
  { name: 'lib-079-record-043', value: 3520, offset: 43 },
  { name: 'lib-079-record-044', value: 3600, offset: 44 },
  { name: 'lib-079-record-045', value: 3680, offset: 45 },
  { name: 'lib-079-record-046', value: 3760, offset: 46 },
  { name: 'lib-079-record-047', value: 3840, offset: 47 },
  { name: 'lib-079-record-048', value: 3920, offset: 48 },
  { name: 'lib-079-record-049', value: 4000, offset: 49 },
  { name: 'lib-079-record-050', value: 4080, offset: 50 },
  { name: 'lib-079-record-051', value: 4160, offset: 51 },
  { name: 'lib-079-record-052', value: 4240, offset: 52 },
  { name: 'lib-079-record-053', value: 4320, offset: 53 },
  { name: 'lib-079-record-054', value: 4400, offset: 54 },
  { name: 'lib-079-record-055', value: 4480, offset: 55 },
  { name: 'lib-079-record-056', value: 4560, offset: 56 },
  { name: 'lib-079-record-057', value: 4640, offset: 57 },
  { name: 'lib-079-record-058', value: 4720, offset: 58 },
  { name: 'lib-079-record-059', value: 4800, offset: 59 },
  { name: 'lib-079-record-060', value: 4880, offset: 60 },
  { name: 'lib-079-record-061', value: 4960, offset: 61 },
  { name: 'lib-079-record-062', value: 5040, offset: 62 },
  { name: 'lib-079-record-063', value: 5120, offset: 63 },
];
export const total = sumBy(rows, 'value') + total069 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-079',
  standalone: true,
  imports: [Lib069Component, Lib000Component],
  template: `<section><h2>lib-079: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-069 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib079Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
