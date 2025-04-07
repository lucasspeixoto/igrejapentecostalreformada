import type { Routes } from '@angular/router';
import { FinanceNotesComponent } from './views/finance-notes/finance-notes.component';
import { ReportsComponent } from './views/reports/reports.component';

export default [
  { path: 'notas', component: FinanceNotesComponent },
  { path: 'relatorios', component: ReportsComponent },
] as Routes;
