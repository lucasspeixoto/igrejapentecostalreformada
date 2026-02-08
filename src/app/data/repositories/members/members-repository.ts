import { computed, inject, Injectable, signal } from "@angular/core";
import { MembersService } from '../../services/members/members-service';
import type { IDeleteMembersResponse, IFindAllMembersResponse, IUpdatedMemberResponse, Member } from '../../../domain/models/members.model';

@Injectable({
  providedIn: 'root',
})
export class MembersRepository {
  private membersService = inject(MembersService);

  private _members = signal<Member[]>([]);
  public members = this._members.asReadonly();

  public totalOfMembers = computed(() => this.members().length);

  public async findAll(): Promise<IFindAllMembersResponse> {
    const { data, error } = await this.membersService.findAll();
    if (!error && data) {
      this._members.set(data)
    } else {
      this._members.set([])
    };

    return { data: data ?? null, error };
  }

  public async saveMember(member: Partial<Member>): Promise<IUpdatedMemberResponse> {
    const { data, error } = await this.membersService.saveMember(member);
    return { data, error };
  }

  public async updateMember(member: Member, memberId: number): Promise<IUpdatedMemberResponse> {
    const { data, error } = await this.membersService.updateMember(member, memberId);
    return { data, error };
  }

  public async deleteMember(number: number): Promise<IDeleteMembersResponse> {
    const { error } = await this.membersService.deleteMember(number);
    return { error };
  }

  public async deleteMembers(numbers: number[]): Promise<IDeleteMembersResponse> {
    const { error } = await this.membersService.deleteMembers(numbers);
    return { error };
  }
}
