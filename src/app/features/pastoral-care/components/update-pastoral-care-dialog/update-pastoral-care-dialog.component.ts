import { PastoralCareCategoryService } from './../../services/category/pastoral-care-category.service';
import { Component, EventEmitter, inject, input, Input, Output, type OnInit } from '@angular/core';
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
import { PastoralCareFormControl } from '../../constants/pastoral-care-form';
import { MARITAL_STATUS, MEMBER_TYPES } from 'src/app/features/members/constants/options';
import { MembersService } from 'src/app/features/members/services/members.service';

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
  selector: 'app-update-pastoral-care-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './update-pastoral-care-dialog.component.html',
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
export class UpdatePastoralCareDialogComponent implements OnInit {
  @Input() dialog!: boolean;

  @Input() pastoralCareForm!: FormGroup<PastoralCareFormControl>;

  @Output() dialogClosed = new EventEmitter<void>();

  @Output() pastoralCareSaved = new EventEmitter<void>();

  public modalTitle = input<string>('');

  private messageService = inject(MessageService);

  public membersService = inject(MembersService);

  public pastoralCareCategoryService = inject(PastoralCareCategoryService);

  public maritalStatus = MARITAL_STATUS;

  public memberTypes = MEMBER_TYPES;

  public ngOnInit(): void {
    this.membersService.getAllMembersDataHandler();
  }

  public hideDialog(): void {
    this.dialog = false;
    this.dialogClosed.emit();
  }

  public savePastoralCareHandler(): void {
    if (this.pastoralCareForm.valid) {
      this.pastoralCareSaved.emit();
      this.dialog = false;
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
