/* eslint-disable @typescript-eslint/naming-convention */
import { TestBed } from '@angular/core/testing';
import type { SupabaseClient } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SupabaseService } from '../shared/supabase';
import { FinanceChartsService } from './finance-charts-service';

describe('FinanceChartsService', () => {
  let service: FinanceChartsService;
  const mockRpc = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    const mockSupabaseClient = {
      rpc: mockRpc,
    } as Partial<SupabaseClient>;

    TestBed.configureTestingModule({
      providers: [
        FinanceChartsService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): Partial<SupabaseClient> => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(FinanceChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMonthlyTotals should call supabase.rpc with correct params', async () => {
    const mockResponse = { data: [], error: null };
    mockRpc.mockResolvedValue(mockResponse);
    const result = await service.getMonthlyTotals(2024, 'A');
    expect(mockRpc).toHaveBeenCalledWith('get_monthly_totals', { target_year: 2024, target_type: 'A' });
    expect(result).toBe(mockResponse);
  });
});
