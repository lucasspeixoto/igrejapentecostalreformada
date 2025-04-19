import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinanceReportsBalancesComponent } from '../../components/finance-reports-balances/finance-reports-balances.component';

@Component({
  selector: 'app-finance',
  imports: [RouterModule, FinanceReportsBalancesComponent],
  template: ` <section>
    <div class="grid grid-cols-12 gap-8">
      <app-finance-reports-balances class="contents" />
      <div class="col-span-12">
        <router-outlet />
      </div>
    </div>
  </section>`,
})
export class FinanceComponent {}
