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

@Component({
  selector: 'app-anual-inputs-and-outputs-balance',
  imports: [ChartModule],
  template: `<div class="card !mb-8">
    <div class="font-semibold text-xl mb-4">
      Balanço anual ({{ financeReportsService.currentYear() }})
    </div>
    <p-chart type="line" [data]="chartData()" [options]="chartOptions()" />
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
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

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
            borderColor: documentStyle.getPropertyValue('--p-green-800'),
            borderWidth: 1,
            data: this.financeReportsService.inputs().reverse(),
          },
          {
            type: 'bar',
            label: 'Saídas',
            backgroundColor: documentStyle.getPropertyValue('--p-red-500'),
            borderColor: documentStyle.getPropertyValue('--p-red-800'),
            borderWidth: 1,
            data: this.financeReportsService.outputs().reverse(),
          },
        ],
      });

      this.chartOptions.set({
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      });

      this.cd.markForCheck();
    }
  }
}
