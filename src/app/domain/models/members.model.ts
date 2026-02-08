/* eslint-disable @typescript-eslint/naming-convention */
import type { PostgrestError } from "@supabase/supabase-js";
import type { ISupabaseResponse } from "./supabase.model";

export interface Member {
  created_at: string;
  number: number;
  name: string;
  birthday: string;
  rg: string | null;
  cpf: string | null;
  address: string;
  baptism_date: string | null;
  previous_church: string | null;
  baptism_church: string | null;
  naturality: string | null;
  cellphone: string | null;
  tellphone: string | null;
  marital_status: string;
  email: string | null;
  member_type: string;
}

export type IFindAllMembersResponse = ISupabaseResponse<Member[]>

export type IUpdatedMemberResponse = ISupabaseResponse<Member>

export interface IDeleteMembersResponse { error: PostgrestError | null; };
