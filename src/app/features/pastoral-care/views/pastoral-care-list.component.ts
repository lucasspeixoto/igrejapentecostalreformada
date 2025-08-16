import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FluidModule } from 'primeng/fluid';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';

import { ExcelService } from '../../../services/excel/excel.service';
import { ExportColumn, Column } from '../../../models/columns.model';
import { PrimengDatePipe } from '../../../pipes/primeng-date/primeng-date.pipe';
import { FirstAndLastnamePipe } from '../../../pipes/first-and-lastname/first-and-lastname.pipe';
import { UpdatePastoralCareDialogComponent } from '../components/update-pastoral-care-dialog/update-pastoral-care-dialog.component';
import { PastoralCareService } from '../services/pastoral-care/pastoral-care.service';
import { PastoralCareCategoryService } from '../services/category/pastoral-care-category.service';
import type { PastoralCare } from '../models/pastoral-care.model';
import {
  createPastoralCareForm,
  type PastoralCareFormValue,
} from '../constants/pastoral-care-form';
import { MembersService } from '../../members/services/members.service';

const PRIMENG = [
  TableModule,
  ButtonModule,
  ToastModule,
  ToolbarModule,
  InputTextModule,
  TagModule,
  InputIconModule,
  IconFieldModule,
  ConfirmDialogModule,
  FluidModule,
];

const COMPONENTS = [UpdatePastoralCareDialogComponent];

const PROVIDERS = [MessageService, ConfirmationService, DatePipe];

const PIPES = [FirstAndLastnamePipe, PrimengDatePipe];

@Component({
  selector: 'app-pastoral-care-list',
  imports: [...PRIMENG, ...COMPONENTS, ...PIPES],
  templateUrl: './pastoral-care-list.component.html',
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
export class PastoralCareListComponent implements OnInit {
  public pastoralCareService = inject(PastoralCareService);

  public pastoralCareCategoryService = inject(PastoralCareCategoryService);

  public membersService = inject(MembersService);

  private messageService = inject(MessageService);

  private confirmationService = inject(ConfirmationService);

  private excelService = inject(ExcelService<PastoralCare>);

  private datePipe = inject(DatePipe);

  public selectedPastoralCares!: PastoralCare[] | null;

  public dialog: boolean = false;

  public mode = signal<'add' | 'edit'>('add');

  public modalTitle = computed(() =>
    this.mode() === 'add' ? 'Novo atendimento' : 'Alterar atendimento'
  );

  public exportColumns!: ExportColumn[];

  public columns!: Column[];

  public pastoralCareForm = createPastoralCareForm();

  public filteredvalues!: PastoralCare[];

  public exportCSV(): void {
    this.excelService.exportToExcel(
      this.pastoralCareService.pastoralCare(),
      'Listagem de atendimentos'
    );
  }

  public ngOnInit(): void {
    this.pastoralCareCategoryService.getPastoralCareCategoryDataHandler();
    this.pastoralCareService.getPastoralCareDataHandler();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openInsertPastoralCare(): void {
    this.mode.set('add');
    this.pastoralCareForm.reset();
    this.dialog = true;
  }

  public openUpdatePastoralCare(pastoralCare: PastoralCare): void {
    this.mode.set('edit');

    const { id, type_id, date, member_id, pastor, description } = pastoralCare;

    this.pastoralCareForm.setValue({
      id: id!,
      typeId: type_id,
      date,
      memberId: member_id,
      pastor,
      description: description!,
    });

    this.dialog = true;
  }

  public deleteSelectedPastoralCare(): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir os atendimentos selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        if (this.selectedPastoralCares) {
          const ids = this.selectedPastoralCares.map(item => item.id!);

          this.pastoralCareService.deletePastoralCaresHandler(ids);

          this.selectedPastoralCares = [];
        }
      },
    });
  }

  public hideDialog(): void {
    this.pastoralCareForm.reset();
    this.dialog = false;
  }

  public openDeletePastoralCare(pastoralCare: PastoralCare): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este atendimento ?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.pastoralCareService.deletePastoralCareHandler(pastoralCare.id!);
      },
    });
  }

  public savePastoralCareHandler(): void {
    if (this.pastoralCareForm.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });

      return;
    }

    const formData = this.pastoralCareForm.value;

    const transformedPastoralCareData = {
      ...formData,
      date: this.datePipe.transform(formData.date, 'yyyy-MM-dd'),
    } as PastoralCareFormValue;

    if (this.mode() === 'add') {
      this.pastoralCareService.insertPastoralCareDataHandler(transformedPastoralCareData);
    } else {
      this.pastoralCareService.updatePastoralCareDataHandler(transformedPastoralCareData);
    }

    this.hideDialog();
  }
}
