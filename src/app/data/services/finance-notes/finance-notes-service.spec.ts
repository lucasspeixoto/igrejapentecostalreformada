/* eslint-disable @typescript-eslint/naming-convention */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FinanceNotesService } from './finance-notes-service';
import { SupabaseService } from '../shared/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { FinanceNote } from '../../../domain/models/finance-note.model';

describe('FinanceNotesService', () => {
  let service: FinanceNotesService;
  const mockFrom = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockSupabaseClient = {
      from: mockFrom,
    } as Partial<SupabaseClient>;

    TestBed.configureTestingModule({
      providers: [
        FinanceNotesService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): Partial<SupabaseClient> => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(FinanceNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findAllByDateRange should query finance_notes with filters and ordering', async () => {
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';
    const mockResponse = { data: [], error: null };

    const order = vi.fn().mockResolvedValue(mockResponse);
    const lte = vi.fn().mockReturnValue({ order });
    const gte = vi.fn().mockReturnValue({ lte });
    const select = vi.fn().mockReturnValue({ gte });
    mockFrom.mockReturnValue({ select });

    const result = await service.findAllByDateRange(startDate, endDate);

    expect(mockFrom).toHaveBeenCalledWith('finance_notes');
    expect(select).toHaveBeenCalledWith('*, users(full_name), finance_categories(name), members(name)');
    expect(gte).toHaveBeenCalledWith('date', startDate);
    expect(lte).toHaveBeenCalledWith('date', endDate);
    expect(order).toHaveBeenCalledWith('created_at', { ascending: false });
    expect(result).toBe(mockResponse);
  });

  it('findAllByDateRangeAndCategory should query finance_notes with category, date filters and ordering', async () => {
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';
    const categoryId = 'cat-1';
    const mockResponse = { data: [], error: null };

    const order = vi.fn().mockResolvedValue(mockResponse);
    const lte = vi.fn().mockReturnValue({ order });
    const gte = vi.fn().mockReturnValue({ lte });
    const eq = vi.fn().mockReturnValue({ gte });
    const select = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ select });

    const result = await service.findAllByDateRangeAndCategory(startDate, endDate, categoryId);

    expect(mockFrom).toHaveBeenCalledWith('finance_notes');
    expect(select).toHaveBeenCalledWith('*, users(full_name), finance_categories(name), members(name)');
    expect(eq).toHaveBeenCalledWith('category_id', categoryId);
    expect(gte).toHaveBeenCalledWith('date', startDate);
    expect(lte).toHaveBeenCalledWith('date', endDate);
    expect(order).toHaveBeenCalledWith('created_at', { ascending: false });
    expect(result).toBe(mockResponse);
  });

  it('create should insert financeNote into finance_notes table and return single row', async () => {
    const financeNote = { id: 'fn-1', value: 100 } as FinanceNote;
    const mockResponse = { data: financeNote, error: null };

    const single = vi.fn().mockResolvedValue(mockResponse);
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    mockFrom.mockReturnValue({ insert });

    const result = await service.create(financeNote);

    expect(mockFrom).toHaveBeenCalledWith('finance_notes');
    expect(insert).toHaveBeenCalledWith([financeNote]);
    expect(select).toHaveBeenCalled();
    expect(single).toHaveBeenCalled();
    expect(result).toBe(mockResponse);
  });

  it('update should update financeNote in finance_notes table by id', async () => {
    const financeNote = { id: 'fn-1', value: 200 } as FinanceNote;
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const update = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ update });

    const result = await service.update(financeNote);

    expect(mockFrom).toHaveBeenCalledWith('finance_notes');
    expect(update).toHaveBeenCalledWith([financeNote]);
    expect(eq).toHaveBeenCalledWith('id', financeNote.id);
    expect(result).toBe(mockResponse);
  });

  it('delete should delete financeNote from finance_notes table by id', async () => {
    const id = 'fn-1';
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const del = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ delete: del });

    const result = await service.delete(id);

    expect(mockFrom).toHaveBeenCalledWith('finance_notes');
    expect(del).toHaveBeenCalled();
    expect(eq).toHaveBeenCalledWith('id', id);
    expect(result).toBe(mockResponse);
  });

  it('updateFinanceNoteCheck should update is_checked field in finance_notes table by id', async () => {
    const financeNote = { id: 'fn-1', is_checked: true } as FinanceNote;
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const update = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ update });

    const result = await service.updateFinanceNoteCheck(financeNote);

    expect(mockFrom).toHaveBeenCalledWith('finance_notes');
    expect(update).toHaveBeenCalledWith({ is_checked: financeNote.is_checked });
    expect(eq).toHaveBeenCalledWith('id', financeNote.id);
    expect(result).toBe(mockResponse);
  });
});

