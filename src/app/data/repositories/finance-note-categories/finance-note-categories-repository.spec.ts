import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FinanceNoteCategoriesRepository } from './finance-note-categories-repository';
import { FinanceNoteCategoriesService } from '../../services/finance-note-categories/finance-note-categories-service';

describe('FinanceNoteCategoriesRepository', () => {
  let repo: FinanceNoteCategoriesRepository;

  const findAll = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        FinanceNoteCategoriesRepository,
        {
          provide: FinanceNoteCategoriesService,
          useValue: {
            findAll,
          },
        },
      ],
    });

    repo = TestBed.inject(FinanceNoteCategoriesRepository);
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('findAll should set financeNoteTypes when no error', async () => {
    const data = [
      { id: '1', name: 'Category A' },
      { id: '2', name: 'Category B' },
    ] ;

    findAll.mockResolvedValue({ data, error: null } );

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.financeNoteTypes()).toEqual(data);
    expect(result).toEqual({ data, error: null });
  });

  it('findAll should clear financeNoteTypes when error', async () => {
    findAll.mockResolvedValue({ data: null, error: { message: 'error' } } );

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.financeNoteTypes()).toEqual([]);
    expect(result.error).toBeTruthy();
  });
});

