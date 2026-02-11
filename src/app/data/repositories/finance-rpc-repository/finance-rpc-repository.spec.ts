import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  FinanceNoteAddParameters,
  FinanceNoteDeleteParameters,
  FinanceNoteEditParameters,
} from '../../../domain/models/finance-note.model';
import { FinanceRpcService } from '../../services/finance-rpc/finance-rpc-service';
import { FinanceRpcRepository } from './finance-rpc-repository';

describe('FinanceRpcRepository', () => {
  let repo: FinanceRpcRepository;

  const createFinanceNote = vi.fn();
  const editFinanceNote = vi.fn();
  const deleteFinanceNote = vi.fn();
  const closeCurrentMonth = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        FinanceRpcRepository,
        {
          provide: FinanceRpcService,
          useValue: {
            createFinanceNote,
            editFinanceNote,
            deleteFinanceNote,
            closeCurrentMonth,
          },
        },
      ],
    });
    repo = TestBed.inject(FinanceRpcRepository);
  });

  it('should call createFinanceNote and return error', async () => {
    createFinanceNote.mockResolvedValue({ data: null, error: null });
    const params = {} as FinanceNoteAddParameters;
    const result = await repo.createFinanceNote(params);
    expect(createFinanceNote).toHaveBeenCalledWith(params);
    expect(result).toEqual({ error: null });
  });

  it('should call editFinanceNote and return error', async () => {
    editFinanceNote.mockResolvedValue({ data: null, error: null });
    const params = {} as FinanceNoteEditParameters;
    const result = await repo.editFinanceNote(params);
    expect(editFinanceNote).toHaveBeenCalledWith(params);
    expect(result).toEqual({ error: null });
  });

  it('should call deleteFinanceNote and return error', async () => {
    deleteFinanceNote.mockResolvedValue({ data: null, error: null });
    const params = {} as FinanceNoteDeleteParameters;
    const result = await repo.deleteFinanceNote(params);
    expect(deleteFinanceNote).toHaveBeenCalledWith(params);
    expect(result).toEqual({ error: null });
  });

  it('should call closeCurrentMonth and return error', async () => {
    closeCurrentMonth.mockResolvedValue({ data: null, error: null });
    const result = await repo.closeCurrentMonth();
    expect(closeCurrentMonth).toHaveBeenCalled();
    expect(result).toEqual({ error: null });
  });
});
