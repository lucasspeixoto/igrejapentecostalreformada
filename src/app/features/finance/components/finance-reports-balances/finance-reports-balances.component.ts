import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceReportsService } from '../../services/finance-reports/finance-reports.service';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';

@Component({
  selector: 'app-finance-reports-balances',
  imports: [CommonModule],
  templateUrl: './finance-reports-balances.component.html',
  styles: [
    `
      .card {
        padding: 2rem 0.8rem;

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
