import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PastoralCareCategoriesRepository } from './pastoral-care-categories-repository';
import { PastoralCareCategoriesService } from '../../services/pastoral-care-categories/pastoral-care-categories-service';

describe('PastoralCareCategoriesRepository', () => {
  let repo: PastoralCareCategoriesRepository;

  const findAll = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        PastoralCareCategoriesRepository,
        {
          provide: PastoralCareCategoriesService,
          useValue: {
            findAll,
          },
        },
      ],
    });

    repo = TestBed.inject(PastoralCareCategoriesRepository);
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('findAll should set pastoralCareTypes when no error', async () => {
    const data = [{ id: '1', name: 'A' }, { id: '2', name: 'B' }];
    findAll.mockResolvedValue({ data, error: null });

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.pastoralCareTypes()).toEqual(data);
    expect(result).toEqual({ data, error: null });
  });

  it('findAll should clear pastoralCareTypes when error', async () => {
    findAll.mockResolvedValue({ data: null, error: { message: 'x' } });

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.pastoralCareTypes()).toEqual([]);
    expect(result.error).toBeTruthy();
  });
});

