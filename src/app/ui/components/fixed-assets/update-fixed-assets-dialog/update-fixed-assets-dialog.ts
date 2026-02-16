import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import type { FixedAssetsFormControl } from '../../../view-models/fixed-assets/fixed-assets-form';
import { CustomValidationMessageComponent } from '../../shared/custom-validation-message/custom-validation-message';

const PRIMENG = [ButtonModule, ToastModule, SelectModule, InputTextModule, DialogModule];

const COMMON = [FormsModule, ReactiveFormsModule, CustomValidationMessageComponent];

const PROVIDERS = [MessageService];

const ASSET_TYPES = [
  // Seus originais
  { label: 'Equipamento', value: 'Equipamento' },
  { label: 'Móvel', value: 'Móvel' },
  { label: 'Imóvel', value: 'Imóvel' },
  { label: 'Veículo', value: 'Veículo' },

  // Tecnologia e TI
  { label: 'Hardware / TI', value: 'Hardware' },
  { label: 'Software / Licenças', value: 'Software' },
  { label: 'Periféricos', value: 'Periféricos' }, // Mouses, teclados, webcams
  { label: 'Telefonia', value: 'Telefonia' }, // Celulares, PABX

  // Operacional
  { label: 'Maquinário', value: 'Maquinário' }, // Máquinas industriais
  { label: 'Ferramentas', value: 'Ferramentas' },

  // Instalações e Geral
  { label: 'Benfeitorias', value: 'Benfeitorias' }, // Reformas em imóveis alugados
  { label: 'Instalações', value: 'Instalações' }, // Ar condicionado central, cabeamento
  { label: 'Utensílios', value: 'Utensílios' }, // Itens de copa/cozinha
  { label: 'Decoração', value: 'Decoração' }, // Quadros, plantas permanentes

  // Intangíveis
  { label: 'Intangível', value: 'Intangível' }, // Marcas, patentes
  { label: 'Outros', value: 'Outros' },
];

@Component({
  selector: 'app-update-fixed-assets-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './update-fixed-assets-dialog.html',
  styles: [
    `
      :host ::ng-deep .p-frozen-column {
        font-weight: bold;
      }

      :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
      }

      ::ng-deep {
        .p-inputmask,
        .p-inputtext,
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
  providers: [...PROVIDERS],
})
export class UpdateFixedAssetsDialog {
  @Input() public fixedAssetsDialog!: boolean;

  @Input() public fixedAssetsForm!: FormGroup<FixedAssetsFormControl>;

  @Output() public dialogClosed = new EventEmitter<void>();

  @Output() public fixedAssetSaved = new EventEmitter<void>();

  public modalTitle = input<string>('');

  public assetTypes = ASSET_TYPES;

  public hideDialog(): void {
    this.fixedAssetsDialog = false;
    this.dialogClosed.emit();
  }

  public saveFixedAssetHandler(): void {
    if (this.fixedAssetsForm.valid) {
      this.fixedAssetSaved.emit();
      this.fixedAssetsDialog = false;
    }
  }
}
