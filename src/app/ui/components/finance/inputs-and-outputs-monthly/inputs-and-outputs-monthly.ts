import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { SelectModule, type SelectChangeEvent } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { LayoutService } from '../../../../data/services/shared/layout';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';

@Component({
  selector: 'app-inputs-and-outputs-monthly',
  imports: [ChartModule, FormsModule, TableModule, SelectModule, ButtonModule],
  templateUrl: './inputs-and-outputs-monthly.html',
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
export class InputsAndOutputsMontlhy implements OnInit {
  public layoutService = inject(LayoutService);

  public financeNotesViewModel = inject(FinanceNotesViewModel);

  public financeReportsViewModel = inject(FinanceReportsViewModel);

  public platformId = inject(PLATFORM_ID);

  private cd = inject(ChangeDetectorRef);

  public chartData = signal<unknown>(null);

  public chartOptions = signal<unknown>(null);

  public plugin = [ChartDataLabels];

  public monthAndYearList = this.financeReportsViewModel.availableMonths;

  public selectedMonthAndYear = this.financeReportsViewModel.selectedMonthAndYear;

  public onMonthAndYearChange(event: SelectChangeEvent): void {
    localStorage.setItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH', event.value);
    this.financeReportsViewModel.setSelectedMonthAndYear(event.value);
    this.financeNotesViewModel.getAllFinanceNotesDataHandler();
  }

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

    if (isPlatformBrowser(this.platformId)) {
      this.chartData.set({
        labels: ['Entradas', 'Saídas'],
        datasets: [
          {
            data: [this.financeReportsViewModel.totalOfCreditNotes(), this.financeReportsViewModel.totalOfDebitNotes()],
            backgroundColor: [documentStyle.getPropertyValue('--p-green-500'), documentStyle.getPropertyValue('--p-red-500')],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-green-400'),
              documentStyle.getPropertyValue('--p-red-400'),
            ],
          },
        ],
      });

      this.chartOptions.set({
        plugins: {
          datalabels: {
            color: textColor,
            anchor: 'center',
            align: 'center',
            formatter: (value: string) => `R$ ${Number(value).toFixed(2)}`,
            font: {
              size: '18rem',
              weight: 'bold',
            },
          },
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              color: textColor,
              font: {
                size: 16,
              },
            },
          },
        },
      });

      this.cd.markForCheck();
    }
  }
}
