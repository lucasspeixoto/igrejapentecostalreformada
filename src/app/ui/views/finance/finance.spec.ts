import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Finance } from './finance';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RouterModule } from '@angular/router';
import { FinanceNotesViewModel } from '../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../view-models/finance-reports/finance-reports.view-model';
import { FinanceReportsBalances } from '../../components/finance/finance-reports-balances/finance-reports-balances';
import { signal } from '@angular/core';

describe('Finance', () => {
  let component: Finance;
  let fixture: ComponentFixture<Finance>;

  const mockFinanceNotesViewModel = {
    getAllFinanceNotesDataHandler: vi.fn().mockResolvedValue(undefined),
    totalOfFinanceNotes: signal(0),
    totalOfOrganicNotes: signal(0),
    totalOfDebitNotes: signal(0),
    totalOfCreditNotes: signal(0),
  };

  const mockFinanceReportsViewModel = {
    findAll: vi.fn().mockResolvedValue(undefined),
    totalOfDebitNotes: signal(0),
    totalOfCreditNotes: signal(0),
    selectedMonthAndYear: signal('03/2026'),
    availableMonths: signal(['03/2026']),
    getCurrentMonthBalance: vi.fn().mockReturnValue(0),
    getLastMonthBalance: vi.fn().mockReturnValue(0),
    getCurrentMonthTotalBalance: vi.fn().mockReturnValue(0),
    getLastMonthTotalBalance: vi.fn().mockReturnValue(0),
    availabeMonthsLabelsInAYear: vi.fn().mockReturnValue([]),
    inputs: signal([]),
    outputs: signal([]),
    chartMonthText: signal(''),
    monthBalancesInAYear: vi.fn().mockReturnValue([]),
    getCurrentMonthState: vi.fn().mockReturnValue('open'),
    isSelectedMonthClosed: signal(false),
  };

  beforeEach(async () => {
    // Need to provide canvas context for PrimeNG components inside FinanceReportsBalances
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      // mock context
    } as any);

    await TestBed.configureTestingModule({
      imports: [Finance, RouterModule.forRoot([]), FinanceReportsBalances],
      providers: [
        { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
      ],
    }).overrideComponent(Finance, {
      set: {
        providers: [
          { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
          { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(Finance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on init', () => {
    expect(mockFinanceNotesViewModel.getAllFinanceNotesDataHandler).toHaveBeenCalled();
    expect(mockFinanceReportsViewModel.findAll).toHaveBeenCalled();
  });

  it('should render finance reports balances component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-finance-reports-balances')).toBeTruthy();
  });

  it('should have a router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
