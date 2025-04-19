import { Routes } from '@angular/router';
import { FinanceNotesComponent } from './views/finance-notes/finance-notes.component';
import { FinanceReportsComponent } from './views/finance-reports/finance-reports.component';

export default [
  { path: 'notas', component: FinanceNotesComponent },
  { path: 'relatorios', component: FinanceReportsComponent },
] as Routes;
