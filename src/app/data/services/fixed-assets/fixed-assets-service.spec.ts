import { TestBed } from '@angular/core/testing';
import type { SupabaseClient } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FixedAsset } from '../../../domain/models/fixed-assets.model';
import { SupabaseService } from '../shared/supabase';
import { FixedAssetsService } from './fixed-assets-service';

describe('FixedAssetsService', () => {
  let service: FixedAssetsService;
  const mockFrom = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockSupabaseClient = {
      from: mockFrom,
    } as Partial<SupabaseClient>;

    TestBed.configureTestingModule({
      providers: [
        FixedAssetsService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): Partial<SupabaseClient> => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(FixedAssetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findAll should query fixed_assets ordered by created_at descending', async () => {
    const mockResponse = { data: [], error: null };

    const order = vi.fn().mockResolvedValue(mockResponse);
    const select = vi.fn().mockReturnValue({ order });
    mockFrom.mockReturnValue({ select });

    const result = await service.findAll();

    expect(mockFrom).toHaveBeenCalledWith('fixed_assets');
    expect(select).toHaveBeenCalledWith('*, users(full_name)');
    expect(order).toHaveBeenCalledWith('created_at', { ascending: false });
    expect(result).toBe(mockResponse);
  });

  it('saveFixedAsset should insert fixedAsset into fixed_assets table', async () => {
    const fixedAsset = { local: 'Sede', type: 'Equipamento', asset: 'Computador' } as FixedAsset;
    const mockResponse = { data: null, error: null };

    const insert = vi.fn().mockResolvedValue(mockResponse);
    mockFrom.mockReturnValue({ insert });

    const result = await service.saveFixedAsset(fixedAsset);

    expect(mockFrom).toHaveBeenCalledWith('fixed_assets');
    expect(insert).toHaveBeenCalledWith([fixedAsset]);
    expect(result).toBe(mockResponse);
  });

  it('updateFixedAsset should update fixedAsset in fixed_assets table by id', async () => {
    const fixedAsset = { id: 1, local: 'Sede', type: 'Equipamento', asset: 'Computador' } as FixedAsset;
    const assetId = 1;
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const update = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ update });

    const result = await service.updateFixedAsset(fixedAsset, assetId);

    expect(mockFrom).toHaveBeenCalledWith('fixed_assets');
    expect(update).toHaveBeenCalled();
    expect(eq).toHaveBeenCalledWith('id', assetId);
    expect(result).toBe(mockResponse);
  });

  it('deleteFixedAsset should delete fixedAsset from fixed_assets table by id', async () => {
    const assetId = 1;
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const del = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ delete: del });

    const result = await service.deleteFixedAsset(assetId);

    expect(mockFrom).toHaveBeenCalledWith('fixed_assets');
    expect(del).toHaveBeenCalled();
    expect(eq).toHaveBeenCalledWith('id', assetId);
    expect(result).toBe(mockResponse);
  });

  it('deleteFixedAssets should delete fixedAssets from fixed_assets table by ids array', async () => {
    const assetIds = [1, 2, 3];
    const mockResponse = { data: null, error: null };

    const inFn = vi.fn().mockResolvedValue(mockResponse);
    const del = vi.fn().mockReturnValue({ in: inFn });
    mockFrom.mockReturnValue({ delete: del });

    const result = await service.deleteFixedAssets(assetIds);

    expect(mockFrom).toHaveBeenCalledWith('fixed_assets');
    expect(del).toHaveBeenCalled();
    expect(inFn).toHaveBeenCalledWith('id', [...assetIds]);
    expect(result).toBe(mockResponse);
  });
});
