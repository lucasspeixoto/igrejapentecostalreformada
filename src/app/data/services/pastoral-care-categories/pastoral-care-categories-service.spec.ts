import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PastoralCareCategoriesService } from './pastoral-care-categories-service';
import { SupabaseService } from '../shared/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

describe('PastoralCareCategoriesService', () => {
  let service: PastoralCareCategoriesService;
  const mockFrom = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockSupabaseClient = {
      from: mockFrom,
    } as Partial<SupabaseClient>;

    TestBed.configureTestingModule({
      providers: [
        PastoralCareCategoriesService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): Partial<SupabaseClient> => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(PastoralCareCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findAll should query pastoral_care_types ordered by name ascending', async () => {
    const mockResponse = { data: [], error: null };

    const order = vi.fn().mockResolvedValue(mockResponse);
    const select = vi.fn().mockReturnValue({ order });
    mockFrom.mockReturnValue({ select });

    const result = await service.findAll();

    expect(mockFrom).toHaveBeenCalledWith('pastoral_care_types');
    expect(select).toHaveBeenCalledWith('*');
    expect(order).toHaveBeenCalledWith('name', { ascending: true });
    expect(result).toBe(mockResponse);
  });
});
