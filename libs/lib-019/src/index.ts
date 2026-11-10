import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';
import { Lib009Component, total as total009 } from '@bench/lib-009';
import { Lib000Component, total as total000 } from '@bench/lib-000';

const rows = [
  { name: 'lib-019-record-000', value: 20, offset: 0 },
  { name: 'lib-019-record-001', value: 40, offset: 1 },
  { name: 'lib-019-record-002', value: 60, offset: 2 },
  { name: 'lib-019-record-003', value: 80, offset: 3 },
  { name: 'lib-019-record-004', value: 100, offset: 4 },
  { name: 'lib-019-record-005', value: 120, offset: 5 },
  { name: 'lib-019-record-006', value: 140, offset: 6 },
  { name: 'lib-019-record-007', value: 160, offset: 7 },
  { name: 'lib-019-record-008', value: 180, offset: 8 },
  { name: 'lib-019-record-009', value: 200, offset: 9 },
  { name: 'lib-019-record-010', value: 220, offset: 10 },
  { name: 'lib-019-record-011', value: 240, offset: 11 },
  { name: 'lib-019-record-012', value: 260, offset: 12 },
  { name: 'lib-019-record-013', value: 280, offset: 13 },
  { name: 'lib-019-record-014', value: 300, offset: 14 },
  { name: 'lib-019-record-015', value: 320, offset: 15 },
  { name: 'lib-019-record-016', value: 340, offset: 16 },
  { name: 'lib-019-record-017', value: 360, offset: 17 },
  { name: 'lib-019-record-018', value: 380, offset: 18 },
  { name: 'lib-019-record-019', value: 400, offset: 19 },
  { name: 'lib-019-record-020', value: 420, offset: 20 },
  { name: 'lib-019-record-021', value: 440, offset: 21 },
  { name: 'lib-019-record-022', value: 460, offset: 22 },
  { name: 'lib-019-record-023', value: 480, offset: 23 },
  { name: 'lib-019-record-024', value: 500, offset: 24 },
  { name: 'lib-019-record-025', value: 520, offset: 25 },
  { name: 'lib-019-record-026', value: 540, offset: 26 },
  { name: 'lib-019-record-027', value: 560, offset: 27 },
  { name: 'lib-019-record-028', value: 580, offset: 28 },
  { name: 'lib-019-record-029', value: 600, offset: 29 },
  { name: 'lib-019-record-030', value: 620, offset: 30 },
  { name: 'lib-019-record-031', value: 640, offset: 31 },
  { name: 'lib-019-record-032', value: 660, offset: 32 },
  { name: 'lib-019-record-033', value: 680, offset: 33 },
  { name: 'lib-019-record-034', value: 700, offset: 34 },
  { name: 'lib-019-record-035', value: 720, offset: 35 },
  { name: 'lib-019-record-036', value: 740, offset: 36 },
  { name: 'lib-019-record-037', value: 760, offset: 37 },
  { name: 'lib-019-record-038', value: 780, offset: 38 },
  { name: 'lib-019-record-039', value: 800, offset: 39 },
  { name: 'lib-019-record-040', value: 820, offset: 40 },
  { name: 'lib-019-record-041', value: 840, offset: 41 },
  { name: 'lib-019-record-042', value: 860, offset: 42 },
  { name: 'lib-019-record-043', value: 880, offset: 43 },
  { name: 'lib-019-record-044', value: 900, offset: 44 },
  { name: 'lib-019-record-045', value: 920, offset: 45 },
  { name: 'lib-019-record-046', value: 940, offset: 46 },
  { name: 'lib-019-record-047', value: 960, offset: 47 },
  { name: 'lib-019-record-048', value: 980, offset: 48 },
  { name: 'lib-019-record-049', value: 1000, offset: 49 },
  { name: 'lib-019-record-050', value: 1020, offset: 50 },
  { name: 'lib-019-record-051', value: 1040, offset: 51 },
  { name: 'lib-019-record-052', value: 1060, offset: 52 },
  { name: 'lib-019-record-053', value: 1080, offset: 53 },
  { name: 'lib-019-record-054', value: 1100, offset: 54 },
  { name: 'lib-019-record-055', value: 1120, offset: 55 },
  { name: 'lib-019-record-056', value: 1140, offset: 56 },
  { name: 'lib-019-record-057', value: 1160, offset: 57 },
  { name: 'lib-019-record-058', value: 1180, offset: 58 },
  { name: 'lib-019-record-059', value: 1200, offset: 59 },
  { name: 'lib-019-record-060', value: 1220, offset: 60 },
  { name: 'lib-019-record-061', value: 1240, offset: 61 },
  { name: 'lib-019-record-062', value: 1260, offset: 62 },
  { name: 'lib-019-record-063', value: 1280, offset: 63 },
];
export const total = sumBy(rows, 'value') + total009 + total000;
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-019',
  standalone: true,
  imports: [Lib009Component, Lib000Component],
  template: `<section><h2>lib-019: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    <bench-lib-009 />
    @if (page() % 2 === 1) { <bench-lib-000 /> }
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib019Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
