import { Component, computed, inject, model, OnInit, signal, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FinanceNote, FinanceNoteProcess } from '../../models/finance-note.model';
import { createFinanceNoteForm, FinanceNoteFormValue } from '../../constants/finance-note-form';
import { CustomValidationMessageComponent } from '../../../../components/custom-validation-message/custom-validation-message';
import { FINANCE_NOTES_FILTER_FIELDS, TYPES } from '../../constants/options';
import { ExcelService } from '../../../../services/excel/excel.service';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';
import { FinanceNoteCategoryService } from '../../services/category/finance-note-category.service';
import { MembersService } from '../../../members/services/members.service';
import { ExportColumn, Column } from '../../../../models/columns.model';
import { FinanceReportsService } from '../../services/finance-reports/finance-reports.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { LoadingService } from '../../../../services/loading/loading.service';
import { getFirstMonthDay, getLastMonthDay } from '../../../../utils/date';
import { FirstAndLastnamePipe } from '../../../../pipes/first-and-lastname/first-and-lastname.pipe';
import { PrimengDatePipe } from '../../../../pipes/primeng-date/primeng-date.pipe';
import { AuditValidationWarningsComponent } from '../../components/audit-validation-warnings/audit-validation-warnings.component';
import { FinanceDataHandleService } from '../../services/finance-data-handle/finance-data-handle.service';
import { FinanceNoteExcel } from '../../models/finance-note-excel.model';

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
  AuditValidationWarningsComponent,
];

const PROVIDERS = [MessageService, ConfirmationService, DatePipe];

const PIPES = [FirstAndLastnamePipe, PrimengDatePipe];

const NOTES_IDS_TO_CONCAT = [
  '8201e81e-85b8-4f7b-b981-b080d169d098', // Dízimo
  '7d89aa42-fe6c-49e1-895e-75a3e4775336', // Seminário I
  '5ff7e8dc-fa61-4431-b045-39d2a4cb88ce', // Seminário II
  '3e7d0fc7-f253-43bc-9af3-529726936e58', // Seminário III
  '58f22367-5dcd-44df-8889-da79f4b56401', // Seminário IIII
];

@Component({
  selector: 'app-finance-notes',
  imports: [...PRIMENG, ...COMMON, ...PIPES],
  templateUrl: './finance-notes.component.html',
  providers: [...PROVIDERS],
  styles: [
    `
      :host ::ng-deep .p-frozen-column {
        font-weight: bold;
      }

      :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
      }

      :host ::ng-deep {
        .p-button:disabled {
          cursor: not-allowed;
        }
      }

      ::ng-deep {
        .p-inputmask,
        .p-inputnumber,
        .p-datepicker {
          width: 100%;
        }
      }

      @media (max-width: 450px) {
        .p-iconfield {
          width: 100%;
        }
      }
    `,
  ],
})
export class FinanceNotesComponent implements OnInit, OnDestroy {
  private loadingService = inject(LoadingService);

  public financeNotesService = inject(FinanceNotesService);

  public financeReportsService = inject(FinanceReportsService);

  public financeNoteCategoryService = inject(FinanceNoteCategoryService);

  public membersService = inject(MembersService);

  private messageService = inject(MessageService);

  private confirmationService = inject(ConfirmationService);

  private excelService = inject(ExcelService<FinanceNoteExcel>);

  private authenticationService = inject(AuthenticationService);

  private financeDataHandleService = inject(FinanceDataHandleService);

  private datePipe = inject(DatePipe);

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

  public monthAndYearList = this.financeReportsService.availableMonths;

  public notesIdsToContact = NOTES_IDS_TO_CONCAT;

  public isSelectedMonthClosed = computed(
    () => this.financeReportsService.selectMonthAndYearState() === 'closed'
  );

  public initialValue!: number;

  public initialType!: 'C' | 'D';

  public minDate: Date | undefined;

  public maxDate!: Date | undefined;

  public selectedNotesCategory = model(null);

  public expandedRows = {};

  public ngOnInit(): void {
    this.membersService.getAllMembersDataHandler();
    this.financeNoteCategoryService.getAllFinanceCategoryDataHandler();

    this.computeMinAndMaxAvailableDates();
  }

  public checkNoteHandler(financeNote: FinanceNote): void {
    if (this.isSelectedMonthClosed()) return;

    const updatedFinanceNote = {
      ...financeNote,
      is_checked: !financeNote.is_checked,
    };
    this.financeNotesService.updateFinanceNoteCheckHandler(updatedFinanceNote);
  }

  public computeMinAndMaxAvailableDates(): void {
    this.minDate = getFirstMonthDay(this.financeReportsService.currentOpenMonth()!);

    this.maxDate = getLastMonthDay(this.financeReportsService.currentOpenMonth()!);
  }

  public downloadFinanceNoteExcel(): void {
    const financeNotesExcel = this.financeDataHandleService.generateFinanceNotesForCSV(
      this.financeNotesService.financeNotes()
    );

    this.excelService.exportToExcel(financeNotesExcel, 'Notas Financeiras');
  }

  public clearMember(): void {
    this.financeNoteForm.get('member')?.setValue(null);
  }

  public onMonthAndYearChange(event: DropdownChangeEvent): void {
    localStorage.setItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH', event.value);
    this.financeReportsService.selectedMonthAndYear.set(event.value);
    this.financeNotesService.getAllFinanceNotesDataHandler();

    this.computeMinAndMaxAvailableDates();
  }

  public onCategoryFilterChange(event: DropdownChangeEvent): void {
    if (event.value) {
      this.financeNotesService.getAllFinanceNotesByCategory(event.value);
    } else {
      this.financeNotesService.getAllFinanceNotesDataHandler();
    }
  }

  public onCategoryChange(event: DropdownChangeEvent): void {
    const selectedCategoryId = event.value;

    const selectedCategoryType = this.financeNoteCategoryService
      .financeNoteCategory()
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

        const error = await this.financeNotesService.deleteFinanceNoteHandler(financeNote.id);

        if (!error) {
          await this.financeReportsService.processNewBalancesForDeleteNote(financeNote);
        }

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

    const transformedMemberData = {
      ...financeNoteFormData,
      date: this.datePipe.transform(financeNoteFormData.date, 'yyyy-MM-dd'),
    } as FinanceNoteFormValue;

    if (this.mode() === 'add') {
      const financeNote = this.createNewFinanceNoteData(transformedMemberData);
      const { insertData, insertError } =
        await this.financeNotesService.insertFinanceNoteHandler(financeNote);
      if (!insertError)
        await this.financeReportsService.processNewBalancesForAddNote(financeNote, insertData!.id);
    } else if (this.mode() === 'edit') {
      const financeNote = this.createUpdatedFinanceNoteData(transformedMemberData);
      const error = await this.financeNotesService.updateFinanceNoteHandler(financeNote);
      if (!error) {
        await this.financeReportsService.processNewBalancesForEditNote(
          this.initialType,
          this.initialValue,
          financeNote
        );
      }
    }

    this.loadingService.isLoading.set(false);

    this.hideDialog();
  }

  public createNewFinanceNoteData(transformedMemberData: FinanceNoteFormValue): FinanceNote {
    return {
      created_at: new Date().toISOString(),
      date: transformedMemberData.date,
      user_id: this.authenticationService.currentUser()?.id,
      description: transformedMemberData.description,
      category_id: transformedMemberData.category,
      member_id: transformedMemberData.member !== '' ? transformedMemberData.member : null,
      type: transformedMemberData.type,
      value: transformedMemberData.value,
    } as FinanceNote;
  }

  public createUpdatedFinanceNoteData(transformedMemberData: FinanceNoteFormValue): FinanceNote {
    return {
      id: transformedMemberData.id,
      created_at: new Date().toISOString(),
      date: transformedMemberData.date,
      user_id: this.authenticationService.currentUser()?.id,
      description: transformedMemberData.description,
      category_id: transformedMemberData.category,
      member_id: transformedMemberData.member !== '' ? transformedMemberData.member : null,
      type: transformedMemberData.type,
      value: transformedMemberData.value,
    } as FinanceNote;
  }

  public async closeCurrentMonth(): Promise<void> {
    const openedMonthFinanceReport = this.financeReportsService
      .financeReports()
      .find(item => item.state === 'open')!;

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
      accept: () => {
        this.financeReportsService.closeCurrentMonth(openedMonthFinanceReport);
      },
    });
  }

  public hideDialog(): void {
    this.financeNoteForm.reset();
    this.actionDialog = false;
  }

  public ngOnDestroy(): void {
    if (this.selectedNotesCategory()) this.financeNotesService.getAllFinanceNotesDataHandler();
  }
}
