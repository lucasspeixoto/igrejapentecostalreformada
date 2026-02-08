import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FinanceReportsRepository } from './finance-reports-repository';
import { FinanceReportsService } from '../../services/finance-reports/finance-reports-service';
import type { FinanceReports } from '../../../domain/models/finance-reports.model';

describe('FinanceReportsRepository', () => {
  let repo: FinanceReportsRepository;

  const findAllByDateRange = vi.fn();
  const create = vi.fn();
  const update = vi.fn();
  const del = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        FinanceReportsRepository,
        {
          provide: FinanceReportsService,
          useValue: {
            findAllByDateRange,
            create,
            update,
            delete: del,
          },
        },
      ],
    });

    repo = TestBed.inject(FinanceReportsRepository);
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('create should delegate and return { data, error }', async () => {
    const financeReport = { id: 'fr-1' } as FinanceReports;
    create.mockResolvedValue({ data: financeReport, error: null });

    const result = await repo.create(financeReport);

    expect(create).toHaveBeenCalledWith(financeReport);
    expect(result).toEqual({ data: financeReport, error: null });
  });

  it('update should delegate and return { data, error }', async () => {
    const financeReport = { id: 'fr-1', balance: 100 } as FinanceReports;
    update.mockResolvedValue({ data: null, error: null });

    const result = await repo.update(financeReport);

    expect(update).toHaveBeenCalledWith(financeReport);
    expect(result).toEqual({ data: null, error: null });
  });

  it('delete should delegate and return { error }', async () => {
    del.mockResolvedValue({ data: null, error: null });

    const result = await repo.delete('fr-1');

    expect(del).toHaveBeenCalledWith('fr-1');
    expect(result).toEqual({ error: null });
  });
});

