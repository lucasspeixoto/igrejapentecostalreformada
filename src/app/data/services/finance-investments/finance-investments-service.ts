import { Injectable } from '@angular/core';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { FinanceInvestmentAddParameters } from '../../../domain/models/finance-investment.model';
import { injectSupabase } from '../shared/supabase';
import { FinanceInvestment } from './../../../domain/models/finance-investment.model';

export interface IFinanceInvestmentsService {
  findAll(): Promise<PostgrestSingleResponse<FinanceInvestment[]>>;
  createInvestment(params: FinanceInvestmentAddParameters): Promise<PostgrestSingleResponse<unknown>>;
}

@Injectable({ providedIn: 'root' })
export class FinanceInvestmentsService {
  private supabase = injectSupabase();

  public async findAll(): Promise<PostgrestSingleResponse<FinanceInvestment[]>> {
    return await this.supabase
      .from('finance_investments')
      .select('*, users(full_name)')
      .order('created_at', { ascending: false });
  }

  public async createInvestment(params: FinanceInvestmentAddParameters): Promise<PostgrestSingleResponse<unknown>> {
    return await this.supabase.rpc('insert_investment_and_update_report', params);
  }

  public async updateInvestment(financeInvestment: Partial<FinanceInvestment>): Promise<PostgrestSingleResponse<unknown>> {
    return await this.supabase.from('finance_investments').update(financeInvestment).eq('id', financeInvestment.id);
  }
}
