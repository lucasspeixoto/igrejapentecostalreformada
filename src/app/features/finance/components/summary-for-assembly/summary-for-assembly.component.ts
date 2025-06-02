import {
  ChangeDetectorRef,
  Component,
  computed,
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
import { MONTH_LABELS } from 'src/app/utils/constants';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const randomColors = (items: number[]): string[] =>
  items.map(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  });

@Component({
  selector: 'app-summary-for-assembly',
  imports: [ChartModule],
  template: `<div class="card !mb-8 h-full">
    <div class="flex flex-wrap justify-between items-center mb-3 px-2 md:px-8">
      <h1 class="md:hidden block text-lg md:text-2xl font-bold self-start text-primary mb-4">
        {{ chartMonthText() }}
      </h1>
      <div
        class="my-4 md:mb-0 w-full md:w-1/4 gap-4 flex flex-row md:flex-col flex-wrap justify-between">
        <h1 class="hidden md:block text-lg md:text-2xl font-bold text-primary mb-4">
          {{ chartMonthText() }}
        </h1>
        <div class="mb-1">
          <span class="text-md md:text-xl font-semibold">Entradas Orgânicas</span>
          <p class="text-md md:text-xl text-green-400 font-bold ">
            R$
            {{ financeReportsService.totalOfOrganicNotes().toFixed(2) }}
          </p>
        </div>
        <div class="mb-1">
          <span class="text-md md:text-xl font-semibold">Entradas de Campanhas</span>
          <p class="text-md md:text-xl text-green-400 font-bold ">
            R$ {{ financeReportsService.totalOfCampaignNotes().toFixed(2) }}
          </p>
        </div>
        <div class="mb-1">
          <span class="text-md md:text-xl font-semibold">Entradas Seminário</span>
          <p class="text-md md:text-xl text-green-400 font-bold ">
            R$ {{ financeReportsService.totalOfSeminarNotes().toFixed(2) }}
          </p>
        </div>
        <div class="mb-1">
          <span class="text-md md:text-xl font-semibold">Despesas</span>
          <p class="text-md md:text-xl font-bold text-red-400">
            R$ {{ financeReportsService.totalOfDebitNotes()?.toFixed(2) }}
          </p>
        </div>
        <div class="mb-1">
          <span class="text-md md:text-xl font-semibold">Resultado</span>
          <p class="text-md md:text-xl text-primary font-bold ">
            R$ {{ financeReportsService.getCurrentMonthBalance()?.toFixed(2) }}
          </p>
        </div>
      </div>

      <div class="hidden sm:block w-full md:w-3/4 max-w-full">
        <p-chart
          class="w-full max-w-[40px]"
          type="bar"
          [data]="chartData()"
          [options]="chartOptions()"
          [plugins]="plugin"
          [responsive]="true" />
      </div>
    </div>
  </div>`,
  styles: [
    `
      .card {
        padding: 0.2rem;
      }
    `,
  ],
})
export class SummaryForAssemblyComponent implements OnInit {
  public layoutService = inject(LayoutService);

  public financeNotesService = inject(FinanceNotesService);

  public financeReportsService = inject(FinanceReportsService);

  public monthLabels = MONTH_LABELS;

  public plugin = [ChartDataLabels];

  public chartMonthText = computed(() => {
    const selectedMonthAndYear = this.financeReportsService.selectedMonthAndYear();

    const month = selectedMonthAndYear.split('/')[0];

    const year = selectedMonthAndYear.split('/')[1];

    return `${this.monthLabels[month]} ${year}`;
  });

  public allDebitNotesData = computed(() => {
    return this.financeNotesService.getAllDebitNotesData();
  });

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

    if (isPlatformBrowser(this.platformId) && this.allDebitNotesData().length > 0) {
      const chartData = this.allDebitNotesData().map(item => item.total);
      this.chartData.set({
        labels: this.allDebitNotesData().map(item => item.name),
        datasets: [
          {
            label: 'Distribuição por categoria',
            data: this.allDebitNotesData().map(item => item.total),
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
              text: 'Categoria', // Optional Y-axis title
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
