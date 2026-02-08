/* eslint-disable @typescript-eslint/naming-convention */
import type { PostgrestError } from "@supabase/supabase-js";
import type { ISupabaseResponse } from "./supabase.model";

export interface FinanceNote {
  id: string;
  created_at: string;
  user_id: string;
  member_id: string;
  type: 'C' | 'D';
  value: number;
  date: string;
  description: string;
  category_id: string;
  users: { full_name: string };
  finance_categories: { name: string };
  members: { name: string };
  is_checked: boolean;
}

export type FinanceNoteProcess = 'add' | 'edit' | 'delete';

export type TopFinanceNoteByCategory = {
  name: string;
  total: number;
  quantity: number;
  percent: number;
};

export interface FinanceNoteAddParameters {
  p_date: string;
  p_user_id: string;
  p_description: string;
  p_category_id: string;
  p_member_id: string;
  p_type: 'C' | 'D';
  p_value: number;
}

export interface FinanceNoteEditParameters {
  p_note_id: string;
  p_date: string;
  p_user_id: string;
  p_description: string;
  p_category_id: string;
  p_member_id: string;
  p_type: 'C' | 'D';
  p_value: number;
}

export interface FinanceNoteDeleteParameters {
  p_note_id: string;
}

export type IFindAllFinanceNotesByDateRangeResponse = ISupabaseResponse<FinanceNote[]>
export type IUpdateFinanceNoteResponse = ISupabaseResponse<FinanceNote>
export interface IDeleteFinanceNoteResponse { error: PostgrestError | null; };
