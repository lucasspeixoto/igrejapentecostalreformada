import { inject, Injectable, signal, type Signal } from '@angular/core';
import type { IGetMonthlyTotalsResponse, MonthlyTotalCategory } from '../../../domain/models/finance-reports.model';
import { FinanceChartsService } from '../../services/finance-charts/finance-charts-service';

@Injectable({
  providedIn: 'root',
})
export class FinanceChartsRepository {
  private financeChartsService = inject(FinanceChartsService);

  private _monthlyTotalCategories = signal<MonthlyTotalCategory[]>([]);
  public monthlyTotalCategories = this._monthlyTotalCategories.asReadonly();

  public async getMonthlyTotals(selectedYear: number, selectedType: 'C' | 'D' | 'A'): Promise<IGetMonthlyTotalsResponse> {
    const { data, error } = await this.financeChartsService.getMonthlyTotals(selectedYear, selectedType);
    return { data, error };
  }

  public setMonthlyTotalCategories(categories: MonthlyTotalCategory[]): void {
    this._monthlyTotalCategories.set(categories);
  }

  public getMonthlyTotalCategories(): Signal<MonthlyTotalCategory[]> {
    return this.monthlyTotalCategories;
  }
}
