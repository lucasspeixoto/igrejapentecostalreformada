import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PastoralCareRepository } from './pastoral-care-repository';
import { PastoralCareService } from '../../services/pastoral-care/pastoral-care-service';
import type { PastoralCare } from '../../../domain/models/pastoral-care.model';

describe('PastoralCareRepository', () => {
  let repo: PastoralCareRepository;

  const findAll = vi.fn();
  const insert = vi.fn();
  const update = vi.fn();
  const deletePastoralCare = vi.fn();
  const deletePastoralCares = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        PastoralCareRepository,
        {
          provide: PastoralCareService,
          useValue: {
            findAll,
            insert,
            update,
            deletePastoralCare,
            deletePastoralCares,
          },
        },
      ],
    });

    repo = TestBed.inject(PastoralCareRepository);
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('findAll should set pastoralCare when no error', async () => {
    const data = [{ id: '1' }, { id: '2' }];
    findAll.mockResolvedValue({ data, error: null });

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.pastoralCare()).toEqual(data);
    expect(repo.totalOfPastoralCare()).toBe(2);
    expect(result).toEqual({ data, error: null });
  });

  it('findAll should clear pastoralCare when error', async () => {
    findAll.mockResolvedValue({ data: null, error: { message: 'x' } });

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.pastoralCare()).toEqual([]);
    expect(repo.totalOfPastoralCare()).toBe(0);
    expect(result.error).toBeTruthy();
  });

  it('insert should delegate and return { data, error }', async () => {
    const payload = { date: '2025-01-01' };
    insert.mockResolvedValue({ data: null, error: null });

    const result = await repo.insert(payload);

    expect(insert).toHaveBeenCalledWith(payload);
    expect(result).toEqual({ data: null, error: null });
  });

  it('update should delegate and return { data, error }', async () => {
    const payload = { id: '1' } as PastoralCare;
    update.mockResolvedValue({ data: null, error: null });

    const result = await repo.update(payload, '1');

    expect(update).toHaveBeenCalledWith(payload, '1');
    expect(result).toEqual({ data: null, error: null });
  });

  it('deletePastoralCare should delegate and return { error }', async () => {
    deletePastoralCare.mockResolvedValue({ data: null, error: null });

    const result = await repo.deletePastoralCare('1');

    expect(deletePastoralCare).toHaveBeenCalledWith('1');
    expect(result).toEqual({ error: null });
  });

  it('deletePastoralCares should delegate and return { error }', async () => {
    deletePastoralCares.mockResolvedValue({ data: null, error: null });

    const result = await repo.deletePastoralCares(['1', '2']);

    expect(deletePastoralCares).toHaveBeenCalledWith(['1', '2']);
    expect(result).toEqual({ error: null });
  });
});

