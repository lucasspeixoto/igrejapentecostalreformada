import { Component, inject } from '@angular/core';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';

@Component({
  selector: 'app-finance-reports-balances',
  templateUrl: './finance-reports-balances.html',
  styles: [
    `
      .card {
        padding: 0.8rem;

        @media (max-width: 400px) {
          padding: 0.8rem;
        }
      }
    `,
  ],
})
export class FinanceReportsBalances {
  public financeReportsViewModel = inject(FinanceReportsViewModel);

  public financeNotesViewModel = inject(FinanceNotesViewModel);
}
