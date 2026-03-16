import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinanceInvestmentsComponent } from './finance-investments';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FinanceInvestmentsViewModel } from '../../../view-models/finance-investments/finance-investments.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { LoadingService } from '../../../../data/services/shared/loading/loading';
import { signal } from '@angular/core';

describe('FinanceInvestmentsComponent', () => {
  let component: FinanceInvestmentsComponent;
  let fixture: ComponentFixture<FinanceInvestmentsComponent>;

  const mockFinanceInvestmentsViewModel = {
    findAll: vi.fn().mockResolvedValue(undefined),
    creatOrEditInvestment: vi.fn(),
    financeInvestments: signal([]),
    totalOfInvestments: signal(0),
  };

  const mockFinanceReportsViewModel = {
    findAll: vi.fn().mockResolvedValue(undefined),
    getCurrentMonthTotalBalance: vi.fn().mockReturnValue(1000),
  };

  const mockMessageService = {
    add: vi.fn(),
  };

  const mockLoadingService = {
    isLoading: signal(false),
  };

  beforeEach(async () => {
    // Need to provide canvas context for PrimeNG components
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      // mock context
    } as any);

    await TestBed.configureTestingModule({
      imports: [FinanceInvestmentsComponent, ReactiveFormsModule],
      providers: [
        { provide: FinanceInvestmentsViewModel, useValue: mockFinanceInvestmentsViewModel },
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
        { provide: MessageService, useValue: mockMessageService },
        { provide: LoadingService, useValue: mockLoadingService },
        ConfirmationService,
      ],
    }).overrideComponent(FinanceInvestmentsComponent, {
      set: {
        providers: [
          { provide: FinanceInvestmentsViewModel, useValue: mockFinanceInvestmentsViewModel },
          { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
          { provide: MessageService, useValue: mockMessageService },
          ConfirmationService,
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findAll on init', () => {
    expect(mockFinanceInvestmentsViewModel.findAll).toHaveBeenCalled();
  });

  it('should open add dialog', () => {
    component.openAddInvestment();
    expect(component.mode()).toBe('add');
    expect(component.actionDialog).toBe(true);
  });

  it('should open edit dialog with investment data', () => {
    const investment = { id: '1', value: 100, reason: 'Test', account_bank: 'Inter' } as any;
    component.openEditInvestment(investment);
    expect(component.mode()).toBe('edit');
    expect(component.investmentForm.value.id).toBe('1');
    expect(component.actionDialog).toBe(true);
  });

  it('should not call creatOrEditInvestment if form is invalid', async () => {
    component.investmentForm.get('value')?.setValue('' as any);
    await component.creatOrEditInvestment();
    expect(mockFinanceInvestmentsViewModel.creatOrEditInvestment).not.toHaveBeenCalled();
    expect(mockMessageService.add).toHaveBeenCalledWith(expect.objectContaining({ summary: 'Formulário Inválido' }));
  });

  it('should call creatOrEditInvestment and refresh data on success', async () => {
    component.investmentForm.patchValue({ value: 50, reason: 'Savings', account_bank: 'Inter' });
    mockFinanceInvestmentsViewModel.creatOrEditInvestment.mockResolvedValue({ error: null });
    
    await component.creatOrEditInvestment();
    
    expect(mockFinanceInvestmentsViewModel.creatOrEditInvestment).toHaveBeenCalled();
    expect(mockFinanceInvestmentsViewModel.findAll).toHaveBeenCalled();
  });
});
