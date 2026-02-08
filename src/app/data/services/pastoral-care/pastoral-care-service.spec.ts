/* eslint-disable @typescript-eslint/naming-convention */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PastoralCareService } from './pastoral-care-service';
import { SupabaseService } from '../shared/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

describe('PastoralCareService', () => {
  let service: PastoralCareService;
  const mockFrom = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockSupabaseClient = {
      from: mockFrom,
    } as Partial<SupabaseClient>;

    TestBed.configureTestingModule({
      providers: [
        PastoralCareService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): Partial<SupabaseClient> => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(PastoralCareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findAll should query pastoral_care ordered by date descending', async () => {
    const mockResponse = { data: [], error: null };

    const order = vi.fn().mockResolvedValue(mockResponse);
    const select = vi.fn().mockReturnValue({ order });
    mockFrom.mockReturnValue({ select });

    const result = await service.findAll();

    expect(mockFrom).toHaveBeenCalledWith('pastoral_care');
    expect(select).toHaveBeenCalledWith('*, members(name), pastoral_care_types(name)');
    expect(order).toHaveBeenCalledWith('date', { ascending: false });
    expect(result).toBe(mockResponse);
  });

  it('insert should insert pastoralCare into pastoral_care table', async () => {
    const pastoralCare = {
      id: "1",
      created_at: '2025-02-08',
      type_id: 1,
      date: '2025-02-08',
      member_id: 2,
      pastor: 'Pastor',
      description: 'Sem descrição',
      members: { name: "Fulano" },
      pastoral_care_types: { name: "Atendimento" },
    };
    const mockResponse = { data: null, error: null };

    const insert = vi.fn().mockResolvedValue(mockResponse);
    mockFrom.mockReturnValue({ insert });

    const result = await service.insert(pastoralCare);

    expect(mockFrom).toHaveBeenCalledWith('pastoral_care');
    expect(insert).toHaveBeenCalledWith([pastoralCare]);
    expect(result).toBe(mockResponse);
  });

  it('update should update pastoralCare in pastoral_care table by id', async () => {
    const pastoralCare = {
      id: 'abc',
      date: '2025-01-01',
      created_at: '2025-02-08',
      type_id: 1,
      member_id: 2,
      pastor: 'Pastor',
      description: 'Sem descrição',
      members: { name: "Fulano" },
      pastoral_care_types: { name: "Atendimento" },

    };
    const id = 'abc';
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const update = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ update });

    const result = await service.update(pastoralCare, id);

    expect(mockFrom).toHaveBeenCalledWith('pastoral_care');
    expect(update).toHaveBeenCalledWith([pastoralCare]);
    expect(eq).toHaveBeenCalledWith('id', id);
    expect(result).toBe(mockResponse);
  });

  it('deletePastoralCare should delete from pastoral_care table by id', async () => {
    const id = 'xyz';
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const del = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ delete: del });

    const result = await service.deletePastoralCare(id);

    expect(mockFrom).toHaveBeenCalledWith('pastoral_care');
    expect(del).toHaveBeenCalled();
    expect(eq).toHaveBeenCalledWith('id', id);
    expect(result).toBe(mockResponse);
  });

  it('deletePastoralCares should delete from pastoral_care table by ids array', async () => {
    const ids = ['a', 'b', 'c'];
    const mockResponse = { data: null, error: null };

    const inFn = vi.fn().mockResolvedValue(mockResponse);
    const del = vi.fn().mockReturnValue({ in: inFn });
    mockFrom.mockReturnValue({ delete: del });

    const result = await service.deletePastoralCares(ids);

    expect(mockFrom).toHaveBeenCalledWith('pastoral_care');
    expect(del).toHaveBeenCalled();
    expect(inFn).toHaveBeenCalledWith('id', [...ids]);
    expect(result).toBe(mockResponse);
  });
});
