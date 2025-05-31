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
import { EdCourseEnrollment } from '../../models/ed-course-enrollment.model';
import { LessonEnrollmentStatusPipe } from '../../pipes/lesson-enrollment-status.pipe';
import {
  LESSON_ENROLLMENT_STATUS_BG,
  LESSON_ENROLLMENT_STATUS_TEXT,
} from 'src/app/utils/constants';
import { EdCourseEnrollmentsService } from '../../services/ed-course-enrollments/ed-course-enrollments.service';

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

const PIPES = [FirstAndLastnamePipe, LessonEnrollmentStatusPipe, DatePipe];

const COMMON = [NgClass];

@Component({
  selector: 'app-ed-course-enrollments',
  imports: [...PRIMENG, ...COMMON, ...PIPES],
  templateUrl: './ed-course-enrollments.component.html',
  styleUrl: './ed-course-enrollments.component.scss',
  providers: [...PROVIDERS],
})
export class EdCourseEnrollmentsComponent implements OnInit {
  public edCourseEnrollmentsService = inject(EdCourseEnrollmentsService);

  private confirmationService = inject(ConfirmationService);

  public selectedLessonEnrollments: EdCourseEnrollment[] = [];

  public lessonEnrollmentStatusBg = LESSON_ENROLLMENT_STATUS_BG;

  public lessonEnrollmentStatusText = LESSON_ENROLLMENT_STATUS_TEXT;

  public ngOnInit(): void {
    this.edCourseEnrollmentsService.getAllCourseEnrollmentsDataHandler();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openDeleteLessonEnrollment(lessonEnrollment: EdCourseEnrollment): void {
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
        this.edCourseEnrollmentsService.deleteCourseEnrollmentHandler(lessonEnrollment.id);
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

          this.edCourseEnrollmentsService.deleteCourseEnrollmentsHandler(ids);

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
