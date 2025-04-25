import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { LoadingService } from '../../../../services/loading/loading.service';
import { FileUploadService } from '../../../../services/file-upload/file-upload.service';
import { EdLesson } from '../../models/ed-lesson.model';
import { EdLessonFormValue } from '../../constants/ed-lesson-form';

@Injectable({
  providedIn: 'root',
})
export class EdLessonsService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public fileUploadService = inject(FileUploadService);

  public lessons = signal<EdLesson[]>([]);

  public totalOfLessons = computed(() => this.lessons().length);

  public async getAllLessonsDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('ed_lessons')
      .select(
        '*, course:course_id (name,user:user_id(id, full_name)), enrollments:ed_lesson_enrollments(count)'
      )
      .order('created_at', { ascending: false });

    if (!error) {
      this.lessons.set(data);
    } else {
      this.lessons.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar aulas da ED, tente novamente mais tarde!',
        life: 3000,
      });
    }

    this.loadingService.isLoading.set(false);
  }

  public async insertLessonDataHandler(lesson: EdLessonFormValue): Promise<void> {
    this.loadingService.isLoading.set(true);

    const updatedLesson = {
      created_at: new Date().toISOString(),
      course_id: lesson.courseId,
      name: lesson.name,
      link_pdf_file: lesson.linkPdfFile,
      link_video_file: lesson.linkVideoFile,
      image: lesson.image,
      description: lesson.description,
    } as EdLesson;

    const { error } = await this.supabase.from('ed_lessons').insert([updatedLesson]);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao inserir aula. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentLessonsList();

      this.fileUploadService.uploadedLessonImage.set('');

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Curso inserido com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateLessonDataHandler(lesson: EdLessonFormValue): Promise<void> {
    this.loadingService.isLoading.set(true);

    const updatedLesson = {
      created_at: new Date().toISOString(),
      course_id: lesson.courseId,
      name: lesson.name,
      link_pdf_file: lesson.linkPdfFile,
      link_video_file: lesson.linkVideoFile,
      image: lesson.image,
      description: lesson.description,
    } as EdLesson;

    const { error } = await this.supabase
      .from('ed_lessons')
      .update([updatedLesson])
      .eq('id', lesson.id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao editar aula. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentLessonsList();

      this.fileUploadService.uploadedLessonImage.set('');

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Aula editada com sucesso!',
        life: 3000,
      });
    }
  }

  public async deleteLessonHandler(id: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.from('ed_lessons').delete().eq('id', id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir aula. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentLessonsList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Curso excluído com sucesso!',
        life: 3000,
      });
    }
  }

  public async deleteLessonsHandler(ids: string[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase
      .from('ed_lessons')
      .delete()
      .in('id', [...ids]);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir aulas. Um ou mais não foram excluídos, por favor verifique!',
        life: 3000,
      });
    } else {
      this.updateCurrentLessonsList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cursos excluídos com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateCurrentLessonsList(): Promise<void> {
    const { data, error } = await this.supabase
      .from('ed_lessons')
      .select(
        '*, course:course_id (name,user:user_id(id, full_name)), enrollments:ed_lesson_enrollments(count)'
      )
      .order('created_at', { ascending: false });

    if (!error) this.lessons.set(data);
  }
}
