import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primengDate',
})
export class PrimengDatePipe implements PipeTransform {
  public transform(date: string): string {
    if (date) {
      const splitDate = date.trim().split('-');
      const year = splitDate[0];
      const month = splitDate[1];
      const day = splitDate[2];

      return `${day}/${month}/${year}`;
    }

    return date;
  }
}
