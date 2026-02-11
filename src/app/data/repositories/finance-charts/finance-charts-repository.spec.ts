import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { IGetMonthlyTotalsResponse } from '../../../domain/models/finance-reports.model';
import { FinanceChartsService } from '../../services/finance-charts/finance-charts-service';
import { FinanceChartsRepository } from './finance-charts-repository';

describe('FinanceChartsRepository', () => {
  let repo: FinanceChartsRepository;

  const getMonthlyTotals = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        FinanceChartsRepository,
        {
          provide: FinanceChartsService,
          useValue: {
            getMonthlyTotals,
          },
        },
      ],
    });
    repo = TestBed.inject(FinanceChartsRepository);
  });

  it('should call getMonthlyTotals and return response', async () => {
    const mockResponse: IGetMonthlyTotalsResponse = { data: [], error: null };
    getMonthlyTotals.mockResolvedValue(mockResponse);
    const result = await repo.getMonthlyTotals(2024, 'A');
    expect(getMonthlyTotals).toHaveBeenCalledWith(2024, 'A');
    expect(result).toEqual(mockResponse);
  });
});
