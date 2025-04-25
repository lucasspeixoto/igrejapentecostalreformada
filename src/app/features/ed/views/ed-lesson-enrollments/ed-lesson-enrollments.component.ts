import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
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
import { FirstAndLastnamePipe } from 'src/app/pipes/first-and-lastname/first-and-lastname.pipe';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { BadgeModule } from 'primeng/badge';
import { EdLessonEnrollmentsService } from '../../services/ed-lesson-enrollments/ed-lesson-enrollments.service';
import { EdLessonEnrollment } from '../../models/ed-lesson-enrollment.model';
import { LessonEnrollmentStatusPipe } from '../../pipes/lesson-enrollment-status.pipe';
import {
  LESSON_ENROLLMENT_STATUS_BG,
  LESSON_ENROLLMENT_STATUS_TEXT,
} from 'src/app/utils/constants';

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

const PROVIDERS = [MessageService, ConfirmationService, DatePipe];

const PIPES = [FirstAndLastnamePipe, LessonEnrollmentStatusPipe];

const COMMON = [NgClass];

@Component({
  selector: 'app-ed-lesson-enrollments',
  imports: [...PRIMENG, ...COMMON, ...PIPES],
  templateUrl: './ed-lesson-enrollments.component.html',
  styleUrl: './ed-lesson-enrollments.component.scss',
  providers: [...PROVIDERS],
})
export class EdLessonEnrollmentsComponent implements OnInit {
  public edLessonEnrollmentsService = inject(EdLessonEnrollmentsService);

  private confirmationService = inject(ConfirmationService);

  public selectedLessonEnrollments: EdLessonEnrollment[] = [];

  public lessonEnrollmentStatusBg = LESSON_ENROLLMENT_STATUS_BG;

  public lessonEnrollmentStatusText = LESSON_ENROLLMENT_STATUS_TEXT;

  public ngOnInit(): void {
    this.edLessonEnrollmentsService.getAllLessonEnrollmentsDataHandler();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openDeleteLessonEnrollment(lessonEnrollment: EdLessonEnrollment): void {
    this.confirmationService.confirm({
      message:
        'Tem certeza que deseja excluir esta matrícula ? Este processo vai remover todas as matrículas ativas',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.edLessonEnrollmentsService.deleteLessonEnrollmentHandler(lessonEnrollment.id);
      },
    });
  }

  public openDeleteLessonEnrollments(): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir as matrículas selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        if (this.selectedLessonEnrollments) {
          const ids = this.selectedLessonEnrollments.map(item => item.id);

          this.edLessonEnrollmentsService.deleteLessonEnrollmentsHandler(ids);

          this.selectedLessonEnrollments = [];
        }
      },
    });
  }

  /* public openDeleteLesson(lesson: EdLesson): void {
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
  } */

  /* */
}
