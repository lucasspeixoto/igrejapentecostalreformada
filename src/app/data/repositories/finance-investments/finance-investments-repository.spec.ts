/* eslint-disable @typescript-eslint/naming-convention */
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FinanceInvestmentsService } from '../../services/finance-investments/finance-investments-service';
import { FinanceInvestmentsRepository } from './finance-investments-repository';

describe('FinanceInvestmentsRepository', () => {
  let repo: FinanceInvestmentsRepository;
  const findAll = vi.fn();
  const createInvestment = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        FinanceInvestmentsRepository,
        {
          provide: FinanceInvestmentsService,
          useValue: {
            findAll,
            createInvestment,
          },
        },
      ],
    });
    repo = TestBed.inject(FinanceInvestmentsRepository);
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('findAll should set and return investments', async () => {
    const mockData = [{ id: '1', value: 100 }];
    findAll.mockResolvedValue({ data: mockData, error: null });
    const result = await repo.findAll();
    expect(result).toEqual({ data: mockData, error: null });
    expect(repo.financeInvestments().length).toBe(1);
    expect(repo.financeInvestments()[0].id).toBe('1');
  });

  it('findAll should set empty array on error', async () => {
    findAll.mockResolvedValue({ data: null, error: 'error' });
    const result = await repo.findAll();
    expect(result).toEqual({ data: null, error: 'error' });
    expect(repo.financeInvestments().length).toBe(0);
  });

  it('createInvestment should call service and return response', async () => {
    const params = {
      p_value: 100,
      p_reason: 'Teste',
      p_account_bank: 'Banco Teste',
      p_user_id: 'user-1',
    };
    const mockResponse = { data: {}, error: null };
    createInvestment.mockResolvedValue(mockResponse);
    const result = await repo.createInvestment(params);
    expect(createInvestment).toHaveBeenCalledWith(params);
    expect(result.data).toBe(mockResponse.data);
    expect(result.error).toBe(mockResponse.error);
  });
});
