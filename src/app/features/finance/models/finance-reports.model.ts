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
