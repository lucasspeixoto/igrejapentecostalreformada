/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from "@angular/core";
import { injectSupabase } from "../shared/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { FinanceNote } from "../../../domain/models/finance-note.model";

export interface IFinanceNotesService {
  findAllByDateRange(startDate: string, endDate: string): Promise<PostgrestSingleResponse<FinanceNote[]>>;
  findAllByDateRangeAndCategory(startDate: string, endDate: string, categoryId: string): Promise<PostgrestSingleResponse<FinanceNote[]>>
  create(financeNote: FinanceNote): Promise<PostgrestSingleResponse<FinanceNote>>;
  update(financeNote: FinanceNote): Promise<PostgrestSingleResponse<null>>;
  delete(id: string): Promise<PostgrestSingleResponse<null>>;
}

@Injectable({
  providedIn: 'root',
})
export class FinanceNotesService implements IFinanceNotesService {

  public supabase = injectSupabase();

  public async findAllByDateRange(startDate: string, endDate: string): Promise<PostgrestSingleResponse<FinanceNote[]>> {
    return await this.supabase
      .from('finance_notes')
      .select('*, users(full_name), finance_categories(name), members(name)')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('created_at', { ascending: false });
  }

  public async findAllByDateRangeAndCategory(startDate: string, endDate: string, categoryId: string): Promise<PostgrestSingleResponse<FinanceNote[]>> {
    return await this.supabase
      .from('finance_notes')
      .select('*, users(full_name), finance_categories(name), members(name)')
      .eq('category_id', categoryId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('created_at', { ascending: false });
  }

  public async create(financeNote: FinanceNote): Promise<PostgrestSingleResponse<FinanceNote>> {
    return await this.supabase.from('finance_notes').insert([financeNote]).select().single();
  }

  public async update(financeNote: FinanceNote): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('finance_notes').update([financeNote]).eq('id', financeNote.id);
  }

  public async delete(id: string): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('finance_notes').delete().eq('id', id);
  }

  public async updateFinanceNoteCheck(financeNote: FinanceNote): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('finance_notes').update({ is_checked: financeNote.is_checked }).eq('id', financeNote.id);
  }
}
