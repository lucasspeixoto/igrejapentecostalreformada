import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { InputGroupModule } from 'primeng/inputgroup';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UsersService } from '../../../../../services/users/users.service';
import { EdCourseEnrollmentsService } from '../../../services/ed-course-enrollments/ed-course-enrollments.service';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { EdCourse } from '../../../models/ed-course.model';

const PRIMENG = [
  CardModule,
  InputGroupModule,
  InputGroupAddonModule,
  FileUploadModule,
  InputMaskModule,
  DatePickerModule,
  ButtonModule,
  ToastModule,
  TextareaModule,
  MultiSelectModule,
  SelectModule,
  InputTextModule,
  DialogModule,
  ChipModule,
];

const COMMON = [FormsModule, ReactiveFormsModule];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-enroll-students-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './enroll-students-dialog.component.html',
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
export class EnrollStudentsDialogComponent {
  @Input() enrollStudentsDialog!: boolean;

  @Input() selectedCourseForEnrollment!: EdCourse | null;

  @Output() dialogClosed = new EventEmitter<void>();

  public selectedStudentsIds: string[] = [];

  private usersService = inject(UsersService);

  private edCourseEnrollmentsService = inject(EdCourseEnrollmentsService);

  public students = this.usersService.users;

  public modalTitle = input<string>('');

  public loadingService = inject(LoadingService);

  public hideDialog(): void {
    this.enrollStudentsDialog = false;
    this.dialogClosed.emit();
  }

  public saveEdCourseEnrollmentHandler(): void {
    this.edCourseEnrollmentsService.insertCourseEnrollmentHandler(
      this.selectedStudentsIds,
      this.selectedCourseForEnrollment!
    );

    this.hideDialog();
  }
}
