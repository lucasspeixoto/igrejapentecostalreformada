import { Injectable } from "@angular/core";
import { injectSupabase } from "../shared/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { Member } from "../../../domain/models/members.model";

export interface IMembersService {
  findAll(): Promise<PostgrestSingleResponse<Member[]>>;
  saveMember(member: Partial<Member>): Promise<PostgrestSingleResponse<null>>;
  updateMember(member: Member, memberId: number): Promise<PostgrestSingleResponse<null>>;
  deleteMember(number: number): Promise<PostgrestSingleResponse<null>>;
  deleteMembers(numbers: number[]): Promise<PostgrestSingleResponse<null>>
}

@Injectable({
  providedIn: 'root',
})
export class MembersService implements IMembersService {

  public supabase = injectSupabase();

  public async findAll(): Promise<PostgrestSingleResponse<Member[]>> {
    return await this.supabase.from('members').select('*').order('name', { ascending: true });
  }

  public async saveMember(member: Partial<Member>): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('members').insert([member]);
  }

  public async updateMember(member: Member, memberId: number): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('members').update([member]).eq('number', memberId);
  }

  public async deleteMember(number: number): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('members').delete().eq('number', number);
  }

  public async deleteMembers(numbers: number[]): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('members').delete().in('number', [...numbers]);
  }
}
