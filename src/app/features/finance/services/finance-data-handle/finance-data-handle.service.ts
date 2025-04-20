import { Injectable } from '@angular/core';
import { FinanceNote } from '../../models/finance-note.model';
import { FinanceNoteExcel } from '../../models/finance-note-excel.model';

@Injectable({
  providedIn: 'root',
})
export class FinanceDataHandleService {
  public generateFinanceNotesForCSV(financeNotes: FinanceNote[]): FinanceNoteExcel[] {
    return financeNotes.reverse().map(item => {
      return {
        date: item.date.split('-')[2],
        description: item.description,
        member_id: item.member_id,
        category: item.finance_categories.name,
        debit: item.type === 'D' ? item.value : null,
        credit: item.type === 'C' ? item.value : null,
      } as FinanceNoteExcel;
    });
  }
}
