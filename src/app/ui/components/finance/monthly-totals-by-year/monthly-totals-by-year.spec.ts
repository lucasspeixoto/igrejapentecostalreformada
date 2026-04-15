import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthlyTotalsByYear } from './monthly-totals-by-year';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LoadingService } from '../../../../data/services/shared/loading/loading';
import { MonthlyTotalsByYearViewModel } from '../../../view-models/finance-charts/monthly-totals-by-year.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { signal } from '@angular/core';

if (typeof window !== 'undefined') {
  class MockResizeObserver {
    public observe(): void {
      return;
    }

    public unobserve(): void {
      return;
    }

    public disconnect(): void {
      return;
    }
  }
  window.ResizeObserver = window.ResizeObserver || MockResizeObserver;
}

describe('MonthlyTotalsByYear', () => {
  let component: MonthlyTotalsByYear;
  let fixture: ComponentFixture<MonthlyTotalsByYear>;

  const mockLoadingService = {
    isLoading: signal(false),
  };

  const mockFinanceReportsViewModel = {
    selectedYear: signal(2025),
  };

  const mockMonthlyTotalsByYearViewModel = {
    getMonthlyTotalCategories: vi.fn().mockReturnValue(signal([{ category: 'A', total: 100 }])),
    getMonthlyCategories: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyTotalsByYear],
      providers: [
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
        { provide: MonthlyTotalsByYearViewModel, useValue: mockMonthlyTotalsByYearViewModel },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyTotalsByYear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMonthlyCategories on init', () => {
    expect(mockMonthlyTotalsByYearViewModel.getMonthlyCategories).toHaveBeenCalled();
  });
});
