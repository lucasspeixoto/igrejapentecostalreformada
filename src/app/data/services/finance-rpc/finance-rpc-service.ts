import { Injectable } from '@angular/core';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type {
  FinanceNoteAddParameters,
  FinanceNoteDeleteParameters,
  FinanceNoteEditParameters,
} from '../../../domain/models/finance-note.model';
import { injectSupabase } from '../shared/supabase';

export interface IFinanceRpcService {
  createFinanceNote(params: FinanceNoteAddParameters): Promise<PostgrestSingleResponse<unknown>>;
  editFinanceNote(params: FinanceNoteEditParameters): Promise<PostgrestSingleResponse<unknown>>;
  deleteFinanceNote(params: FinanceNoteDeleteParameters): Promise<PostgrestSingleResponse<unknown>>;
  closeCurrentMonth(): Promise<PostgrestSingleResponse<unknown>>;
}

@Injectable({
  providedIn: 'root',
})
export class FinanceRpcService implements IFinanceRpcService {
  public supabase = injectSupabase();

  public async createFinanceNote(params: FinanceNoteAddParameters): Promise<PostgrestSingleResponse<unknown>> {
    return await this.supabase.rpc('add_note_and_update_report', params);
  }

  public async editFinanceNote(params: FinanceNoteEditParameters): Promise<PostgrestSingleResponse<unknown>> {
    return await this.supabase.rpc('edit_note_and_update_report', params);
  }

  public async deleteFinanceNote(params: FinanceNoteDeleteParameters): Promise<PostgrestSingleResponse<unknown>> {
    return await this.supabase.rpc('delete_note_and_update_report', params);
  }

  public async closeCurrentMonth(): Promise<PostgrestSingleResponse<unknown>> {
    return await this.supabase.rpc('close_month_and_open_next');
  }
}
