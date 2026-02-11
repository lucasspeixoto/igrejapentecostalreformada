/* eslint-disable @typescript-eslint/naming-convention */
import type { PostgrestError } from '@supabase/supabase-js';
import type { ISupabaseResponse } from './supabase.model';

export interface FinanceReports {
  id: string;
  created_at: string;
  month: string;
  month_balance: number;
  balance: number;
  state: 'open' | 'closed' | 'start';
  inputs: number;
  outputs: number;
}

export type IFindAllFinanceReportsByDateRangeResponse = ISupabaseResponse<FinanceReports[]>;

export type IUpdateFinanceReportsResponse = ISupabaseResponse<FinanceReports>;

export interface IDeleteFinanceReportsResponse {
  error: PostgrestError | null;
}

export interface MonthlyTotalDTO {
  category_id: string;
  category_name: string;
  month: number; // 1 a 12
  total: number;
  type: 'C' | 'D';
}

// 2. O formato ideal para exibir na tabela (ViewModel)
// Uma linha por categoria, com um array de 12 posições para os meses
export interface CategoryRow {
  category: string;
  type: 'C' | 'D';
  values: number[]; // Índice 0 = Jan, 1 = Fev... 11 = Dez
  totalYear: number;
}

export interface MonthlyTotal {
  category_id: string;
  category_name: string;
  month: number;
  total: number;
  type: string;
}

export interface MonthlyTotalCategory {
  name: string;
  type: string;
  months: number[];
  totalYear: number;
}

export interface IGetMonthlyTotalsResponse {
  data: MonthlyTotal[] | null;
  error: PostgrestError | null;
}
