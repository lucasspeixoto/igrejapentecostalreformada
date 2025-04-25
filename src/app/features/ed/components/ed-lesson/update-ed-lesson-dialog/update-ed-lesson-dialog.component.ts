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

import { ChipModule } from 'primeng/chip';
import { EdLessonImageUploadComponent } from '../ed-lesson-image-upload/ed-lesson-image-upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CustomValidationMessageComponent } from 'src/app/components/custom-validation-message/custom-validation-message';
import { EdLessonFormControl } from '../../../constants/ed-lesson-form';
import { EdCoursesService } from '../../../services/ed-courses/ed-courses.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

const PRIMENG = [
  InputGroupModule,
  InputGroupAddonModule,
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

const COMMON = [
  FormsModule,
  ReactiveFormsModule,
  CustomValidationMessageComponent,
  EdLessonImageUploadComponent,
];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-update-ed-lesson-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './update-ed-lesson-dialog.component.html',
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
export class UpdateEdLessonDialogComponent implements OnInit {
  @Input() lessonDialog!: boolean;

  @Input() lessonForm!: FormGroup<EdLessonFormControl>;

  @Output() dialogClosed = new EventEmitter<void>();

  @Output() lessonSaved = new EventEmitter<void>();

  private edCourseService = inject(EdCoursesService);

  public courses = this.edCourseService.courses;

  public modalTitle = input<string>('');

  private messageService = inject(MessageService);

  public ngOnInit(): void {
    this.edCourseService.getAllCoursesDataHandler();
  }

  public hideDialog(): void {
    this.lessonDialog = false;
    this.dialogClosed.emit();
  }

  public saveEdLessonHandler(): void {
    if (this.lessonForm.valid) {
      this.lessonSaved.emit();
      this.lessonDialog = false;
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
