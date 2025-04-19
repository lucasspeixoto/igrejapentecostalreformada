export interface FinanceNote {
  id: string;
  created_at: string;
  user_id: string;
  member_id: string;
  type: 'C' | 'D';
  value: number;
  date: string;
  description: string;
  category_id: string;
  users: { full_name: string };
  finance_categories: { name: string };
  members: { name: string };
  is_checked: boolean;
}

export type FinanceNoteProcess = 'add' | 'edit' | 'delete';

export type TopFinanceNoteByCategory = {
  name: string;
  total: number;
  quantity: number;
  percent: number;
};
