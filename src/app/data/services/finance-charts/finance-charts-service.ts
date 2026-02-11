/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { MonthlyTotal } from '../../../domain/models/finance-reports.model';
import { injectSupabase } from '../shared/supabase';

export interface IFinanceChartsService {
  getMonthlyTotals(targetYear: number, targetType: 'C' | 'D' | 'A'): Promise<PostgrestSingleResponse<MonthlyTotal[]>>;
}

@Injectable({
  providedIn: 'root',
})
export class FinanceChartsService implements IFinanceChartsService {
  public supabase = injectSupabase();

  public async getMonthlyTotals(
    targetYear: number,
    targetType: 'C' | 'D' | 'A'
  ): Promise<PostgrestSingleResponse<MonthlyTotal[]>> {
    return await this.supabase.rpc('get_monthly_totals', { target_year: targetYear, target_type: targetType });
  }
}
