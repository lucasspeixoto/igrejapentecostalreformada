import { Component, inject, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinanceNotesViewModel } from '../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsBalances } from '../../components/finance/finance-reports-balances/finance-reports-balances';

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

  public ngOnInit(): void {
    this.financeNotesViewModel.getAllFinanceNotesDataHandler();
    this.financeNotesViewModel.getAllFinanceReportsDataHandler();
  }
}
