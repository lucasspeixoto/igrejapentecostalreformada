import { Component, EventEmitter, inject, input, Input, Output, type OnInit } from '@angular/core';
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
import { EdLesson } from '../../../models/ed-lesson.model';
import { EdLessonEnrollmentsService } from '../../../services/ed-lesson-enrollments/ed-lesson-enrollments.service';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { FirstAndLastnamePipe } from 'src/app/pipes/first-and-lastname/first-and-lastname.pipe';

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

const PIPES = [FirstAndLastnamePipe];

@Component({
  selector: 'app-enroll-students-dialog',
  imports: [...PRIMENG, ...COMMON, ...PIPES],
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
export class EnrollStudentsDialogComponent implements OnInit {
  @Input() enrollStudentsDialog!: boolean;

  @Input() selectedLessonForEnrollment!: EdLesson | null;

  @Output() dialogClosed = new EventEmitter<void>();

  public selectedStudentsIds: string[] = [];

  private usersService = inject(UsersService);

  private edLessonEnrollmentsService = inject(EdLessonEnrollmentsService);

  public students = this.usersService.users;

  public modalTitle = input<string>('');

  public loadingService = inject(LoadingService);

  public ngOnInit(): void {
    this.usersService.getAllUsers();
  }

  public hideDialog(): void {
    this.enrollStudentsDialog = false;
    this.dialogClosed.emit();
  }

  public saveEdLessonEnrollmentHandler(): void {
    this.loadingService.isLoading.set(true);

    this.edLessonEnrollmentsService.insertLessonEnrollmentHandler(
      this.selectedStudentsIds,
      this.selectedLessonForEnrollment!
    );

    //this.loadingService.isLoading.set(false);

    /* this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Matrícula(s) inserida(s) com sucesso!',
      life: 3000,
    }); */
  }
}
