import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadService } from '../../../../services/file-upload/file-upload.service';
import { FirstAndLastnamePipe } from '../../../../pipes/first-and-lastname/first-and-lastname.pipe';
import { EdCoursesService } from '../../services/ed-courses/ed-courses.service';
import { ExportColumn, Column } from '../../../../models/columns.model';
import { EdCourse } from '../../models/ed-course.model';
import { createEdCourseForm, EdCourseFormValue } from '../../constants/ed-course-form';
import { UpdateEdCourseDialogComponent } from '../../components/ed-course/update-ed-course-dialog/update-ed-course-dialog.component';
import { UsersService } from '../../../../services/users/users.service';

const PRIMENG = [
  BadgeModule,
  OverlayBadgeModule,
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

const COMPONENTS = [UpdateEdCourseDialogComponent, RouterLink];

const PROVIDERS = [MessageService, ConfirmationService, DatePipe];

const PIPES = [FirstAndLastnamePipe];

@Component({
  selector: 'app-ed-courses',
  imports: [...PRIMENG, ...COMPONENTS, ...PIPES],
  templateUrl: './ed-courses.component.html',
  styleUrls: ['./ed-courses.component.scss'],
  providers: [...PROVIDERS],
})
export class EdCoursesComponent implements OnInit {
  public edCoursesService = inject(EdCoursesService);

  private messageService = inject(MessageService);

  private confirmationService = inject(ConfirmationService);

  private usersService = inject(UsersService);

  public fileUploadService = inject(FileUploadService);

  public selecteCourses!: EdCourse[] | null;

  public courseDialog: boolean = false;

  public mode = signal<'add' | 'edit'>('add');

  public modalTitle = computed(() => (this.mode() === 'add' ? 'Adicionar Curso' : 'Editar Curso'));

  public exportColumns!: ExportColumn[];

  public columns!: Column[];

  public courseForm = createEdCourseForm();

  public filteredvalues!: EdCourse[];

  public selectedCourses: EdCourse[] = [];

  public ngOnInit(): void {
    this.edCoursesService.getAllCoursesDataHandler();
    this.usersService.getAllUsers();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openInsertCourse(): void {
    this.mode.set('add');
    this.courseForm.reset();
    this.fileUploadService.uploadedCourseImage.set('');
    this.courseDialog = true;
  }

  public openUpdateCourse(course: EdCourse): void {
    this.mode.set('edit');

    const { id, name, user_id, description, photo } = course;

    this.fileUploadService.uploadedCourseImage.set(photo);

    this.courseForm.setValue({
      id,
      name,
      description,
      userId: user_id,
      photo,
    });

    this.courseDialog = true;
  }

  public openDeleteCourse(course: EdCourse): void {
    this.confirmationService.confirm({
      message:
        'Tem certeza que deseja excluir o curso ' +
        course.name +
        '? Este processo vai remover todas aulas vinculadas ao curso e consequentemente as matrículas ativas',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.edCoursesService.deleteCourseHandler(course.id);
      },
    });
  }

  public openDeleteCourses(): void {
    this.confirmationService.confirm({
      message:
        'Tem certeza que deseja excluir os cursos selecionados? Este processo vai remover todas aulas vinculadas ao curso e consequentemente as matrículas ativas',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        if (this.selectedCourses) {
          const coursesIds = this.selectedCourses.map(member => member.id);

          this.edCoursesService.deleteCoursesHandler(coursesIds);

          this.selectedCourses = [];
        }
      },
    });
  }

  public saveCourseHandler(): void {
    if (this.courseForm.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });

      return;
    }

    this.courseForm.patchValue({
      photo: this.fileUploadService.uploadedCourseImage() || '',
    });

    const courseFormData = this.courseForm.value as EdCourseFormValue;

    if (this.mode() === 'add') {
      this.edCoursesService.insertCourseDataHandler(courseFormData);
    } else {
      this.edCoursesService.updateCourseDataHandler(courseFormData);
    }

    this.hideDialog();
  }

  public hideDialog(): void {
    this.courseForm.reset();
    this.courseDialog = false;
  }
}
