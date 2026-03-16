import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinanceReports } from './finance-reports';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MonthlyTotalsByYear } from '../../../components/finance/monthly-totals-by-year/monthly-totals-by-year';
import { SummaryForAssembly } from '../../../components/finance/summary-for-assembly/summary-for-assembly';
import { InputsAndOutputsMontlhy } from '../../../components/finance/inputs-and-outputs-monthly/inputs-and-outputs-monthly';
import { ValuesByCategory } from '../../../components/finance/values-by-category/values-by-category';
import { AnualInputsAndOutputs } from '../../../components/finance/anual-inputs-and-outputs-balance/anual-inputs-and-outputs-balance';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { LayoutService } from '../../../../data/services/shared/layout';
import { MonthlyTotalsByYearViewModel } from '../../../view-models/finance-charts/monthly-totals-by-year.view-model';
import { AnualInputsAndOutputsBalanceViewModel } from '../../../view-models/finance-charts/anual-inputs-and-outputs-balance.view-model';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';
vi.stubGlobal('ResizeObserver', class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
});

describe('FinanceReports', () => {
  let component: FinanceReports;
  let fixture: ComponentFixture<FinanceReports>;

  const mockSignal = signal([]);
  const mockFinanceNotesViewModel = {
    totalOfFinanceNotes: signal(0),
    totalOfOrganicNotes: signal(0),
    totalOfDebitNotes: signal(0),
    totalOfCreditNotes: signal(0),
    totalOfCampaignNotes: signal(0),
    totalOfSeminarNotes: signal(0),
    getAllFinanceNotesDataHandler: vi.fn(),
    getAllDebitNotesData: vi.fn().mockReturnValue([]),
    getAllCreditNotesData: vi.fn().mockReturnValue([]),
    getAllOrganicNotesData: vi.fn().mockReturnValue([]),
    getAllSeminarNotesData: vi.fn().mockReturnValue([]),
    getAllCampaignNotesData: vi.fn().mockReturnValue([]),
    getTop3NotesByCategories: vi.fn().mockReturnValue([]),
  };
  const mockFinanceReportsViewModel = {
    totalOfDebitNotes: signal(0),
    totalOfCreditNotes: signal(0),
    getCurrentMonthBalance: signal(0),
    selectedMonthAndYear: signal('03/2026'),
    getLastMonthBalance: vi.fn().mockReturnValue(0),
    getCurrentMonthTotalBalance: vi.fn().mockReturnValue(0),
    getLastMonthTotalBalance: vi.fn().mockReturnValue(0),
    getCurrentMonthState: vi.fn().mockReturnValue('open'),
    availabeMonthsLabelsInAYear: signal([]),
    availabeMonthsLabels: signal([]),
    availableMonths: signal(['03/2026']),
    monthLabels: signal({}),
    monthBalancesInAYear: signal([]),
    inputs: signal([]),
    outputs: signal([]),
    getMonthlyTotalCategories: vi.fn().mockReturnValue([]),
    getMonthlyCategories: vi.fn().mockReturnValue([]),
    getAnualInputsAndOutputsBalance: vi.fn().mockReturnValue([]),
    initAnualInputsAndOutputsBalance: vi.fn(),
    findAll: vi.fn().mockResolvedValue(undefined),
    setSelectedMonthAndYear: vi.fn(),
    setSelectedYear: vi.fn(),
    chartMonthText: signal('Maio 2026'),
  };
  const mockConfirmationService = {
    confirm: vi.fn(),
    requireConfirmation$: new Subject<any>().asObservable(),
  };
  const mockLayoutService = {
    isDarkTheme: signal(false),
    layoutConfig: signal({ darkTheme: false }),
    transitionComplete: signal(false),
  };

  beforeEach(async () => {
    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({} as any);

    await TestBed.configureTestingModule({
      imports: [
        FinanceReports,
        MonthlyTotalsByYear,
        SummaryForAssembly,
        InputsAndOutputsMontlhy,
        ValuesByCategory,
        AnualInputsAndOutputs,
      ],
      providers: [
        { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
        { provide: LayoutService, useValue: mockLayoutService },
        { provide: MonthlyTotalsByYearViewModel, useValue: { getMonthlyTotalCategories: vi.fn().mockReturnValue(signal([])), getMonthlyCategories: vi.fn().mockResolvedValue([]), months: [], availableYears: [2025, 2026] } },
        { provide: AnualInputsAndOutputsBalanceViewModel, useValue: { availableYears: [2025, 2026], getAnualInputsAndOutputsBalance: signal([]), initAnualInputsAndOutputsBalance: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render reporting components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-monthly-totals-by-year')).toBeTruthy();
    expect(compiled.querySelector('app-summary-for-assembly')).toBeTruthy();
    expect(compiled.querySelector('app-inputs-and-outputs-monthly')).toBeTruthy();
    expect(compiled.querySelector('app-values-by-category')).toBeTruthy();
    expect(compiled.querySelector('app-anual-inputs-and-outputs-balance')).toBeTruthy();
  });
});
