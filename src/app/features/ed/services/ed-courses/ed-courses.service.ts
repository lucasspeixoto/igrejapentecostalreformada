import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { LoadingService } from '../../../../services/loading/loading.service';
import { EdCourse } from '../../models/ed-course.model';
import { EdCourseFormValue } from '../../constants/ed-course-form';

@Injectable({
  providedIn: 'root',
})
export class EdCoursesService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public courses = signal<EdCourse[]>([]);

  public totalOfCourses = computed(() => this.courses().length);

  public async getAllCoursesDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('ed_courses')
      .select(
        '*, users(full_name, avatar_url), ed_lessons(count), enrollments:ed_course_enrollments(count)'
      )
      .order('created_at', { ascending: false });

    if (!error) {
      this.courses.set(data);
    } else {
      this.courses.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar cursos da ED, tente novamente mais tarde!',
        life: 3000,
      });
    }

    this.loadingService.isLoading.set(false);
  }

  public async insertCourseDataHandler(course: EdCourseFormValue): Promise<void> {
    this.loadingService.isLoading.set(true);

    const updatedCourse = {
      created_at: new Date().toISOString(),
      user_id: course.userId,
      name: course.name,
      description: course.description,
    } as EdCourse;

    const { error } = await this.supabase.from('ed_courses').insert([updatedCourse]);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao inserir curso. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentCoursesList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Curso inserido com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateCourseDataHandler(course: EdCourseFormValue): Promise<void> {
    this.loadingService.isLoading.set(true);

    const updatedCourse = {
      id: course.id,
      name: course.name,
      description: course.description,
      user_id: course.userId,
    } as EdCourse;

    const { error } = await this.supabase
      .from('ed_courses')
      .update([updatedCourse])
      .eq('id', course.id);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao editar curso. tente novamente!',
        life: 3000,
      });
      this.loadingService.isLoading.set(false);
    } else {
      this.updateCurrentCoursesList();

      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Curso editado com sucesso!',
        life: 3000,
      });
    }
  }

  public async deleteCourseHandler(id: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.from('ed_courses').delete().eq('id', id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir curso. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentCoursesList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Curso excluído com sucesso!',
        life: 3000,
      });
    }
  }

  public async deleteCoursesHandler(ids: string[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase
      .from('ed_courses')
      .delete()
      .in('id', [...ids]);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir cursos. Um ou mais não foram excluídos, por favor verifique!',
        life: 3000,
      });
    } else {
      this.updateCurrentCoursesList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cursos excluídos com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateCurrentCoursesList(): Promise<void> {
    const { data, error } = await this.supabase
      .from('ed_courses')
      .select(
        '*, users(full_name, avatar_url), ed_lessons(count), enrollments:ed_course_enrollments(count)'
      )
      .order('created_at', { ascending: false });

    if (!error) this.courses.set(data);
  }

  public async updateCurrentCoursesListByName(order: 'asc' | 'desc'): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('ed_courses')
      .select('*, users(full_name, avatar_url), ed_lessons(count)')
      .order('name', { ascending: order === 'asc' ? true : false });

    if (!error) {
      this.courses.set(data);
    } else {
      this.courses.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao filtrar cursos, tente novamente!',
        life: 3000,
      });
    }

    this.loadingService.isLoading.set(false);
  }

  public async updateCurrentCoursesListByFilters(
    professors: string[],
    theme: string | null
  ): Promise<void> {
    this.loadingService.isLoading.set(true);

    let query = this.supabase
      .from('ed_courses')
      .select('*, users(full_name, avatar_url), ed_lessons(count)')
      .order('created_at', { ascending: false });

    if (professors && professors.length > 0) {
      query = query.in('user_id', professors);
    }

    if (theme && theme.trim() !== '') {
      query = query.ilike('description', `%${theme}%`);
    }

    const { data, error } = await query;

    if (!error) this.courses.set(data);

    this.loadingService.isLoading.set(false);
  }
}
