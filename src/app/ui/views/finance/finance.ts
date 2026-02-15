import { Component, inject, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinanceReportsBalances } from '../../components/finance/finance-reports-balances/finance-reports-balances';
import { FinanceNotesViewModel } from '../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../view-models/finance-reports/finance-reports.view-model';

@Component({
  selector: 'app-finance',
  imports: [RouterModule, FinanceReportsBalances],
  template: ` <section>
    <div class="grid grid-cols-12 gap-2">
      <app-finance-reports-balances class="contents" />
      <div class="col-span-12">
        <router-outlet />
      </div>
    </div>
  </section>`,
})
export class Finance implements OnInit {
  public financeNotesViewModel = inject(FinanceNotesViewModel);
  public financeReportsViewModel = inject(FinanceReportsViewModel);

  public async ngOnInit(): Promise<void> {
    await this.financeNotesViewModel.getAllFinanceNotesDataHandler();
    await this.financeReportsViewModel.findAll();
  }
}
