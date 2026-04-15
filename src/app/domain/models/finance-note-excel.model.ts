export interface FinanceNoteExcel {
  date: string;
  description: string;
  member_id: string; // DZ: Código membro
  category: string; //  finance_categories: { name: string };
  debit: number | null;
  credit: number | null;
}
