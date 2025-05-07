import { Pipe, PipeTransform } from '@angular/core';

type MemberType = 'member' | 'congregated';

@Pipe({
  name: 'memberType',
})
export class MemberTypePipe implements PipeTransform {
  public transform(memberType: MemberType): string {
    return memberType === 'congregated' ? 'Congregado' : 'Membro';
  }
}
