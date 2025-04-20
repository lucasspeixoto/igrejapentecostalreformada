import { TestBed } from '@angular/core/testing';
import { FinanceDataHandleService } from './finance-data-handle.service';
import { FinanceNote } from '../../models/finance-note.model';
import { FinanceNoteExcel } from '../../models/finance-note-excel.model';

describe('FinanceDataHandleService', () => {
  let service: FinanceDataHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceDataHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateFinanceNotesForCSV', () => {
    it('should correctly transform FinanceNote objects into FinanceNoteExcel objects', () => {
      const financeNotes: Partial<FinanceNote>[] = [
        {
          date: '2023-10-01',
          description: 'Donation',
          member_id: '1',
          finance_categories: { name: 'Charity' },
          type: 'C',
          value: 100,
        },
        {
          date: '2023-09-15',
          description: 'Expense',
          member_id: '2',
          finance_categories: { name: 'Utilities' },
          type: 'D',
          value: 50,
        },
      ];

      const expected: FinanceNoteExcel[] = [
        {
          date: '15',
          description: 'Expense',
          member_id: '2',
          category: 'Utilities',
          debit: 50,
          credit: null,
        },
        {
          date: '01',
          description: 'Donation',
          member_id: '1',
          category: 'Charity',
          debit: null,
          credit: 100,
        },
      ];

      const result = service.generateFinanceNotesForCSV(financeNotes as FinanceNote[]);
      expect(result).toEqual(expected);
    });

    it('should return an empty array when input is empty', () => {
      const result = service.generateFinanceNotesForCSV([]);
      expect(result).toEqual([]);
    });
  });
});
