import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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
import { TooltipModule } from 'primeng/tooltip';
import { EdLessonsService } from '../../services/ed-lessons/ed-lessons.service';
import { UsersService } from '../../../../services/users/users.service';
import { EdLesson } from '../../models/ed-lesson.model';
import { createEdLessonForm, EdLessonFormValue } from '../../constants/ed-lesson-form';
import { UpdateEdLessonDialogComponent } from '../../components/ed-lesson/update-ed-lesson-dialog/update-ed-lesson-dialog.component';
import { EnrollStudentsDialogComponent } from '../../components/ed-lesson/enroll-students-dialog/enroll-students-dialog.component';
import { FirstAndLastnamePipe } from 'src/app/pipes/first-and-lastname/first-and-lastname.pipe';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { BadgeModule } from 'primeng/badge';

const PRIMENG = [
  BadgeModule,
  OverlayBadgeModule,
  TooltipModule,
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

const COMPONENTS = [UpdateEdLessonDialogComponent, EnrollStudentsDialogComponent];

const PROVIDERS = [MessageService, ConfirmationService, DatePipe];

const PIPES = [FirstAndLastnamePipe];

const modalTitleOptions: Record<string, string> = {
  add: 'Adicionar Aula',
  edit: 'Editar Aula',
  enrollment: 'Gerar Matrículas',
};

@Component({
  selector: 'app-ed-lessons',
  imports: [...PRIMENG, ...COMPONENTS, ...PIPES],
  templateUrl: './ed-lessons.component.html',
  styleUrls: ['./ed-lessons.component.scss'],
  providers: [...PROVIDERS],
})
export class EdLessonsComponent implements OnInit {
  public edLessonsService = inject(EdLessonsService);

  private messageService = inject(MessageService);

  private confirmationService = inject(ConfirmationService);

  private usersService = inject(UsersService);

  public selecteLessons!: EdLesson[] | null;

  public lessonDialog: boolean = false;

  public enrollStudentsDialog: boolean = false;

  public mode = signal<'add' | 'edit' | 'delete' | 'enrollment'>('add');

  public modalTitle = computed(() => modalTitleOptions[this.mode()]);

  public lessonForm = createEdLessonForm();

  public selectedLessons: EdLesson[] = [];

  public selectedLessonForEnrollment!: EdLesson | null;

  public ngOnInit(): void {
    this.edLessonsService.getAllLessonsDataHandler();
    this.usersService.getAllUsers();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openInsertLesson(): void {
    this.mode.set('add');
    this.lessonForm.reset();
    this.lessonDialog = true;
  }

  public openUpdateLesson(lesson: EdLesson): void {
    this.mode.set('edit');

    const { id, name, course_id, link_pdf_file, link_video_file, description } = lesson;

    this.lessonForm.setValue({
      id,
      name,
      courseId: course_id,
      linkPdfFile: link_pdf_file,
      linkVideoFile: link_video_file,
      description,
    });

    this.lessonDialog = true;
  }

  public openEnrollmentLesson(lesson: EdLesson): void {
    this.mode.set('enrollment');

    this.selectedLessonForEnrollment = lesson;

    this.enrollStudentsDialog = true;
  }

  public openDeleteLesson(lesson: EdLesson): void {
    this.confirmationService.confirm({
      message:
        'Tem certeza que deseja excluir a aula ' +
        lesson.name +
        '? Este processo vai remover todas as matrículas ativas',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.edLessonsService.deleteLessonHandler(lesson.id);
      },
    });
  }

  public openDeleteLessons(): void {
    this.confirmationService.confirm({
      message:
        'Tem certeza que deseja excluir as aulas selecionados? Este processo vai remover todas as matrículas ativas',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        if (this.selectedLessons) {
          const ids = this.selectedLessons.map(item => item.id);

          this.edLessonsService.deleteLessonsHandler(ids);

          this.selectedLessons = [];
        }
      },
    });
  }

  public saveLessonHandler(): void {
    if (this.lessonForm.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });

      return;
    }

    const lessonFormData = this.lessonForm.value as EdLessonFormValue;

    if (this.mode() === 'add') {
      this.edLessonsService.insertLessonDataHandler(lessonFormData);
    } else {
      this.edLessonsService.updateLessonDataHandler(lessonFormData);
    }

    this.hideDialog();
  }

  public hideDialog(): void {
    this.lessonForm.reset();
    this.lessonDialog = false;
  }

  public hideEnrollmentDialog(): void {
    this.enrollStudentsDialog = false;
  }
}
