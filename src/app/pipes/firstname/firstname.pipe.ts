import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstname',
})
export class FirstnamePipe implements PipeTransform {
  public transform(fullName: string | null): string {
    if (!fullName) return '';

    const parts = fullName.trim().split(/\s+/);

    const first = parts[0];

    return first;
  }
}
