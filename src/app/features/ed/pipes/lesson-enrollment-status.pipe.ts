import { Pipe, PipeTransform } from '@angular/core';

export const STATUS_OPTIONS: Record<string, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
  canceled: 'Cancelado',
  completed: 'Concluído',
};

@Pipe({
  name: 'appLessonEnrollmentStatus',
})
export class LessonEnrollmentStatusPipe implements PipeTransform {
  public transform(status: string): string {
    return STATUS_OPTIONS[status] || status;
  }
}
