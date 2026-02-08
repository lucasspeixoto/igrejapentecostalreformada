/* eslint-disable @typescript-eslint/naming-convention */
import type { ISupabaseResponse } from "./supabase.model";

export interface FinanceNoteCategory {
  id: string;
  created_at: string;
  name: string;
  type: 'C' | 'D';
}

export type IFindAllFinanceNoteCategoriesResponse = ISupabaseResponse<FinanceNoteCategory[]>
