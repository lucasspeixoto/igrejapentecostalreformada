/* eslint-disable @typescript-eslint/naming-convention */
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
import { ExcelService } from '../../../data/services/shared/excel';
import type { ExportColumn, Column } from '../../../domain/models/columns.model';
import type { PastoralCare } from '../../../domain/models/pastoral-care.model';
import { FirstAndLastnamePipe } from '../pipes/first-and-lastname/first-and-lastname.pipe';
import { PrimengDatePipe } from '../pipes/primeng-date/primeng-date.pipe';
import { createPastoralCareForm } from '../../view-models/pastoral-care/pastoral-care-form';
import { UpdatePastoralCareDialog } from '../../components/pastoral-care/update-pastoral-care-dialog/update-pastoral-care-dialog';
import { PastoralCareCategoriesRepository } from '../../../data/repositories/pastoral-care-categories/pastoral-care-categories-repository';
import { PastoralCareViewModel } from '../../view-models/pastoral-care/pastoral-care.view-model';
import { PastoralCareCategoriesViewModel } from '../../view-models/pastoral-care-categories/pastoral-care-categories.view-model';

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

const COMPONENTS = [UpdatePastoralCareDialog];

const PROVIDERS = [
  MessageService,
  ConfirmationService,
  DatePipe,
  PastoralCareCategoriesViewModel,
  PastoralCareViewModel
];


const PIPES = [FirstAndLastnamePipe, PrimengDatePipe];

@Component({
  selector: 'app-pastoral-care-list',
  imports: [...PRIMENG, ...COMPONENTS, ...PIPES],
  templateUrl: './pastoral-care-list.html',
  providers: [...PROVIDERS],
  styleUrls: ['./pastoral-care-list.scss'],
})
export class PastoralCareList implements OnInit {
  public pastoralCareCategoriesViewModel = inject(PastoralCareCategoriesViewModel);

  public pastoralCareViewModel = inject(PastoralCareViewModel);

  public pastoralCareCategoriesRepository = inject(PastoralCareCategoriesRepository);

  private confirmationService = inject(ConfirmationService);

  private excelService = inject(ExcelService<PastoralCare>);

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
      this.pastoralCareViewModel.pastoralCare(),
      'Listagem de atendimentos'
    );
  }

  public ngOnInit(): void {
    this.pastoralCareCategoriesRepository.findAll();
    this.pastoralCareViewModel.findAll();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openInsertPastoralCare(): void {
    this.mode.set('add');
    this.pastoralCareForm.reset();
    this.dialog = true;
  }

  public hideDialog(): void {
    this.pastoralCareForm.reset();
    this.dialog = false;
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

          this.pastoralCareViewModel.deletePastoralCares(ids);

          this.selectedPastoralCares = [];
        }
      },
    });
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
        this.pastoralCareViewModel.deletePastoralCare(pastoralCare.id!);
      },
    });
  }

  public savePastoralCareHandler(): void {

    this.pastoralCareViewModel.checkUpdateMemberForm(this.pastoralCareForm);

    const pastoralCare = this.pastoralCareForm.getRawValue();

    this.pastoralCareViewModel.savePastoralCare(pastoralCare, this.mode());

  }
}
