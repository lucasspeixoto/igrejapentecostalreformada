import { inject, Injectable, type Signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FinanceChartsRepository } from '../../../data/repositories/finance-charts/finance-charts-repository';
import { ExcelService } from '../../../data/services/shared/excel';
import { LoadingService } from '../../../data/services/shared/loading/loading';
import type { MonthlyTotal, MonthlyTotalCategory } from '../../../domain/models/finance-reports.model';
import { MONTHS_ALIAS } from '../../../utils/constants';

@Injectable({ providedIn: 'root' })
export class MonthlyTotalsByYearViewModel {
  private financeChartsRepository = inject(FinanceChartsRepository);

  public loadingService = inject(LoadingService);

  private excelService = inject(ExcelService<MonthlyTotalCategory>);

  public messageService = inject(MessageService);

  public months = MONTHS_ALIAS;

  public selectedYear: number = new Date().getFullYear();

  public selectedType: 'C' | 'D' | 'A' = 'A';

  public availableYears: number[] = [2025, 2026];

  public async getMonthlyCategories(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.financeChartsRepository.getMonthlyTotals(this.selectedYear, this.selectedType);

    if (data && !error) {
      this.processMonthlyCategoriesData(data);

      this.loadingService.isLoading.set(false);
    }
  }

  public processMonthlyCategoriesData(monthlyTotal: MonthlyTotal[]): void {
    const categoriesMap = new Map();

    monthlyTotal.forEach(item => {
      if (!categoriesMap.has(item.category_id)) {
        categoriesMap.set(item.category_id, {
          name: item.category_name,
          type: item.type,
          months: new Array(12).fill(0), // Inicializa os 12 meses com zero
          totalYear: 0,
        });
      }

      const category = categoriesMap.get(item.category_id);
      category.months[item.month - 1] = item.total; // item.month (1-12) -> index (0-11)
      category.totalYear += item.total;
    });

    this.financeChartsRepository.setMonthlyTotalCategories(Array.from(categoriesMap.values()));
  }

  public getMonthlyTotalCategories(): Signal<MonthlyTotalCategory[]> {
    return this.financeChartsRepository.getMonthlyTotalCategories();
  }

  public exportMonthlyTotalCategoriesToExcel(): void {
    const monthlyTotalCategories = this.financeChartsRepository.getMonthlyTotalCategories();

    if (monthlyTotalCategories().length > 0) {
      this.excelService.exportToExcelMonthlyTotalByCategory(monthlyTotalCategories(), this.selectedYear);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Sem resultados',
        detail: 'Nenhum registro encontrado para realizar o download',
        life: 3000,
      });
    }
  }
}
