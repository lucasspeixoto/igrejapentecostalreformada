import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinanceNotes } from './finance-notes';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuditValidationWarnings } from '../../../components/finance/audit-validation-warnings/audit-validation-warnings';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { MembersViewModel } from '../../../view-models/members/members.view-model';
import { FinanceNoteCategoriesViewModel } from '../../../view-models/finance-note-categories/finance-note-categories.view-model';
import { AuthenticationViewModel } from '../../../view-models/auth/authentication/authentication.view-model';
import { LoadingService } from '../../../../data/services/shared/loading/loading';
import { ExcelService } from '../../../../data/services/shared/excel';
import { DatePipe } from '@angular/common';
import { signal } from '@angular/core';
import type { FinanceNote } from '../../../../domain/models/finance-note.model';

function createFinanceNote(): FinanceNote {
  return {
    id: 'note-1',
    created_at: '2026-01-01',
    user_id: 'user-1',
    member_id: 'member-1',
    type: 'D',
    value: 100,
    date: '2026-01-01',
    description: 'Test note',
    category_id: 'category-1',
    users: { full_name: 'User Test' },
    finance_categories: { name: 'Category Test' },
    members: { name: 'Member Test' },
    is_checked: false,
  };
}

vi.stubGlobal('ResizeObserver', class {
  public observe = vi.fn();
  public unobserve = vi.fn();
  public disconnect = vi.fn();
});

describe('FinanceNotes', () => {
  let component: FinanceNotes;
  let fixture: ComponentFixture<FinanceNotes>;

  const mockFinanceNotesViewModel = {
    getAllFinanceNotesDataHandler: vi.fn().mockResolvedValue(undefined),
    getAllFinanceNotesByCategory: vi.fn().mockResolvedValue(undefined),
    updateFinanceNoteCheck: vi.fn(),
    createFinanceNote: vi.fn(),
    editFinanceNote: vi.fn(),
    deleteFinanceNote: vi.fn(),
    generateFinanceNotesForCSV: vi.fn().mockReturnValue([]),
    generateFinanceNoteAddParameters: vi.fn(),
    generateFinanceNoteEditParameters: vi.fn(),
    financeNotes: signal<FinanceNote[]>([]),
    pagedFinanceNotes: signal<FinanceNote[]>([]),
    totalOfFinanceNotes: signal(0),
    totalOfOrganicNotes: signal(0),
    totalOfDebitNotes: signal(0),
    totalOfCreditNotes: signal(0),
  };

  const mockFinanceReportsViewModel = {
    selectedMonthAndYear: signal('03/2026'),
    availableMonths: signal([{ label: '03/2026', value: '03/2026' }]),
    isSelectedMonthClosed: signal(false),
    minDate: signal(new Date()),
    maxDate: signal(new Date()),
    setSelectedMonthAndYear: vi.fn(),
    findAll: vi.fn().mockResolvedValue(undefined),
    openMonth: vi.fn(),
    getCurrentMonthState: vi.fn().mockReturnValue('open'),
  };

  const mockMembersViewModel = {
    findAll: vi.fn().mockResolvedValue(undefined),
    members: signal([]),
  };

  const mockFinanceNoteCategoriesViewModel = {
    findAll: vi.fn().mockResolvedValue(undefined),
    financeNoteTypes: signal([]),
  };

  const mockAuthenticationViewModel = {
    currentSession: signal({ user: { id: 'user-1' } }),
  };
  
  const mockConfirmationService = {
    confirm: vi.fn(),
    requireConfirmation$: new Subject<unknown>().asObservable(),
  };

  const mockMessageService = {
    add: vi.fn(),
  };

  const mockLoadingService = {
    isLoading: signal(false),
  };

  const mockExcelService = {
    exportToExcel: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceNotes, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
        { provide: MembersViewModel, useValue: mockMembersViewModel },
        { provide: FinanceNoteCategoriesViewModel, useValue: mockFinanceNoteCategoriesViewModel },
        { provide: AuthenticationViewModel, useValue: mockAuthenticationViewModel },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: ExcelService, useValue: mockExcelService },
        { provide: MessageService, useValue: {} },
        { provide: ConfirmationService, useValue: {} },
        DatePipe,
      ],
    }).overrideComponent(FinanceNotes, {
      set: {
        providers: [
          { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
          { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
          { provide: MembersViewModel, useValue: mockMembersViewModel },
          { provide: FinanceNoteCategoriesViewModel, useValue: mockFinanceNoteCategoriesViewModel },
          { provide: AuthenticationViewModel, useValue: mockAuthenticationViewModel },
          { provide: LoadingService, useValue: mockLoadingService },
          { provide: ExcelService, useValue: mockExcelService },
          { provide: MessageService, useValue: mockMessageService },
          { provide: ConfirmationService, useValue: mockConfirmationService },
          DatePipe,
        ]
      }
    }).overrideComponent(AuditValidationWarnings, {
      set: {
        providers: [
          { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
          { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initialization methods on ngOnInit', () => {
    expect(mockMembersViewModel.findAll).toHaveBeenCalled();
    expect(mockFinanceNoteCategoriesViewModel.findAll).toHaveBeenCalled();
  });

  it('should handle month and year change', () => {
    const event = { value: '04/2026' };
    component.onMonthAndYearChange(event);
    
    expect(mockFinanceReportsViewModel.setSelectedMonthAndYear).toHaveBeenCalledWith('04/2026');
    expect(mockFinanceNotesViewModel.getAllFinanceNotesDataHandler).toHaveBeenCalled();
  });

  it('should call getAllFinanceNotesByCategory when category filter changes', async () => {
    const event = { value: 'cat-1' };
    await component.onCategoryFilterChange(event);
    expect(mockFinanceNotesViewModel.getAllFinanceNotesByCategory).toHaveBeenCalledWith('cat-1');
  });

  it('should toggle note check if month is not closed', async () => {
    const note = createFinanceNote();
    mockFinanceReportsViewModel.isSelectedMonthClosed.set(false);
    mockFinanceNotesViewModel.updateFinanceNoteCheck.mockResolvedValue({ error: null });
    
    await component.checkNoteHandler(note);
    expect(mockFinanceNotesViewModel.updateFinanceNoteCheck).toHaveBeenCalled();
  });

  it('should open the add dialog', () => {
    component.openAddFinanceNote();
    expect(component.mode()).toBe('add');
    expect(component.actionDialog).toBe(true);
  });
});
