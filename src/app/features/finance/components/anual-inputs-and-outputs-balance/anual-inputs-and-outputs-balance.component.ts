import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';
import { LayoutService } from '../../../../layout/service/layout.service';
import { FinanceReportsService } from '../../services/finance-reports/finance-reports.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-anual-inputs-and-outputs-balance',
  imports: [ChartModule],
  template: `<div class="card !mb-8  h-full">
    <div class="font-semibold text-xl mb-4">
      Balanço anual ({{ financeReportsService.currentYear() }})
    </div>
    <p-chart
      [plugins]="plugin"
      [responsive]="true"
      type="line"
      [data]="chartData()"
      [options]="chartOptions()" />
  </div>`,
})
export class AnualInputsAndOutputsBalanceComponent implements OnInit {
  public layoutService = inject(LayoutService);

  public financeNotesService = inject(FinanceNotesService);

  public financeReportsService = inject(FinanceReportsService);

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
    if (this.financeReportsService.financeReports()) {
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
        labels: this.financeReportsService.availabeMonthsLabels().reverse(),
        datasets: [
          {
            type: 'line',
            label: 'Balanço',
            borderColor: textColor,
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            data: this.financeReportsService.monthBalances().reverse(),
          },
          {
            type: 'bar',
            label: 'Entradas',
            backgroundColor: documentStyle.getPropertyValue('--p-green-500'),

            data: this.financeReportsService.inputs().reverse(),
          },
          {
            type: 'bar',
            label: 'Saídas',
            backgroundColor: documentStyle.getPropertyValue('--p-red-500'),
            data: this.financeReportsService.outputs().reverse(),
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
}
