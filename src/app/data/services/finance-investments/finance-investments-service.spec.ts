/* eslint-disable @typescript-eslint/naming-convention */
import { TestBed } from '@angular/core/testing';
import type { SupabaseClient } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SupabaseService } from '../shared/supabase';
import { FinanceInvestmentsService } from './finance-investments-service';

describe('FinanceInvestmentsService', () => {
  let service: FinanceInvestmentsService;
  const mockFrom = vi.fn();
  const mockRpc = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    const mockSupabaseClient = {
      from: mockFrom,
      rpc: mockRpc,
    } as Partial<SupabaseClient>;

    TestBed.configureTestingModule({
      providers: [
        FinanceInvestmentsService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): Partial<SupabaseClient> => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(FinanceInvestmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findAll should call supabase.from and select with order', async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockResolvedValue({ data: [], error: null });
    mockFrom.mockReturnValue({ select: mockSelect, order: mockOrder });
    const result = await service.findAll();
    expect(mockFrom).toHaveBeenCalledWith('finance_investments');
    expect(mockSelect).toHaveBeenCalledWith('*, users(full_name)');
    expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false });
    expect(result).toEqual({ data: [], error: null });
  });

  it('createInvestment should call supabase.rpc with correct params', async () => {
    const params = {
      p_value: 100,
      p_reason: 'Teste',
      p_account_bank: 'Banco Teste',
      p_user_id: 'user-1',
    };
    const mockResponse = { data: {}, error: null };
    mockRpc.mockResolvedValue(mockResponse);
    const result = await service.createInvestment(params);
    expect(mockRpc).toHaveBeenCalledWith('insert_investment_and_update_report', params);
    expect(result).toBe(mockResponse);
  });
});
