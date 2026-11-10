import { Component, computed, signal } from '@angular/core';
import { format, addDays } from 'date-fns';
import { chunk, sumBy } from 'lodash-es';
import { of, map } from 'rxjs';


const rows = [
  { name: 'lib-009-record-000', value: 10, offset: 0 },
  { name: 'lib-009-record-001', value: 20, offset: 1 },
  { name: 'lib-009-record-002', value: 30, offset: 2 },
  { name: 'lib-009-record-003', value: 40, offset: 3 },
  { name: 'lib-009-record-004', value: 50, offset: 4 },
  { name: 'lib-009-record-005', value: 60, offset: 5 },
  { name: 'lib-009-record-006', value: 70, offset: 6 },
  { name: 'lib-009-record-007', value: 80, offset: 7 },
  { name: 'lib-009-record-008', value: 90, offset: 8 },
  { name: 'lib-009-record-009', value: 100, offset: 9 },
  { name: 'lib-009-record-010', value: 110, offset: 10 },
  { name: 'lib-009-record-011', value: 120, offset: 11 },
  { name: 'lib-009-record-012', value: 130, offset: 12 },
  { name: 'lib-009-record-013', value: 140, offset: 13 },
  { name: 'lib-009-record-014', value: 150, offset: 14 },
  { name: 'lib-009-record-015', value: 160, offset: 15 },
  { name: 'lib-009-record-016', value: 170, offset: 16 },
  { name: 'lib-009-record-017', value: 180, offset: 17 },
  { name: 'lib-009-record-018', value: 190, offset: 18 },
  { name: 'lib-009-record-019', value: 200, offset: 19 },
  { name: 'lib-009-record-020', value: 210, offset: 20 },
  { name: 'lib-009-record-021', value: 220, offset: 21 },
  { name: 'lib-009-record-022', value: 230, offset: 22 },
  { name: 'lib-009-record-023', value: 240, offset: 23 },
  { name: 'lib-009-record-024', value: 250, offset: 24 },
  { name: 'lib-009-record-025', value: 260, offset: 25 },
  { name: 'lib-009-record-026', value: 270, offset: 26 },
  { name: 'lib-009-record-027', value: 280, offset: 27 },
  { name: 'lib-009-record-028', value: 290, offset: 28 },
  { name: 'lib-009-record-029', value: 300, offset: 29 },
  { name: 'lib-009-record-030', value: 310, offset: 30 },
  { name: 'lib-009-record-031', value: 320, offset: 31 },
  { name: 'lib-009-record-032', value: 330, offset: 32 },
  { name: 'lib-009-record-033', value: 340, offset: 33 },
  { name: 'lib-009-record-034', value: 350, offset: 34 },
  { name: 'lib-009-record-035', value: 360, offset: 35 },
  { name: 'lib-009-record-036', value: 370, offset: 36 },
  { name: 'lib-009-record-037', value: 380, offset: 37 },
  { name: 'lib-009-record-038', value: 390, offset: 38 },
  { name: 'lib-009-record-039', value: 400, offset: 39 },
  { name: 'lib-009-record-040', value: 410, offset: 40 },
  { name: 'lib-009-record-041', value: 420, offset: 41 },
  { name: 'lib-009-record-042', value: 430, offset: 42 },
  { name: 'lib-009-record-043', value: 440, offset: 43 },
  { name: 'lib-009-record-044', value: 450, offset: 44 },
  { name: 'lib-009-record-045', value: 460, offset: 45 },
  { name: 'lib-009-record-046', value: 470, offset: 46 },
  { name: 'lib-009-record-047', value: 480, offset: 47 },
  { name: 'lib-009-record-048', value: 490, offset: 48 },
  { name: 'lib-009-record-049', value: 500, offset: 49 },
  { name: 'lib-009-record-050', value: 510, offset: 50 },
  { name: 'lib-009-record-051', value: 520, offset: 51 },
  { name: 'lib-009-record-052', value: 530, offset: 52 },
  { name: 'lib-009-record-053', value: 540, offset: 53 },
  { name: 'lib-009-record-054', value: 550, offset: 54 },
  { name: 'lib-009-record-055', value: 560, offset: 55 },
  { name: 'lib-009-record-056', value: 570, offset: 56 },
  { name: 'lib-009-record-057', value: 580, offset: 57 },
  { name: 'lib-009-record-058', value: 590, offset: 58 },
  { name: 'lib-009-record-059', value: 600, offset: 59 },
  { name: 'lib-009-record-060', value: 610, offset: 60 },
  { name: 'lib-009-record-061', value: 620, offset: 61 },
  { name: 'lib-009-record-062', value: 630, offset: 62 },
  { name: 'lib-009-record-063', value: 640, offset: 63 },
];
export const total = sumBy(rows, 'value');
export const summary$ = of(rows).pipe(map((items) => chunk(items, 8).map((group) => sumBy(group, 'value'))));

@Component({
  selector: 'bench-lib-009',
  standalone: true,
  imports: [],
  template: `<section><h2>lib-009: {{ total }}</h2>
    <button (click)="page.set(page() + 1)">Next group {{ page() }}</button>
    @for (row of visible(); track row.name) {
      <p>{{ row.name }}: {{ row.value }} - {{ label(row.offset) }}</p>
    }
    
    
  </section>`,
  styles: [`:host { display: block; border-left: 2px solid #456; padding-left: 1rem; } h2 { font-size: 1rem; }`]
})
export class Lib009Component {
  readonly total = total;
  readonly page = signal(0);
  readonly visible = computed(() => chunk(rows, 8)[this.page() % Math.ceil(rows.length / 8)]);
  label(offset: number): string {
    return format(addDays(new Date(2020, 0, 1), offset), 'yyyy-MM-dd');
  }
}
