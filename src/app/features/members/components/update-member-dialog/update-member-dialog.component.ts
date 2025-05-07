import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

import { CustomValidationMessageComponent } from '../../../../components/custom-validation-message/custom-validation-message';
import { MemberFormControl } from '../../constants/member-form';
import { MARITAL_STATUS, MEMBER_TYPES } from '../../constants/options';
import { JsonPipe } from '@angular/common';

const PRIMENG = [
  InputMaskModule,
  DatePickerModule,
  ButtonModule,
  ToastModule,
  TextareaModule,
  SelectModule,
  InputTextModule,
  DialogModule,
];

const COMMON = [JsonPipe, FormsModule, ReactiveFormsModule, CustomValidationMessageComponent];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-update-member-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './update-member-dialog.component.html',
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
export class UpdateMemberDialogComponent {
  @Input() memberDialog!: boolean;

  @Input() memberForm!: FormGroup<MemberFormControl>;

  @Output() dialogClosed = new EventEmitter<void>();

  @Output() memberSaved = new EventEmitter<void>();

  public modalTitle = input<string>('');

  private messageService = inject(MessageService);

  public maritalStatus = MARITAL_STATUS;

  public memberTypes = MEMBER_TYPES;

  public hideDialog(): void {
    this.memberDialog = false;
    this.dialogClosed.emit();
  }

  public saveMemberHandler(): void {
    if (this.memberForm.valid) {
      this.memberSaved.emit();
      this.memberDialog = false;
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });
      return;
    }
  }
}
