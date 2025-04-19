import { FinanceReportsService } from '../../services/finance-reports/finance-reports.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';

@Component({
  selector: 'app-finance-reports-balances',
  imports: [CommonModule],
  templateUrl: './finance-reports-balances.component.html',
  styles: [
    `
      .card {
        padding: 2rem 0.8rem;
      }
    `,
  ],
})
export class FinanceReportsBalancesComponent implements OnInit {
  public financeReportsService = inject(FinanceReportsService);

  public financeNotesService = inject(FinanceNotesService);

  public ngOnInit(): void {
    this.financeNotesService.getAllFinanceNotesDataHandler();
    this.financeReportsService.getAllFinanceReportsDataHandler();
  }
}
