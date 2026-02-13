import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MARITAL_STATUS, MEMBER_TYPES } from '../../../../utils/constants';
import type { MemberFormControl } from '../../../view-models/members/member-form';
import { CustomValidationMessageComponent } from '../../shared/custom-validation-message/custom-validation-message';

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

const COMMON = [FormsModule, ReactiveFormsModule, CustomValidationMessageComponent];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-update-member-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './update-member-dialog.html',
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
export class UpdateMemberDialog {
  @Input() public memberDialog!: boolean;

  @Input() public memberForm!: FormGroup<MemberFormControl>;

  @Output() public dialogClosed = new EventEmitter<void>();

  @Output() public memberSaved = new EventEmitter<void>();

  public modalTitle = input<string>('');

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
    }
  }
}
