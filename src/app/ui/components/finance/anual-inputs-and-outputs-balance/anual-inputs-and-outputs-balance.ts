import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { FormsModule } from '@angular/forms';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ButtonModule } from 'primeng/button';
import { SelectModule, type SelectChangeEvent } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { LayoutService } from '../../../../data/services/shared/layout';
import { AnualInputsAndOutputsBalanceViewModel } from '../../../view-models/finance-charts/anual-inputs-and-outputs-balance.view-model';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';

@Component({
  selector: 'app-anual-inputs-and-outputs-balance',
  imports: [ChartModule, FormsModule, TableModule, SelectModule, ButtonModule],
  templateUrl: './anual-inputs-and-outputs-balance.html',
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
export class AnualInputsAndOutputs implements OnInit {
  public layoutService = inject(LayoutService);

  public financeNotesViewModel = inject(FinanceNotesViewModel);

  public financeReportsViewModel = inject(FinanceReportsViewModel);

  public anualInputsAndOutputsBalanceViewModel = inject(AnualInputsAndOutputsBalanceViewModel);

  public platformId = inject(PLATFORM_ID);

  private cd = inject(ChangeDetectorRef);

  public chartData = signal<unknown>(null);

  public chartOptions = signal<unknown>(null);

  public plugin = [ChartDataLabels];

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
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.chartData.set({
        labels: this.financeReportsViewModel.availabeMonthsLabelsInAYear(),
        datasets: [
          {
            type: 'line',
            label: 'Balanço',
            borderColor: textColor,
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            data: this.financeReportsViewModel.monthBalancesInAYear(),
          },
          {
            type: 'bar',
            label: 'Entradas',
            backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
            data: this.financeReportsViewModel.inputs(),
          },
          {
            type: 'bar',
            label: 'Saídas',
            backgroundColor: documentStyle.getPropertyValue('--p-red-500'),
            data: this.financeReportsViewModel.outputs(),
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
            formatter: (value: string) => `R$ ${Number(value).toFixed(2)}`,
            font: {
              size: '10rem',
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
              display: false,
              text: 'Mês', // Optional Y-axis title
              color: textColor,
            },
            ticks: { color: textColor },
          },
          y: {
            title: {
              display: true,
              text: 'Valor', // Optional Y-axis title
              color: textColor,
            },
            ticks: { color: textColor },
          },
        },
      });

      this.cd.markForCheck();
    }
  }

  public updateInputsAndOutputsBalanceHandler(event: SelectChangeEvent): void {
    this.financeReportsViewModel.setSelectedYear(event.value);
  }
}
