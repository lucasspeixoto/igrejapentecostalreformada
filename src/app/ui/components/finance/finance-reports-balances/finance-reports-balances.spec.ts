import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinanceReportsBalances } from './finance-reports-balances';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { signal } from '@angular/core';

describe('FinanceReportsBalances', () => {
  let component: FinanceReportsBalances;
  let fixture: ComponentFixture<FinanceReportsBalances>;

  const mockFinanceReportsViewModel = {
    selectedMonthAndYear: signal('01/2025'),
    getLastMonthTotalBalance: vi.fn().mockReturnValue(100),
    getLastMonthBalance: vi.fn().mockReturnValue(50),
    getCurrentMonthTotalBalance: vi.fn().mockReturnValue(1100),
    getCurrentMonthBalance: vi.fn().mockReturnValue(100),
    getCurrentMonthState: vi.fn().mockReturnValue('open'),
    totalOfDebitNotes: vi.fn().mockReturnValue(70),
    totalOfCreditNotes: vi.fn().mockReturnValue(30),
    availableMonths: signal([]),
    minDate: signal(new Date()),
    maxDate: signal(new Date()),
  };

  const mockFinanceNotesViewModel = {
    financeNotes: signal([]),
    totalOfFinanceNotes: vi.fn().mockReturnValue(100),
    totalOfOrganicNotes: vi.fn().mockReturnValue(50),
    totalOfDebitNotes: vi.fn().mockReturnValue(70),
    totalOfCreditNotes: vi.fn().mockReturnValue(30),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceReportsBalances],
      providers: [
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
        { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceReportsBalances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
