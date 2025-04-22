import { Routes } from '@angular/router';
import { isLoggedGuard } from './../../auth/guards/is-logged/is-logged.guard';
import { EdLessonsComponent } from './views/ed-lessons/ed-lessons.component';
import { EdCoursesComponent } from './views/ed-courses/ed-courses.component';
import { EdLessonEnrollmentsComponent } from './views/ed-lesson-enrollments/ed-lesson-enrollments.component';
import { EdUserPanelComponent } from './views/ed-user-panel/ed-user-panel.component';
import { isAdminGuard } from '../../auth/guards/is-admin/is-admin.guard';

export default [
  { path: 'cursos', canActivate: [isAdminGuard], component: EdCoursesComponent },
  { path: 'aulas', canActivate: [isAdminGuard], component: EdLessonsComponent },
  { path: 'matriculas', canActivate: [isAdminGuard], component: EdLessonEnrollmentsComponent },
  { path: 'painel', canActivate: [isLoggedGuard], component: EdUserPanelComponent },
] as Routes;
