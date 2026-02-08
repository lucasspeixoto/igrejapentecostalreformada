import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FinanceNoteCategoriesService } from './finance-note-categories-service';
import { SupabaseService } from '../shared/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

describe('FinanceNoteCategoriesService', () => {
  let service: FinanceNoteCategoriesService;
  const mockFrom = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockSupabaseClient = {
      from: mockFrom,
    } as Partial<SupabaseClient>;

    TestBed.configureTestingModule({
      providers: [
        FinanceNoteCategoriesService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): Partial<SupabaseClient> => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(FinanceNoteCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findAll should query finance_categories ordered by name ascending', async () => {
    const mockResponse = { data: [], error: null };

    const order = vi.fn().mockResolvedValue(mockResponse);
    const select = vi.fn().mockReturnValue({ order });
    mockFrom.mockReturnValue({ select });

    const result = await service.findAll();

    expect(mockFrom).toHaveBeenCalledWith('finance_categories');
    expect(select).toHaveBeenCalledWith('*');
    expect(order).toHaveBeenCalledWith('name', { ascending: true });
    expect(result).toBe(mockResponse);
  });
});

