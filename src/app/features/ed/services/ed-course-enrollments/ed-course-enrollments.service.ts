import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { LoadingService } from '../../../../services/loading/loading.service';
import { EdCourseEnrollment } from '../../models/ed-course-enrollment.model';
import { EdCourse } from '../../models/ed-course.model';
import { EdCoursesService } from '../ed-courses/ed-courses.service';

@Injectable({
  providedIn: 'root',
})
export class EdCourseEnrollmentsService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public edCoursesService = inject(EdCoursesService);

  public enrollments = signal<EdCourseEnrollment[]>([]);

  public totalOfLessonEnrollments = computed(() => this.enrollments().length);

  public async getAllCourseEnrollmentsDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('ed_course_enrollments')
      .select('*, ed_courses(name), users(full_name)')
      .order('created_at', { ascending: false });

    if (!error) this.enrollments.set(data);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.enrollments.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar matrículas, tente novamente mais tarde!',
        life: 3000,
      });
    }
  }

  public async updateCourseEnrollmentStatusHandler(id: string, status: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase
      .from('ed_course_enrollments')
      .update({ status })
      .eq('id', id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao atualizar matrícula, tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentCourseEnrollmentsList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Matrícula atualizada com sucesso!',
        life: 3000,
      });
    }
  }

  public async insertCourseEnrollmentHandler(
    selectedStudentsIds: string[],
    course: EdCourse
  ): Promise<void> {
    if (selectedStudentsIds.length === 0) {
      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'info',
        summary: 'Sem alunos',
        detail: 'Selecione um ou mais alunos para gerar matrícula!',
      });

      return;
    }

    const enrollments: EdCourseEnrollment[] = [];

    for (const userId of selectedStudentsIds) {
      const edLessonEnrollment = {
        created_at: new Date().toISOString(),
        course_id: course?.id,
        user_id: userId!,
        status: 'pending',
      } as EdCourseEnrollment;

      enrollments.push(edLessonEnrollment);
    }

    const { error } = await this.supabase.from('ed_course_enrollments').insert(enrollments);

    if (error) {
      this.loadingService.isLoading.set(false);
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail:
          'Um ou mais aluno(s) selecionado(s) ja possuem matrícula neste curso. Verifique e tente novamente!',
        life: 3000,
      });
      throw new Error(error.message);
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Matrícula(s) inserida(s) com sucesso!',
        life: 3000,
      });
    }

    await this.updateCurrentCourseEnrollmentsList();

    await this.edCoursesService.updateCurrentCoursesList();

    this.loadingService.isLoading.set(false);
  }

  public async deleteCourseEnrollmentHandler(id: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.from('ed_course_enrollments').delete().eq('id', id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir matrícula. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentCourseEnrollmentsList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Matrícula excluída com sucesso!',
        life: 3000,
      });
    }
  }

  public async deleteCourseEnrollmentsHandler(ids: string[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase
      .from('ed_course_enrollments')
      .delete()
      .in('id', [...ids]);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir matrículas. Um ou mais não foram excluídos, por favor verifique!',
        life: 3000,
      });
    } else {
      this.updateCurrentCourseEnrollmentsList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Matrículas excluídas com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateCurrentCourseEnrollmentsList(): Promise<void> {
    const { data, error } = await this.supabase
      .from('ed_course_enrollments')
      .select('*, ed_courses(name), users(full_name)')
      .order('created_at', { ascending: false });

    if (!error) this.enrollments.set(data);
  }
}
