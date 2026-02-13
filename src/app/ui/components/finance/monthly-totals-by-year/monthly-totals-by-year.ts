import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { LoadingService } from '../../../../data/services/shared/loading/loading';
import { FINANCE_TYPES } from '../../../../utils/constants';
import { MonthlyTotalsByYearViewModel } from '../../../view-models/finance-charts/monthly-totals-by-year.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';

@Component({
  selector: 'app-monthly-totals-by-year',
  imports: [CurrencyPipe, FormsModule, TableModule, SelectModule, ButtonModule],
  templateUrl: './monthly-totals-by-year.html',
})
export class MonthlyTotalsByYear implements OnInit {
  public loadingService = inject(LoadingService);

  public financeReportsViewModel = inject(FinanceReportsViewModel);

  public monthlyTotalsByYearViewModel = inject(MonthlyTotalsByYearViewModel);

  public monthlyTotalCategories = this.monthlyTotalsByYearViewModel.getMonthlyTotalCategories();

  public financeTypes = FINANCE_TYPES;

  public async ngOnInit(): Promise<void> {
    await this.monthlyTotalsByYearViewModel.getMonthlyCategories();
  }
}
