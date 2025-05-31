import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { LoadingService } from '../../../../services/loading/loading.service';
import { FinanceReports } from '../../models/finance-reports.model';
import { getActualDate, getNextMonthDate, getPreviousDate } from '../../../../utils/date';
import { FinanceNotesService } from '../finance-notes/finance-notes.service';
import { FinanceNote } from '../../models/finance-note.model';
import { MONTH_LABELS } from '../../../../utils/constants';
import { ORGANIC_CREDIT_IDS, SEMINAR_IDS } from '../../constants/options';

@Injectable({
  providedIn: 'root',
})
export class FinanceReportsService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public financeNotesService = inject(FinanceNotesService);

  public financeReports = signal<FinanceReports[]>([]);

  public monthLabels = MONTH_LABELS;

  public seminarIds = SEMINAR_IDS;

  public organicCreditIds = ORGANIC_CREDIT_IDS;

  public availableMonths = computed(() =>
    this.financeReports()
      .filter(item => item.state !== 'start')
      .map(item => item.month)
  );

  public availabeMonthsLabels = computed(() => {
    return this.availableMonths().map(item => this.monthLabels[item.split('/')[0]]);
  });

  public inputs = computed(() =>
    this.financeReports()
      .filter(item => item.state !== 'start')
      .map(item => item.inputs)
  );

  public outputs = computed(() =>
    this.financeReports()
      .filter(item => item.state !== 'start')
      .map(item => item.outputs)
  );

  public monthBalances = computed(() =>
    this.financeReports()
      .filter(item => item.state !== 'start')
      .map(item => item.month_balance)
  );

  public selectedMonthAndYear = signal(this.getStorageActualDate());

  public selectMonthAndYearState = computed(
    () => this.financeReports().find(item => item.month === this.selectedMonthAndYear())?.state
  );

  public currentOpenMonth = computed(
    () => this.financeReports().find(item => item.state === 'open')?.month
  );

  public totalOfCreditNotes = computed(
    () => this.financeReports().find(item => item.month === this.selectedMonthAndYear())?.inputs
  );

  public totalOfDebitNotes = computed(
    () => this.financeReports().find(item => item.month === this.selectedMonthAndYear())?.outputs
  );

  public currentYear = computed(() => this.selectedMonthAndYear().split('/')[1]);

  public totalOfCampaignNotes = computed(() => {
    return this.financeNotesService
      .financeNotes()
      .filter(
        item => item.type === 'C' && item.category_id === '545faf46-4161-4d0b-9a98-026dde981be6'
      )
      .map(item => item.value)
      .reduce((acc, curr) => acc + curr, 0);
  });

  public totalOfSeminarNotes = computed(() => {
    return this.financeNotesService
      .financeNotes()
      .filter(item => item.type === 'C' && this.seminarIds.includes(item.category_id))
      .map(item => item.value)
      .reduce((acc, curr) => acc + curr, 0);
  });

  public totalOfOrganicNotes = computed(() => {
    return this.financeNotesService
      .financeNotes()
      .filter(item => this.organicCreditIds.includes(item.category_id))
      .map(item => item.value)
      .reduce((acc, curr) => acc + curr, 0);
  });

  public getStorageActualDate(): string {
    const currentActualDate = localStorage.getItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH');
    return currentActualDate ? currentActualDate : getActualDate();
  }

  public async getAllFinanceReportsDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('finance_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) this.financeReports.set(data);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.financeReports.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar relatórios, tente novamente mais tarde!',
        life: 3000,
      });
    }
  }

  public getLastMonthTotalBalance(): number | null {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      const lastDate = getPreviousDate(currentOpenMonth!);
      return this.financeReports().find(item => item.month === lastDate)?.balance!;
    } else {
      return 0.0;
    }
  }

  public getLastMonthBalance(): number | null {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      const lastDate = getPreviousDate(currentOpenMonth!);
      return this.financeReports().find(item => item.month === lastDate)?.month_balance!;
    } else {
      return 0;
    }
  }

  public getCurrentMonthBalance(): number | null {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      return this.financeReports().find(item => item.month === currentOpenMonth)?.month_balance!;
    } else {
      return 0;
    }
  }

  public getCurrentMonthTotalBalance(): number | null {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      return this.financeReports().find(item => item.month === currentOpenMonth)?.balance!;
    } else {
      return 0;
    }
  }

  public getCurrentMonthState(): string {
    const currentOpenMonth = this.selectedMonthAndYear();

    if (currentOpenMonth) {
      return this.financeReports().find(item => item.month === currentOpenMonth)?.state!;
    } else {
      return '';
    }
  }

  public showErrorInCurrentMonthClose(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Erro',
      detail: 'Erro fechar mês, verifique as informações!',
      life: 3000,
    });
  }

  public async processNewBalancesForAddNote(financeNote: FinanceNote): Promise<void> {
    const openedMonthFinanceReport = this.financeReports().find(item => item.state === 'open')!;

    let monthBalace = openedMonthFinanceReport.month_balance;

    let monthTotalBalace = openedMonthFinanceReport.balance;

    let inputs = openedMonthFinanceReport.inputs;

    let outputs = openedMonthFinanceReport.outputs;

    if (financeNote.type === 'C') {
      monthBalace += financeNote.value;
      monthTotalBalace += financeNote.value;
      inputs += financeNote.value;
    } else {
      monthBalace -= financeNote.value;
      monthTotalBalace -= financeNote.value;
      outputs += financeNote.value;
    }

    const updatedFinanceReport = {
      ...openedMonthFinanceReport,
      month_balance: monthBalace,
      balance: monthTotalBalace,
      inputs,
      outputs,
    };

    const { error } = await this.supabase
      .from('finance_reports')
      .update([updatedFinanceReport])
      .eq('id', openedMonthFinanceReport.id);

    if (error) {
      this.financeNotesService.deleteFinanceNoteHandler(financeNote.id);
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao inserir nota. tente novamente!',
        life: 3000,
      });
    } else {
      this.getAllFinanceReportsDataHandler();
      this.financeNotesService.updateCurrentFinanceNotesList();
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Nota inserida com sucesso!',
        life: 3000,
      });
    }

    this.loadingService.isLoading.set(false);
  }

  public async processNewBalancesForDeleteNote(financeNote: FinanceNote): Promise<void> {
    const openedMonthFinanceReport = this.financeReports().find(item => item.state === 'open')!;

    let monthBalace = openedMonthFinanceReport.month_balance;

    let monthTotalBalace = openedMonthFinanceReport.balance;

    let inputs = openedMonthFinanceReport.inputs;

    let outputs = openedMonthFinanceReport.outputs;

    if (financeNote.type === 'C') {
      monthTotalBalace -= financeNote.value;
      monthBalace -= financeNote.value;
      inputs -= financeNote.value;
    } else {
      monthBalace += financeNote.value;
      monthTotalBalace += financeNote.value;
      outputs -= financeNote.value;
    }

    const updatedFinanceReport = {
      ...openedMonthFinanceReport,
      month_balance: monthBalace,
      balance: monthTotalBalace,
      inputs,
      outputs,
    };

    const { error } = await this.supabase
      .from('finance_reports')
      .update([updatedFinanceReport])
      .eq('id', openedMonthFinanceReport.id);

    if (error) {
      this.financeNotesService.insertFinanceNoteHandler(financeNote);
    } else {
      this.getAllFinanceReportsDataHandler();
      this.financeNotesService.updateCurrentFinanceNotesList();
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Nota excluída com sucesso!',
        life: 3000,
      });
    }

    this.loadingService.isLoading.set(false);
  }

  public async processNewBalancesForEditNote(
    initialType: 'C' | 'D',
    initialValue: number,
    financeNote: FinanceNote
  ): Promise<void> {
    const openedMonthFinanceReport = this.financeReports().find(item => item.state === 'open')!;

    let monthBalace = openedMonthFinanceReport.month_balance;

    let monthTotalBalace = openedMonthFinanceReport.balance;

    let inputs = openedMonthFinanceReport.inputs;

    let outputs = openedMonthFinanceReport.outputs;

    // --------- Process deleting the previous note
    if (initialType === 'C') {
      monthTotalBalace -= initialValue;
      monthBalace -= initialValue;
      inputs -= initialValue;
    } else {
      monthBalace += initialValue;
      monthTotalBalace += initialValue;
      outputs -= initialValue;
    }

    // --------- Process adding the new(edited) note
    if (financeNote.type === 'C') {
      monthBalace += financeNote.value;
      monthTotalBalace += financeNote.value;
      inputs += financeNote.value;
    } else {
      monthBalace -= financeNote.value;
      monthTotalBalace -= financeNote.value;
      outputs += financeNote.value;
    }

    const updatedFinanceReport = {
      ...openedMonthFinanceReport,
      month_balance: monthBalace,
      balance: monthTotalBalace,
      inputs,
      outputs,
    };

    const { error } = await this.supabase
      .from('finance_reports')
      .update([updatedFinanceReport])
      .eq('id', openedMonthFinanceReport.id);

    if (error) {
      this.financeNotesService.deleteFinanceNoteHandler(financeNote.id);
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao editar nota, ela foi excluída, adicione novamente!',
        life: 3000,
      });
    } else {
      this.getAllFinanceReportsDataHandler();
      this.financeNotesService.updateCurrentFinanceNotesList();
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Nota alterada com sucesso!',
        life: 3000,
      });
    }

    this.loadingService.isLoading.set(false);
  }

  public async closeCurrentMonth(financeReports: FinanceReports | null): Promise<void> {
    if (!financeReports) {
      this.showErrorInCurrentMonthClose();
      return;
    }

    this.loadingService.isLoading.set(true);

    const closedMonthData = {
      ...financeReports,
      state: 'closed',
    } as FinanceReports;

    const { error } = await this.supabase
      .from('finance_reports')
      .update([closedMonthData])
      .eq('id', financeReports.id);

    if (!error) {
      const newOpenedMonthData = {
        created_at: new Date().toISOString(),
        balance: financeReports.balance,
        month: getNextMonthDate(financeReports.month),
        month_balance: 0,
        state: 'open',
        inputs: 0,
        outputs: 0,
      };

      const { error: newReportError } = await this.supabase
        .from('finance_reports')
        .insert([newOpenedMonthData]);

      if (newReportError) {
        this.showErrorInCurrentMonthClose();
      } else {
        this.selectedMonthAndYear.set(getNextMonthDate(financeReports.month));
        localStorage.setItem(
          'IPR-SISTEMA-GESTAO:CURRENT-MONTH',
          getNextMonthDate(financeReports.month)
        );

        this.getAllFinanceReportsDataHandler();
        this.financeNotesService.getAllFinanceNotesDataHandler();
      }
    } else {
      this.showErrorInCurrentMonthClose();
    }

    this.loadingService.isLoading.set(false);
  }
}
