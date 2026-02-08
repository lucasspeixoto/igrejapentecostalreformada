import { Injectable } from "@angular/core";
import { injectSupabase } from "../shared/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { FinanceNoteCategory } from "../../../domain/models/finance-category.model";


export interface IFinanceNoteCategoriesService {
  findAll(): Promise<PostgrestSingleResponse<FinanceNoteCategory[]>>;
}

@Injectable({
  providedIn: 'root',
})
export class FinanceNoteCategoriesService implements IFinanceNoteCategoriesService {

  public supabase = injectSupabase();

  public async findAll(): Promise<PostgrestSingleResponse<FinanceNoteCategory[]>> {
    return await this.supabase.from('finance_categories').select('*').order('name', { ascending: true });
  }
}
