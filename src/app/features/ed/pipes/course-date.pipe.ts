import { Pipe, PipeTransform } from '@angular/core';

export const MONTS_OPTIONS: Record<string, string> = {
  '01': 'jan.',
  '02': 'fev.',
  '03': 'mar.',
  '04': 'abr.',
  '05': 'mai.',
  '06': 'jun.',
  '07': 'jul.',
  '08': 'ago.',
  '09': 'set.',
  '10': 'out.',
  '11': 'nov.',
  '12': 'dez.',
};

@Pipe({
  name: 'appCourseDate',
})
export class CourseDatePipe implements PipeTransform {
  public transform(date: string): string {
    const calendarDate = date.split('T')[0];

    const year = calendarDate.split('-')[0];
    const month = calendarDate.split('-')[1];
    const day = calendarDate.split('-')[2];

    return `${day} ${MONTS_OPTIONS[month]} ${year}`;
  }
}
