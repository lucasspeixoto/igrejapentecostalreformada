/* eslint-disable @typescript-eslint/naming-convention */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FinanceNotesRepository } from './finance-notes-repository';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes-service';
import type { FinanceNote } from '../../../domain/models/finance-note.model';

describe('FinanceNotesRepository', () => {
  let repo: FinanceNotesRepository;

  const findAllByDateRange = vi.fn();
  const findAllByDateRangeAndCategory = vi.fn();
  const create = vi.fn();
  const update = vi.fn();
  const del = vi.fn();
  const updateFinanceNoteCheck = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        FinanceNotesRepository,
        {
          provide: FinanceNotesService,
          useValue: {
            findAllByDateRange,
            findAllByDateRangeAndCategory,
            create,
            update,
            delete: del,
            updateFinanceNoteCheck,
          },
        },
      ],
    });

    repo = TestBed.inject(FinanceNotesRepository);
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('findAllByDateRange should set financeNotes when no error', async () => {
    const data = [{ id: '1' }, { id: '2' }];
    findAllByDateRange.mockResolvedValue({ data, error: null });

    const result = await repo.findAllByDateRange('2024-01-01', '2024-12-31');

    expect(findAllByDateRange).toHaveBeenCalledWith('2024-01-01', '2024-12-31');
    expect(repo.financeNotes()).toEqual(data);
    expect(repo.totalOfFinanceNotes()).toBe(2);
    expect(result).toEqual({ data, error: null });
  });

  it('findAllByDateRange should clear financeNotes when error', async () => {
    findAllByDateRange.mockResolvedValue({ data: null, error: { message: 'x' } });

    const result = await repo.findAllByDateRange('2024-01-01', '2024-12-31');

    expect(findAllByDateRange).toHaveBeenCalledWith('2024-01-01', '2024-12-31');
    expect(repo.financeNotes()).toEqual([]);
    expect(repo.totalOfFinanceNotes()).toBe(0);
    expect(result.error).toBeTruthy();
  });

  it('findAllByDateRangeAndCategory should set financeNotes when no error', async () => {
    const data = [{ id: '1' }, { id: '2' }];
    findAllByDateRangeAndCategory.mockResolvedValue({ data, error: null });

    const result = await repo.findAllByDateRangeAndCategory('2024-01-01', '2024-12-31', 'cat-1');

    expect(findAllByDateRangeAndCategory).toHaveBeenCalledWith('2024-01-01', '2024-12-31', 'cat-1');
    expect(repo.financeNotes()).toEqual(data);
    expect(repo.totalOfFinanceNotes()).toBe(2);
    expect(result).toEqual({ data, error: null });
  });

  it('findAllByDateRangeAndCategory should clear financeNotes when error', async () => {
    findAllByDateRangeAndCategory.mockResolvedValue({ data: null, error: { message: 'x' } });

    const result = await repo.findAllByDateRangeAndCategory('2024-01-01', '2024-12-31', 'cat-1');

    expect(findAllByDateRangeAndCategory).toHaveBeenCalledWith('2024-01-01', '2024-12-31', 'cat-1');
    expect(repo.financeNotes()).toEqual([]);
    expect(repo.totalOfFinanceNotes()).toBe(0);
    expect(result.error).toBeTruthy();
  });

  it('create should delegate and return { data, error }', async () => {
    const financeNote = { id: 'fn-1' } as FinanceNote;
    create.mockResolvedValue({ data: financeNote, error: null });

    const result = await repo.create(financeNote);

    expect(create).toHaveBeenCalledWith(financeNote);
    expect(result).toEqual({ data: financeNote, error: null });
  });

  it('update should delegate and return { data, error }', async () => {
    const financeNote = { id: 'fn-1', value: 100 }  as FinanceNote;
    update.mockResolvedValue({ data: null, error: null });

    const result = await repo.update(financeNote);

    expect(update).toHaveBeenCalledWith(financeNote);
    expect(result).toEqual({ data: null, error: null });
  });

  it('delete should delegate and return { error }', async () => {
    del.mockResolvedValue({ data: null, error: null });

    const result = await repo.delete('fn-1');

    expect(del).toHaveBeenCalledWith('fn-1');
    expect(result).toEqual({ error: null });
  });

  it('updateFinanceNoteCheck should delegate and return { error }', async () => {
    const financeNote = { id: 'fn-1', is_checked: true } as FinanceNote;
    updateFinanceNoteCheck.mockResolvedValue({ data: null, error: null });

    const result = await repo.updateFinanceNoteCheck(financeNote);

    expect(updateFinanceNoteCheck).toHaveBeenCalledWith(financeNote);
    expect(result).toEqual({ error: null });
  });
});

