import { Routes } from '@angular/router';
import { EdLessonsComponent } from './views/ed-lessons/ed-lessons.component';
import { EdCoursesComponent } from './views/ed-courses/ed-courses.component';
import { EdCourseEnrollmentsComponent } from './views/ed-course-enrollments/ed-course-enrollments.component';
import { EdCoursesPanelComponent } from './views/ed-courses-panel/ed-courses-panel.component';
import { isAdminGuard } from '../../auth/guards/is-admin/is-admin.guard';
import { EdLessonsPanelComponent } from './views/ed-lessons-panel/ed-lessons-panel.component';

export default [
  { path: 'cursos', canActivate: [isAdminGuard], component: EdCoursesComponent },
  { path: 'aulas', canActivate: [isAdminGuard], component: EdLessonsComponent },
  { path: 'matriculas', canActivate: [isAdminGuard], component: EdCourseEnrollmentsComponent },
  { path: 'painel-de-cursos', component: EdCoursesPanelComponent },
  { path: 'painel-de-aulas', component: EdLessonsPanelComponent },
] as Routes;
