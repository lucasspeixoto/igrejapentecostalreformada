import { Pipe, PipeTransform } from '@angular/core';

type MemberType = 'member' | 'congregated' | 'disconnected';

const MEMBER_TYPE_LABELS: Record<MemberType, string> = {
  member: 'Membro',
  congregated: 'Congregado',
  disconnected: 'Desligado',
};

@Pipe({
  name: 'memberType',
})
export class MemberTypePipe implements PipeTransform {
  public transform(memberType: MemberType): string {
    return MEMBER_TYPE_LABELS[memberType];
  }
}
