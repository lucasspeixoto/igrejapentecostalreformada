import { Routes } from '@angular/router';
import { FinanceReports } from '../../ui/views/finance/finance-reports/finance-reports';
import { FinanceNotes } from '../../ui/views/finance/finance-notes/finance-notes';


export default [
  { path: 'notas', component: FinanceNotes },
  { path: 'relatorios', component: FinanceReports },
] as Routes;
