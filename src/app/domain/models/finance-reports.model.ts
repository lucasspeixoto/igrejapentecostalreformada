/* eslint-disable @typescript-eslint/naming-convention */
import type { PostgrestError } from "@supabase/supabase-js";
import type { ISupabaseResponse } from "./supabase.model";

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

export type IFindAllFinanceReportsByDateRangeResponse = ISupabaseResponse<FinanceReports[]>

export type IUpdateFinanceReportsResponse = ISupabaseResponse<FinanceReports>

export interface IDeleteFinanceReportsResponse { error: PostgrestError | null; };
