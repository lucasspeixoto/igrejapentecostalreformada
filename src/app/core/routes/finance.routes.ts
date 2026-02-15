import { Routes } from '@angular/router';
import { FinanceInvestmentsComponent } from '../../ui/views/finance/finance-investments/finance-investments';
import { FinanceNotes } from '../../ui/views/finance/finance-notes/finance-notes';
import { FinanceReports } from '../../ui/views/finance/finance-reports/finance-reports';

export default [
  { path: 'notas', component: FinanceNotes },
  { path: 'relatorios', component: FinanceReports },
  { path: 'investimentos', component: FinanceInvestmentsComponent },
] as Routes;
