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

@Component({
  selector: 'app-inputs-and-outputs-montlhy',
  imports: [ChartModule],
  template: `<div class="card !mb-8 flex flex-col items-center justify-center">
    <div class="font-semibold text-xl mb-4 self-start">Distribuição</div>
    <p-chart
      type="doughnut"
      [data]="chartData()"
      [options]="chartOptions()"
      width="350px"
      height="350px"
      [responsive]="false" />
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
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      });

      this.cd.markForCheck();
    }
  }
}
