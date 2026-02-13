import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { FormsModule } from '@angular/forms';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ButtonModule } from 'primeng/button';
import { SelectModule, type SelectChangeEvent } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { LayoutService } from '../../../../data/services/shared/layout';
import { randomColors } from '../../../../utils/colors';
import { MONTH_LABELS } from '../../../../utils/constants';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';

@Component({
  selector: 'app-summary-for-assembly',
  imports: [ChartModule, FormsModule, TableModule, SelectModule, ButtonModule],
  templateUrl: './summary-for-assembly.html',
  styles: [
    `
      :host ::ng-deep {
        .p-button:disabled {
          cursor: not-allowed;
        }
      }
    `,
  ],
})
export class SummaryForAssembly implements OnInit {
  public layoutService = inject(LayoutService);

  public financeNotesViewModel = inject(FinanceNotesViewModel);

  public financeReportsViewModel = inject(FinanceReportsViewModel);

  public monthLabels = MONTH_LABELS;

  public plugin = [ChartDataLabels];

  public monthAndYearList = this.financeReportsViewModel.availableMonths;

  public selectedMonthAndYear = this.financeReportsViewModel.selectedMonthAndYear;

  public onMonthAndYearChange(event: SelectChangeEvent): void {
    localStorage.setItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH', event.value);
    this.financeReportsViewModel.setSelectedMonthAndYear(event.value);
    this.financeNotesViewModel.getAllFinanceNotesDataHandler();
  }

  public platformId = inject(PLATFORM_ID);

  private cd = inject(ChangeDetectorRef);

  public chartData = signal<unknown>(null);

  public chartOptions = signal<unknown>(null);

  public layoutEffect = effect(() => {
    if (this.layoutService.transitionComplete()) {
      this.initChart();
    }
  });

  public selectedMonthAndYearEffect = effect(() => {
    if (this.financeReportsViewModel.selectedMonthAndYear()) {
      this.initChart();
    }
  });

  public ngOnInit(): void {
    this.initChart();
  }

  public initChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const allDebitNotesData = this.financeNotesViewModel.getAllDebitNotesData();

    if (isPlatformBrowser(this.platformId) && allDebitNotesData.length > 0) {
      const chartData = allDebitNotesData.map(item => item.total);
      this.chartData.set({
        labels: allDebitNotesData.map(item => item.name),
        datasets: [
          {
            label: 'Distribuição por categoria',
            data: allDebitNotesData.map(item => item.total),
            borderWidth: 1,
            backgroundColor: randomColors(chartData),
          },
        ],
      });

      this.chartOptions.set({
        color: textColor,
        responsive: true,
        plugins: {
          datalabels: {
            color: textColor,
            anchor: 'end',
            align: 'start',
            formatter: (value: string) => `${Number(value).toFixed(2)}`,
            font: {
              size: '12rem',
              weight: 'bold',
            },
          },
          legend: {
            position: 'top',
            labels: {
              color: textColor,
              font: {
                size: 16,
              },
            },
          },
          title: {
            display: true,
            fontSize: 25,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Categoria',
              color: textColor,
            },
            ticks: { color: textColor },
          },
          y: {
            title: {
              display: true,
              text: 'Valor',
              color: textColor,
            },
            ticks: { color: textColor },
          },
        },
      });

      this.cd.markForCheck();
    }
  }
}
