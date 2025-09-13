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
import { FinanceNotesService } from './../../services/finance-notes/finance-notes.service';
import { LayoutService } from '../../../../layout/service/layout.service';
import { FinanceReportsService } from '../../services/finance-reports/finance-reports.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-inputs-and-outputs-montlhy',
  imports: [ChartModule],
  template: ` <div class="card !mb-8 h-full">
    <div class="font-semibold text-xl mb-4 self-start">Distribuição</div>
    <p-chart
      styleClass="w-full max-w-[40px]"
      type="pie"
      [data]="chartData()"
      [options]="chartOptions()"
      [responsive]="true"
      [plugins]="plugin" />
  </div>`,
})
export class InputsAndOutputsMontlhyComponent implements OnInit {
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
    if (this.financeReportsService.selectedMonthAndYear()) {
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
            data: [
              this.financeReportsService.totalOfCreditNotes(),
              this.financeReportsService.totalOfDebitNotes(),
            ],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-green-500'),
              documentStyle.getPropertyValue('--p-red-500'),
            ],
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
