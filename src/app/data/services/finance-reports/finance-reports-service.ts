import { Injectable } from "@angular/core";
import { injectSupabase } from "../shared/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { FinanceReports } from "../../../domain/models/finance-reports.model";

export interface IFinanceReportsService {
  findAll(): Promise<PostgrestSingleResponse<FinanceReports[]>>;
  create(financeReport: FinanceReports): Promise<PostgrestSingleResponse<FinanceReports>>;
  update(financeReport: FinanceReports): Promise<PostgrestSingleResponse<null>>;
  delete(id: string): Promise<PostgrestSingleResponse<null>>;
}

@Injectable({ providedIn: 'root' })
export class FinanceReportsService implements IFinanceReportsService {

  public supabase = injectSupabase();

  public async findAll(): Promise<PostgrestSingleResponse<FinanceReports[]>> {
    return await this.supabase.from('finance_reports').select('*').order('created_at', { ascending: false });
  }

  public async create(financeReport: FinanceReports): Promise<PostgrestSingleResponse<FinanceReports>> {
    return await this.supabase.from('finance_reports').insert([financeReport]).select().single();
  }

  public async update(financeReport: FinanceReports): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('finance_reports').update([financeReport]).eq('id', financeReport.id);
  }

  public async delete(id: string): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('finance_reports').delete().eq('id', id);
  }
}

