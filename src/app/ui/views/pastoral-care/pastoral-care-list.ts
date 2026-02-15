/* eslint-disable @typescript-eslint/naming-convention */
import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PastoralCareCategoriesRepository } from '../../../data/repositories/pastoral-care-categories/pastoral-care-categories-repository';
import { ExcelService } from '../../../data/services/shared/excel';
import type { Column } from '../../../domain/models/columns.model';
import type { PastoralCare } from '../../../domain/models/pastoral-care.model';
import { UpdatePastoralCareDialog } from '../../components/pastoral-care/update-pastoral-care-dialog/update-pastoral-care-dialog';
import { createPastoralCareForm } from '../../view-models/pastoral-care/pastoral-care-form';
import { PastoralCareViewModel } from '../../view-models/pastoral-care/pastoral-care.view-model';
import { FirstAndLastnamePipe } from '../pipes/first-and-lastname/first-and-lastname.pipe';
import { PrimengDatePipe } from '../pipes/primeng-date/primeng-date.pipe';

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

const PROVIDERS = [MessageService, ConfirmationService, DatePipe, PastoralCareViewModel];

const PIPES = [FirstAndLastnamePipe, PrimengDatePipe];

@Component({
  selector: 'app-pastoral-care-list',
  imports: [...PRIMENG, ...COMPONENTS, ...PIPES],
  templateUrl: './pastoral-care-list.html',
  providers: [...PROVIDERS],
  styleUrls: ['./pastoral-care-list.scss'],
})
export class PastoralCareList implements OnInit {
  public pastoralCareViewModel = inject(PastoralCareViewModel);

  public pastoralCareCategoriesRepository = inject(PastoralCareCategoriesRepository);

  private confirmationService = inject(ConfirmationService);

  private excelService = inject(ExcelService<PastoralCare>);

  public selectedPastoralCares!: PastoralCare[] | null;

  public dialog: boolean = false;

  public mode = signal<'add' | 'edit'>('add');

  public modalTitle = computed(() => (this.mode() === 'add' ? 'Novo atendimento' : 'Alterar atendimento'));

  public columns!: Column[];

  public pastoralCareForm = createPastoralCareForm();

  public exportCSV(): void {
    this.excelService.exportToExcel(this.pastoralCareViewModel.pastoralCare(), 'Listagem de atendimentos');
  }

  public async ngOnInit(): Promise<void> {
    await this.pastoralCareCategoriesRepository.findAll();
    await this.pastoralCareViewModel.findAll();
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
