/* eslint-disable @typescript-eslint/naming-convention */
import { Component, computed, inject, model, signal, type OnInit } from '@angular/core';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import type { FinanceNote, FinanceNoteProcess } from '../../../../domain/models/finance-note.model';
import { DatePipe } from '@angular/common';
import type { Column, ExportColumn } from '../../../../domain/models/columns.model';
import { FINANCE_NOTES_FILTER_FIELDS, NOTES_IDS_TO_CONCAT, TYPES } from '../../../../utils/options';
import { createFinanceNoteForm, type FinanceNoteFormValue } from '../../../view-models/finance-notes/finance-note-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule, type SelectChangeEvent } from 'primeng/select';
import { TableModule, type Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { CustomValidationMessageComponent } from '../../../components/shared/custom-validation-message/custom-validation-message';
import { FirstAndLastnamePipe } from '../../pipes/first-and-lastname/first-and-lastname.pipe';
import { PrimengDatePipe } from '../../pipes/primeng-date/primeng-date.pipe';
import { RatingModule } from 'primeng/rating';
import type { FinanceNoteExcel } from '../../../../domain/models/finance-note-excel.model';
import { ExcelService } from '../../../../data/services/shared/excel';
import { LoadingService } from '../../../../data/services/shared/loading/loading';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceNoteCategoriesViewModel } from '../../../view-models/finance-note-categories/finance-note-categories.view-model';
import { MembersViewModel } from '../../../view-models/members/members.view-model';
import { AuthenticationViewModel } from '../../../view-models/auth/authentication/authentication.view-model';
import { AuditValidationWarnings } from '../../../components/finance/audit-validation-warnings/audit-validation-warnings';
import { getNextMonthDate } from '../../../../utils/date';

const PRIMENG = [
  TooltipModule,
  InputMaskModule,
  DatePickerModule,
  TableModule,
  ButtonModule,
  ToastModule,
  ToolbarModule,
  RatingModule,
  InputTextModule,
  TextareaModule,
  SelectModule,
  InputNumberModule,
  DialogModule,
  TagModule,
  InputIconModule,
  IconFieldModule,
  ConfirmDialogModule,
];

const COMMON = [
  FormsModule,
  ReactiveFormsModule,
  CustomValidationMessageComponent,
  AuditValidationWarnings,
];

const PROVIDERS = [
  MessageService,
  ConfirmationService,
  DatePipe,
  AuthenticationViewModel,
  MembersViewModel,
];

const PIPES = [FirstAndLastnamePipe, PrimengDatePipe];

@Component({
  selector: 'app-finance-notes',
  imports: [...PRIMENG, ...COMMON, ...PIPES],
  templateUrl: './finance-notes.html',
  styleUrl: './finance-notes.scss',
  providers: [...PROVIDERS],
})
export class FinanceNotes implements OnInit {
  public authenticationViewModel = inject(AuthenticationViewModel);

  public membersViewModel = inject(MembersViewModel);

  public financeReportsViewModel = inject(FinanceReportsViewModel);

  public financeNotesViewModel = inject(FinanceNotesViewModel);

  public financeNoteCategoriesViewModel = inject(FinanceNoteCategoriesViewModel);

  private messageService = inject(MessageService);

  private confirmationService = inject(ConfirmationService);

  private loadingService = inject(LoadingService);

  private excelService = inject(ExcelService<FinanceNoteExcel>);

  private datePipe = inject(DatePipe);

  public selectedMonthAndYear = model(this.financeReportsViewModel.selectedMonthAndYear());

  public selectedFinanceNote: FinanceNote | null = null;

  public actionDialog: boolean = false;

  public mode = signal<FinanceNoteProcess>('add');

  public modalTitle = computed(() => (this.mode() === 'add' ? 'Adicionar Nota' : 'Editar Nota'));

  public exportColumns!: ExportColumn[];

  public columns!: Column[];

  public globalFilterFields = FINANCE_NOTES_FILTER_FIELDS;

  public financeNoteForm = createFinanceNoteForm();

  public types = TYPES;

  public filteredValues!: FinanceNote[];

  public monthAndYearList = this.financeReportsViewModel.availableMonths;

  public notesIdsToContact = NOTES_IDS_TO_CONCAT;

  public isSelectedMonthClosed = this.financeReportsViewModel.isSelectedMonthClosed;

  public initialValue!: number;

  public initialType!: 'C' | 'D';

  public minDate = this.financeReportsViewModel.minDate;

  public maxDate = this.financeReportsViewModel.maxDate;

  public selectedNotesCategory = model(null);

  public expandedRows = {};

  public async ngOnInit(): Promise<void> {
    await this.membersViewModel.findAll();
    await this.financeNoteCategoriesViewModel.findAll();
  }

  public async checkNoteHandler(financeNote: FinanceNote): Promise<void> {
    if (this.isSelectedMonthClosed()) return;

    const {error} = await this.financeNotesViewModel.updateFinanceNoteCheck(financeNote);

    if(!error) await this.financeNotesViewModel.getAllFinanceNotesDataHandler();
  }

  public downloadFinanceNoteExcel(): void {
    const financeNotesExcel = this.financeNotesViewModel.generateFinanceNotesForCSV();

    this.excelService.exportToExcel(financeNotesExcel, 'Notas Financeiras');
  }

  public clearMember(): void {
    this.financeNoteForm.get('member')?.setValue(null);
  }

  public onMonthAndYearChange(event: SelectChangeEvent): void {
    localStorage.setItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH', event.value);
    this.financeReportsViewModel.setSelectedMonthAndYear(event.value);
    this.financeNotesViewModel.getAllFinanceNotesDataHandler();
  }

  public async onCategoryFilterChange(event: SelectChangeEvent): Promise<void> {
    if (event.value) {
      await this.financeNotesViewModel.getAllFinanceNotesByCategory(event.value);
    } else {
      await this.financeNotesViewModel.getAllFinanceNotesDataHandler();
    }
  }

  public onCategoryChange(event: SelectChangeEvent): void {
    const selectedCategoryId = event.value;

    const selectedCategoryType = this.financeNoteCategoriesViewModel
      .financeNoteTypes()
      .find(item => item.id === selectedCategoryId)?.type;

    this.financeNoteForm.get('type')?.setValue(selectedCategoryType!);
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openAddFinanceNote(): void {
    this.mode.set('add');
    this.financeNoteForm.reset();
    this.actionDialog = true;
  }

  public openUpdateFinanceNote(financeNote: FinanceNote): void {
    this.mode.set('edit');

    const { id, value, type, date, category_id, member_id, description } = financeNote;

    this.financeNoteForm.setValue({
      id,
      value,
      type,
      date,
      category: category_id,
      member: member_id,
      description,
    });

    this.initialValue = value;

    this.initialType = type;

    this.actionDialog = true;
  }

  public deleteSelectedFinanceNotes(): void {
    this.openDeleteFinanceNote(this.selectedFinanceNote!);
  }

  public async openDeleteFinanceNote(financeNote: FinanceNote): Promise<void> {
    this.mode.set('delete');

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta nota',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: async () => {
        this.loadingService.isLoading.set(true);

        const { error } = await this.financeNotesViewModel.deleteFinanceNote({ p_note_id: financeNote!.id });

        if (!error) this.refetchFinanceNotesAndReports()

        this.loadingService.isLoading.set(false);
      },
    });
  }

  public async saveFinanceNoteHandler(): Promise<void> {
    if (this.financeNoteForm.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });

      return;
    }

    this.loadingService.isLoading.set(true);

    const financeNoteFormData = this.financeNoteForm.value;

    const transformedFinanceNoteFormData = {
      ...financeNoteFormData,
      date: this.datePipe.transform(financeNoteFormData.date, 'yyyy-MM-dd'),
    } as FinanceNoteFormValue;

    const userId = this.authenticationViewModel.currentSession()?.user.id as string;

    if (this.mode() === 'add') {
      const financeNote = this.financeNotesViewModel.generateFinanceNoteAddParameters(transformedFinanceNoteFormData, userId);
      const { error } = await this.financeNotesViewModel.createFinanceNote(financeNote);
      if (!error) this.refetchFinanceNotesAndReports();
    } else if (this.mode() === 'edit') {
      const financeNote = this.financeNotesViewModel.generateFinanceNoteEditParameters(transformedFinanceNoteFormData, userId);
      const { error } = await this.financeNotesViewModel.editFinanceNote(financeNote);
      if (!error) this.refetchFinanceNotesAndReports();
    }

    this.loadingService.isLoading.set(false);

    this.hideDialog();
  }

  public refetchFinanceNotesAndReports(): void {
    this.financeNotesViewModel.getAllFinanceNotesDataHandler();
    this.financeNotesViewModel.getAllFinanceReportsDataHandler();
  }

  public async closeCurrentMonth(): Promise<void> {
    const openedMonthFinanceReport = this.financeReportsViewModel.openMonth();

    const openMonthDate = openedMonthFinanceReport?.month;

    this.confirmationService.confirm({
      message: `Tem certeza que deseja fechar o mês atual (${openMonthDate}) ?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'success',
      },
      rejectButtonProps: {
        label: 'Não',
        severity: 'danger',
      },
      accept: async () => {
        const { error } = await this.financeNotesViewModel.closeCurrentMonth();

        if (!error) {
          const nextOpenMonth = getNextMonthDate(openMonthDate);
          this.financeReportsViewModel.setSelectedMonthAndYear(nextOpenMonth);
          localStorage.setItem(
            'IPR-SISTEMA-GESTAO:CURRENT-MONTH',
            nextOpenMonth
          );

          this.refetchFinanceNotesAndReports()
        };

      },
    });
  }

  public hideDialog(): void {
    this.financeNoteForm.reset();
    this.actionDialog = false;
  }
}
