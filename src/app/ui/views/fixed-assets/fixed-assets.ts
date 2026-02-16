import { DatePipe, NgClass } from '@angular/common';
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
import type { Column, ExportColumn } from '../../../domain/models/columns.model';
import type { FixedAsset } from '../../../domain/models/fixed-assets.model';

import { UpdateFixedAssetsDialog } from '../../components/fixed-assets/update-fixed-assets-dialog/update-fixed-assets-dialog';
import { createFixedAssetsForm } from '../../view-models/fixed-assets/fixed-assets-form';
import { FixedAssetsViewModel } from './../../view-models/fixed-assets/fixed-assets.view-model';

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

const COMMON = [NgClass];

const COMPONENTS = [UpdateFixedAssetsDialog];

const PROVIDERS = [FixedAssetsViewModel, MessageService, ConfirmationService, DatePipe];

const PIPES = [DatePipe];

@Component({
  selector: 'app-fixed-assets',
  imports: [...PRIMENG, ...COMPONENTS, ...PIPES, ...COMMON],
  templateUrl: 'fixed-assets.html',
  styleUrls: ['fixed-assets.scss'],
  providers: [...PROVIDERS],
})
export class FixedAssets implements OnInit {
  public fixedAssetsViewModel = inject(FixedAssetsViewModel);

  private confirmationService = inject(ConfirmationService);

  public selectedFixedAssets!: FixedAsset[] | null;

  public fixedAssetsDialog: boolean = false;

  public mode = signal<'add' | 'edit'>('add');

  public modalTitle = computed(() => (this.mode() === 'add' ? 'Adicionar Patrimônio' : 'Editar Patrimônio'));

  public exportColumns!: ExportColumn[];

  public columns!: Column[];

  public fixedAssetsForm = createFixedAssetsForm();

  public filteredvalues!: FixedAsset[];

  public ngOnInit(): void {
    this.fixedAssetsViewModel.findAll();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openInsertFixedAsset(): void {
    this.mode.set('add');
    this.fixedAssetsForm.reset();
    this.fixedAssetsDialog = true;
  }

  public hideDialog(): void {
    this.fixedAssetsForm.reset();
    this.fixedAssetsDialog = false;
  }

  public openUpdateFixedAsset(fixedAsset: FixedAsset): void {
    this.mode.set('edit');

    const { id, local, type, asset } = fixedAsset;

    this.fixedAssetsForm.setValue({
      id,
      local,
      type,
      asset,
    });

    this.fixedAssetsDialog = true;
  }

  public deleteSelectedFixedAssets(): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir os patrimônios selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        if (this.selectedFixedAssets) {
          const fixedAssetIds = this.selectedFixedAssets.map(fixedAsset => fixedAsset.id);

          this.fixedAssetsViewModel.deleteFixedAssets(fixedAssetIds);

          this.selectedFixedAssets = [];
        }
      },
    });
  }

  public openDeleteFixedAsset(fixedAsset: FixedAsset): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o patrimônio ' + fixedAsset.asset + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.fixedAssetsViewModel.deleteFixedAsset(fixedAsset.id);
      },
    });
  }

  public saveFixedAssetHandler(): void {
    this.fixedAssetsViewModel.checkUpdateFixedAssetForm(this.fixedAssetsForm);

    const fixedAsset = this.fixedAssetsForm.getRawValue();

    this.fixedAssetsViewModel.saveFixedAsset(fixedAsset, this.mode());
  }
}
