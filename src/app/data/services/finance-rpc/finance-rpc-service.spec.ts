/* eslint-disable @typescript-eslint/naming-convention */
import { TestBed } from '@angular/core/testing';
import type { SupabaseClient } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FinanceNoteAddParameters, FinanceNoteEditParameters } from '../../../domain/models/finance-note.model';
import { SupabaseService } from '../shared/supabase';
import { FinanceRpcService } from './finance-rpc-service';

describe('FinanceRpcService', () => {
  let service: FinanceRpcService;
  const mockRpc = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    const mockSupabaseClient = {
      rpc: mockRpc,
    } as Partial<SupabaseClient>;

    TestBed.configureTestingModule({
      providers: [
        FinanceRpcService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): Partial<SupabaseClient> => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(FinanceRpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createFinanceNote should call supabase.rpc with correct params', async () => {
    const params = {
      p_date: '',
      p_user_id: '',
      p_description: '',
      p_category_id: '',
      p_member_id: '',
      p_type: 'C',
      p_value: 1,
    } as FinanceNoteAddParameters;
    const mockResponse = { data: {}, error: null };
    mockRpc.mockResolvedValue(mockResponse);
    const result = await service.createFinanceNote(params);
    expect(mockRpc).toHaveBeenCalledWith('add_note_and_update_report', params);
    expect(result).toBe(mockResponse);
  });

  it('editFinanceNote should call supabase.rpc with correct params', async () => {
    const params = {
      p_note_id: '231',
      p_date: '',
      p_user_id: '',
      p_description: '',
      p_category_id: '',
      p_member_id: '',
      p_type: 'C',
      p_value: 1,
    } as FinanceNoteEditParameters;
    const mockResponse = { data: {}, error: null };
    mockRpc.mockResolvedValue(mockResponse);
    const result = await service.editFinanceNote(params);
    expect(mockRpc).toHaveBeenCalledWith('edit_note_and_update_report', params);
    expect(result).toBe(mockResponse);
  });

  it('deleteFinanceNote should call supabase.rpc with correct params', async () => {
    const params = { p_note_id: '2213' };
    const mockResponse = { data: {}, error: null };
    mockRpc.mockResolvedValue(mockResponse);
    const result = await service.deleteFinanceNote(params);
    expect(mockRpc).toHaveBeenCalledWith('delete_note_and_update_report', params);
    expect(result).toBe(mockResponse);
  });

  it('closeCurrentMonth should call supabase.rpc with correct params', async () => {
    const mockResponse = { data: {}, error: null };
    mockRpc.mockResolvedValue(mockResponse);
    const result = await service.closeCurrentMonth();
    expect(mockRpc).toHaveBeenCalledWith('close_month_and_open_next');
    expect(result).toBe(mockResponse);
  });
});
