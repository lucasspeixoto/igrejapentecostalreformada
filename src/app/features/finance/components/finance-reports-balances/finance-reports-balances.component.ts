import { Component, inject } from '@angular/core';

import { FinanceReportsService } from '../../services/finance-reports/finance-reports.service';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';

@Component({
  selector: 'app-finance-reports-balances',
  imports: [],
  templateUrl: './finance-reports-balances.component.html',
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
export class FinanceReportsBalancesComponent {
  public financeReportsService = inject(FinanceReportsService);

  public financeNotesService = inject(FinanceNotesService);
}
