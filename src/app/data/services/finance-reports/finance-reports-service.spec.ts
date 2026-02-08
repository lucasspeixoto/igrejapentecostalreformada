import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FinanceReportsService } from './finance-reports-service';
import { SupabaseService } from '../shared/supabase';
import type { FinanceReports } from '../../../domain/models/finance-reports.model';

describe('FinanceReportsService', () => {
  let service: FinanceReportsService;
  const mockFrom = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockSupabaseClient = {
      from: mockFrom,
    };

    TestBed.configureTestingModule({
      providers: [
        FinanceReportsService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): unknown => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(FinanceReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should insert financeReport into finance_reports table and return single row', async () => {
    const financeReport = { id: 'fr-1', balance: 100 } as FinanceReports;
    const mockResponse = { data: financeReport, error: null };

    const single = vi.fn().mockResolvedValue(mockResponse);
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    mockFrom.mockReturnValue({ insert });

    const result = await service.create(financeReport);

    expect(mockFrom).toHaveBeenCalledWith('finance_reports');
    expect(insert).toHaveBeenCalledWith([financeReport]);
    expect(select).toHaveBeenCalled();
    expect(single).toHaveBeenCalled();
    expect(result).toBe(mockResponse);
  });

  it('update should update financeReport in finance_reports table by id', async () => {
    const financeReport = { id: 'fr-1', balance: 200 } as FinanceReports;
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const update = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ update });

    const result = await service.update(financeReport);

    expect(mockFrom).toHaveBeenCalledWith('finance_reports');
    expect(update).toHaveBeenCalledWith([financeReport]);
    expect(eq).toHaveBeenCalledWith('id', financeReport.id);
    expect(result).toBe(mockResponse);
  });

  it('delete should delete financeReport from finance_reports table by id', async () => {
    const id = 'fr-1';
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const del = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ delete: del });

    const result = await service.delete(id);

    expect(mockFrom).toHaveBeenCalledWith('finance_reports');
    expect(del).toHaveBeenCalled();
    expect(eq).toHaveBeenCalledWith('id', id);
    expect(result).toBe(mockResponse);
  });
});

