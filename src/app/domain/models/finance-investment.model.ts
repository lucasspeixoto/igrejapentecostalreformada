import type { ISupabaseResponse } from './supabase.model';

/* eslint-disable @typescript-eslint/naming-convention */
export interface FinanceInvestment {
  id: string;
  created_at: string;
  updated_at: string;
  value: number;
  reason: string;
  user_id: string;
  account_bank: string;
  month: string;
  users: { full_name: string };
}

export type FinanceInvestmentProcess = 'add' | 'edit';

export type IFindAllFinanceInvestmentsByDateRangeResponse = ISupabaseResponse<FinanceInvestment[]>;
export type IUpdateFinanceInvestmenteResponse = ISupabaseResponse<unknown>;

export interface FinanceInvestmentAddParameters {
  p_value: number;
  p_reason: string;
  p_account_bank: string;
}
