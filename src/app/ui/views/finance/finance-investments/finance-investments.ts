/* eslint-disable @typescript-eslint/naming-convention */
import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal, type OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { LoadingService } from '../../../../data/services/shared/loading/loading';
import type { Column } from '../../../../domain/models/columns.model';
import type { FinanceInvestment } from '../../../../domain/models/finance-investment.model';
import { BANK_TYPES } from '../../../../utils/constants';
import { FINANCE_INVESTMENT_FILTER_FIELDS } from '../../../../utils/options';
import { CustomValidationMessageComponent } from '../../../components/shared/custom-validation-message/custom-validation-message';
import { createInvestmentsForm } from '../../../view-models/finance-investments/finance-investments-form';
import { FinanceInvestmentsViewModel } from '../../../view-models/finance-investments/finance-investments.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { FirstAndLastnamePipe } from '../../pipes/first-and-lastname/first-and-lastname.pipe';

const PRIMENG = [
  TooltipModule,
  InputMaskModule,
  DatePickerModule,
  MessageModule,
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

const COMPONENTS = [CustomValidationMessageComponent];

const COMMON = [FormsModule, ReactiveFormsModule];

const PROVIDERS = [MessageService, ConfirmationService, FinanceInvestmentsViewModel];

const PIPES = [FirstAndLastnamePipe, DatePipe];

@Component({
  selector: 'app-finance-investments',
  imports: [...COMPONENTS, ...PRIMENG, ...COMMON, ...PIPES],
  templateUrl: './finance-investments.html',
  styleUrls: ['./finance-investments.scss'],
  providers: [...PROVIDERS],
})
export class FinanceInvestmentsComponent implements OnInit {
  public financeInvestmentsViewModel = inject(FinanceInvestmentsViewModel);

  public financeReportsViewModel = inject(FinanceReportsViewModel);

  private messageService = inject(MessageService);

  private loadingService = inject(LoadingService);

  public actionDialog = false;

  public mode = signal<'add' | 'edit'>('add');

  public modalTitle = computed(() => (this.mode() === 'add' ? 'Adicionar Investimento' : 'Editar Investimento'));

  public selectedInvestment: FinanceInvestment | null = null;

  public investmentForm = createInvestmentsForm();

  public columns!: Column[];

  public globalFilterFields = FINANCE_INVESTMENT_FILTER_FIELDS;

  public bankTypes = BANK_TYPES;

  public async ngOnInit(): Promise<void> {
    await this.financeInvestmentsViewModel.findAll();
  }

  public openAddInvestment(): void {
    this.mode.set('add');
    this.investmentForm.reset();
    this.actionDialog = true;
  }

  public openEditInvestment(investment: FinanceInvestment): void {
    this.mode.set('edit');
    this.selectedInvestment = investment;

    const { id, value, reason, account_bank } = investment;

    this.investmentForm.setValue({
      id,
      value,
      reason,
      account_bank,
    });

    this.actionDialog = true;

    this.actionDialog = true;
  }

  public hideDialog(): void {
    this.actionDialog = false;
    this.selectedInvestment = null;
    this.investmentForm.reset();
  }

  public async creatOrEditInvestment(): Promise<void> {
    this.loadingService.isLoading.set(true);

    if (this.investmentForm.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });
      this.loadingService.isLoading.set(false);
      return;
    }

    const { error } = await this.financeInvestmentsViewModel.creatOrEditInvestment(
      this.mode(),
      this.investmentForm.value as FinanceInvestment,
      this.financeReportsViewModel.getCurrentMonthTotalBalance()!
    );

    if (!error) {
      if (this.mode() === 'add') {
        await this.financeInvestmentsViewModel.findAll();
        await this.financeReportsViewModel.findAll();
      } else if (this.mode() === 'edit') {
        await this.financeInvestmentsViewModel.findAll();
      }
    }

    this.loadingService.isLoading.set(false);

    this.hideDialog();
  }
}
