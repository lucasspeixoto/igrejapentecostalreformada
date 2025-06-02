import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinanceReportsBalancesComponent } from '../../components/finance-reports-balances/finance-reports-balances.component';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';
import { FinanceReportsService } from '../../services/finance-reports/finance-reports.service';

@Component({
  selector: 'app-finance',
  imports: [RouterModule, FinanceReportsBalancesComponent],
  template: ` <section>
    <div class="grid grid-cols-12 gap-2">
      <app-finance-reports-balances class="contents" />
      <div class="col-span-12">
        <router-outlet />
      </div>
    </div>
  </section>`,
})
export class FinanceComponent implements OnInit {
  public financeReportsService = inject(FinanceReportsService);

  public financeNotesService = inject(FinanceNotesService);

  public ngOnInit(): void {
    this.financeNotesService.getAllFinanceNotesDataHandler();
    this.financeReportsService.getAllFinanceReportsDataHandler();
  }
}
