import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValuesByCategory } from './values-by-category';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ValuesByCategory', () => {
  let component: ValuesByCategory;
  let fixture: ComponentFixture<ValuesByCategory>;

  const mockFinanceNotesViewModel = {
    getTop3NotesByCategories: vi.fn().mockImplementation((type: string) => {
      if (type === 'C') return [{ name: 'Credit 1', total: 100, percent: 100 }];
      return [{ name: 'Debit 1', total: 200, percent: 100 }];
    }),
    getAllFinanceNotesDataHandler: vi.fn(),
  };

  const mockFinanceReportsViewModel = {
    availableMonths: signal(['01/2025', '02/2025']),
    selectedMonthAndYear: signal('01/2025'),
    setSelectedMonthAndYear: vi.fn(),
  };

  interface MonthChangeEvent {
    value: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValuesByCategory, NoopAnimationsModule],
      providers: [
        { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ValuesByCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate top3CreditNotesByCategories correctly', () => {
    const result = component.top3CreditNotesByCategories();
    expect(result).toEqual([{ name: 'Credit 1', total: 100, percent: 100 }]);
    expect(mockFinanceNotesViewModel.getTop3NotesByCategories).toHaveBeenCalledWith('C');
  });

  it('should calculate top3DebitNotesByCategories correctly', () => {
    const result = component.top3DebitNotesByCategories();
    expect(result).toEqual([{ name: 'Debit 1', total: 200, percent: 100 }]);
    expect(mockFinanceNotesViewModel.getTop3NotesByCategories).toHaveBeenCalledWith('D');
  });

  it('should handle month and year change', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const event: MonthChangeEvent = { value: '02/2025' };
    
    component.onMonthAndYearChange(event);
    
    expect(setItemSpy).toHaveBeenCalledWith('IPR-SISTEMA-GESTAO:CURRENT-MONTH', '02/2025');
    expect(mockFinanceReportsViewModel.setSelectedMonthAndYear).toHaveBeenCalledWith('02/2025');
    expect(mockFinanceNotesViewModel.getAllFinanceNotesDataHandler).toHaveBeenCalled();
  });
});
