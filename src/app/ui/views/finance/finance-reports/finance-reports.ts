import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { LoadingService } from '../../../../data/services/shared/loading/loading';
import { FINANCE_TYPES } from '../../../../utils/constants';
import { FinanceChartsViewModel } from '../../../view-models/finance-charts/finance-charts.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';

@Component({
  selector: 'app-finance-reports',
  imports: [CurrencyPipe, FormsModule, TableModule, SelectModule, ButtonModule],
  templateUrl: './finance-reports.html',
  styleUrl: './finance-reports.scss',
})
export class FinanceReports implements OnInit {
  public loadingService = inject(LoadingService);

  public financeReportsViewModel = inject(FinanceReportsViewModel);

  public financeChartsViewModel = inject(FinanceChartsViewModel);

  public monthlyTotalCategories = this.financeChartsViewModel.getMonthlyTotalCategories();

  public financeTypes = FINANCE_TYPES;

  public async ngOnInit(): Promise<void> {
    await this.financeChartsViewModel.getMonthlyCategories();
  }
}
