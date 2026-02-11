import { computed, inject, Injectable, signal } from '@angular/core';
import { FinanceReportsRepository } from '../../../data/repositories/finance-reports/finance-reports-repository';
import { FinanceRpcRepository } from '../../../data/repositories/finance-rpc-repository/finance-rpc-repository';
import { MONTH_LABELS } from '../../../utils/constants';
import { getActualDate, getFirstMonthDay, getLastMonthDay, getPreviousDate } from '../../../utils/date';

@Injectable({ providedIn: 'root' })
export class FinanceReportsViewModel {
  private financeReportsRepository = inject(FinanceReportsRepository);

  private financeRpcRepository = inject(FinanceRpcRepository);

  public currentOpenMonth = computed(
    () => this.financeReportsRepository.financeReports().find(item => item.state === 'open')?.month
  );

  public minDate = computed(() => getFirstMonthDay(this.currentOpenMonth()!));

  public maxDate = computed(() => getLastMonthDay(this.currentOpenMonth()!));

  public availableMonths = computed(() =>
    this.financeReportsRepository
      .financeReports()
      .filter(item => item.state !== 'start')
      .map(item => item.month)
  );

  public availabeMonthsLabels = computed(() => {
    return this.availableMonths().map(item => MONTH_LABELS[item.split('/')[0]]);
  });

  public selectedMonthAndYear = signal(this.getStorageActualDate());

  public selectMonthAndYearState = computed(
    () => this.financeReportsRepository.financeReports().find(item => item.month === this.selectedMonthAndYear())?.state
  );

  public isSelectedMonthClosed = computed(() => this.selectMonthAndYearState() === 'closed');

  public openMonth = computed(() => this.financeReportsRepository.financeReports().find(item => item.state === 'open')!);

  public totalOfCreditNotes = computed(
    () => this.financeReportsRepository.financeReports().find(item => item.month === this.selectedMonthAndYear())?.inputs
  );

  public totalOfDebitNotes = computed(
    () => this.financeReportsRepository.financeReports().find(item => item.month === this.selectedMonthAndYear())?.outputs
  );

  public getLastMonthTotalBalance(): number | null {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      const lastDate = getPreviousDate(currentOpenMonth!);
      return this.financeReportsRepository.financeReports().find(item => item.month === lastDate)?.balance as number;
    } else {
      return 0.0;
    }
  }

  public getLastMonthBalance(): number | null {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      const lastDate = getPreviousDate(currentOpenMonth!);
      return this.financeReportsRepository.financeReports().find(item => item.month === lastDate)?.month_balance as number;
    } else {
      return 0;
    }
  }

  public getCurrentMonthTotalBalance(): number | null {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      return this.financeReportsRepository.financeReports().find(item => item.month === currentOpenMonth)?.balance as number;
    } else {
      return 0;
    }
  }

  public getCurrentMonthBalance(): number | null {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      return this.financeReportsRepository.financeReports().find(item => item.month === currentOpenMonth)
        ?.month_balance as number;
    } else {
      return 0;
    }
  }

  public getCurrentMonthState(): string {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      return this.financeReportsRepository.financeReports().find(item => item.month === currentOpenMonth)?.state as string;
    } else {
      return '';
    }
  }

  public getStorageActualDate(): string {
    const currentActualDate = localStorage.getItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH');
    return currentActualDate ? currentActualDate : getActualDate();
  }

  public setSelectedMonthAndYear(monthAndYear: string): void {
    this.selectedMonthAndYear.set(monthAndYear);
  }
}
