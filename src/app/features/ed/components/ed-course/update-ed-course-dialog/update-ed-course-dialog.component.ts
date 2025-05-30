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

import { ChipModule } from 'primeng/chip';
import { FileUploadModule } from 'primeng/fileupload';
import { CustomValidationMessageComponent } from '../../../../../components/custom-validation-message/custom-validation-message';
import { UsersService } from '../../../../../services/users/users.service';
import { EdCourseFormControl } from '../../../constants/ed-course-form';

const PRIMENG = [
  FileUploadModule,
  InputMaskModule,
  DatePickerModule,
  ButtonModule,
  ToastModule,
  TextareaModule,
  SelectModule,
  InputTextModule,
  DialogModule,
  ChipModule,
];

const COMMON = [FormsModule, ReactiveFormsModule, CustomValidationMessageComponent];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-update-ed-course-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './update-ed-course-dialog.component.html',
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
export class UpdateEdCourseDialogComponent {
  @Input() courseDialog!: boolean;

  @Input() courseForm!: FormGroup<EdCourseFormControl>;

  @Output() dialogClosed = new EventEmitter<void>();

  @Output() courseSaved = new EventEmitter<void>();

  private usersService = inject(UsersService);

  public users = this.usersService.users;

  public modalTitle = input<string>('');

  private messageService = inject(MessageService);

  public hideDialog(): void {
    this.courseDialog = false;
    this.dialogClosed.emit();
  }

  public saveCourseHandler(): void {
    if (this.courseForm.valid) {
      this.courseSaved.emit();
      this.courseDialog = false;
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
