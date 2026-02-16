import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FixedAsset } from '../../../domain/models/fixed-assets.model';
import { FixedAssetsService } from '../../services/fixed-assets/fixed-assets-service';
import { FixedAssetsRepository } from './fixed-assets-repository';

describe('FixedAssetsRepository', () => {
  let repo: FixedAssetsRepository;

  const findAll = vi.fn();
  const saveFixedAsset = vi.fn();
  const updateFixedAsset = vi.fn();
  const deleteFixedAsset = vi.fn();
  const deleteFixedAssets = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        FixedAssetsRepository,
        {
          provide: FixedAssetsService,
          useValue: {
            findAll,
            saveFixedAsset,
            updateFixedAsset,
            deleteFixedAsset,
            deleteFixedAssets,
          },
        },
      ],
    });

    repo = TestBed.inject(FixedAssetsRepository);
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('findAll should set fixedAssets when no error', async () => {
    const data = [
      { id: 1, local: 'Sede', type: 'Equipamento', asset: 'Computador' },
      { id: 2, local: 'Sede', type: 'Móvel', asset: 'Mesa' },
    ];
    findAll.mockResolvedValue({ data, error: null });

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.fixedAssets()).toEqual(data);
    expect(repo.totalOfFixedAssets()).toBe(2);
    expect(result).toEqual({ data, error: null });
  });

  it('findAll should clear fixedAssets when error', async () => {
    findAll.mockResolvedValue({ data: null, error: { message: 'x' } });

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.fixedAssets()).toEqual([]);
    expect(repo.totalOfFixedAssets()).toBe(0);
    expect(result.error).toBeTruthy();
  });

  it('saveFixedAsset should delegate and return { data, error }', async () => {
    const fixedAsset = { local: 'Sede', type: 'Equipamento', asset: 'Computador' };
    saveFixedAsset.mockResolvedValue({ data: null, error: null });

    const result = await repo.saveFixedAsset(fixedAsset);

    expect(saveFixedAsset).toHaveBeenCalledWith(fixedAsset);
    expect(result).toEqual({ data: null, error: null });
  });

  it('updateFixedAsset should delegate and return { data, error }', async () => {
    const fixedAsset = { id: 1, local: 'Sede', type: 'Equipamento', asset: 'Computador' } as FixedAsset;
    updateFixedAsset.mockResolvedValue({ data: null, error: null });

    const result = await repo.updateFixedAsset(fixedAsset, 1);

    expect(updateFixedAsset).toHaveBeenCalledWith(fixedAsset, 1);
    expect(result).toEqual({ data: null, error: null });
  });

  it('deleteFixedAsset should delegate and return { error }', async () => {
    deleteFixedAsset.mockResolvedValue({ data: null, error: null });

    const result = await repo.deleteFixedAsset(123);

    expect(deleteFixedAsset).toHaveBeenCalledWith(123);
    expect(result).toEqual({ error: null });
  });

  it('deleteFixedAssets should delegate and return { error }', async () => {
    deleteFixedAssets.mockResolvedValue({ data: null, error: null });

    const result = await repo.deleteFixedAssets([1, 2]);

    expect(deleteFixedAssets).toHaveBeenCalledWith([1, 2]);
    expect(result).toEqual({ error: null });
  });
});
