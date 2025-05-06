import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { LoadingService } from '../../../../services/loading/loading.service';
import { EdLessonEnrollment } from '../../models/ed-lesson-enrollment.model';
import { EdLesson } from '../../models/ed-lesson.model';
import { EdLessonsService } from '../ed-lessons/ed-lessons.service';

@Injectable({
  providedIn: 'root',
})
export class EdLessonEnrollmentsService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public edLessonsService = inject(EdLessonsService);

  public enrollments = signal<EdLessonEnrollment[]>([]);

  public totalOfLessonEnrollments = computed(() => this.enrollments().length);

  public async getAllLessonEnrollmentsDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('ed_lesson_enrollments')
      .select('*, ed_lessons(name), users(full_name), ed_courses:lesson_id(name)')
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

  public async updateLessonEnrollmentStatusHandler(id: string, status: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase
      .from('ed_lesson_enrollments')
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
      this.updateCurrentLessonEnrollmentsList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Matrícula atualizada com sucesso!',
        life: 3000,
      });
    }
  }

  public async insertLessonEnrollmentHandler(
    selectedStudentsIds: string[],
    selectedLessonForEnrollment: EdLesson
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

    const enrollments: EdLessonEnrollment[] = [];

    for (const userId of selectedStudentsIds) {
      const edLessonEnrollment = {
        created_at: new Date().toISOString(),
        lesson_id: selectedLessonForEnrollment?.id,
        user_id: userId!,
        status: 'pending',
      } as EdLessonEnrollment;

      enrollments.push(edLessonEnrollment);
    }

    const { error } = await this.supabase.from('ed_lesson_enrollments').insert(enrollments);

    if (error) {
      this.loadingService.isLoading.set(false);
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail:
          'Um ou mais aluno(s) selecionado(s) ja possuem matrícula nesta aula. Verifique e tente novamente!',
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

    await this.updateCurrentLessonEnrollmentsList();

    await this.edLessonsService.updateCurrentLessonsList();

    this.loadingService.isLoading.set(false);
  }

  public async deleteLessonEnrollmentHandler(id: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.from('ed_lesson_enrollments').delete().eq('id', id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir matrícula. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentLessonEnrollmentsList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Matrícula excluída com sucesso!',
        life: 3000,
      });
    }
  }

  public async deleteLessonEnrollmentsHandler(ids: string[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase
      .from('ed_lesson_enrollments')
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
      this.updateCurrentLessonEnrollmentsList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Matrículas excluídas com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateCurrentLessonEnrollmentsList(): Promise<void> {
    const { data, error } = await this.supabase
      .from('ed_lesson_enrollments')
      .select('*, ed_lessons(name), users(full_name), ed_courses:lesson_id(name)')
      .order('created_at', { ascending: false });

    if (!error) this.enrollments.set(data);
  }
}
