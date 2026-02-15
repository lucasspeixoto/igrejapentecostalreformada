import { Injectable, computed, inject, signal } from '@angular/core';
import type {
  FinanceInvestment,
  FinanceInvestmentAddParameters,
  IFindAllFinanceInvestmentsByDateRangeResponse,
  IUpdateFinanceInvestmenteResponse,
} from '../../../domain/models/finance-investment.model';
import { FinanceInvestmentsService } from '../../services/finance-investments/finance-investments-service';

@Injectable({ providedIn: 'root' })
export class FinanceInvestmentsRepository {
  private financeInvestmentsService = inject(FinanceInvestmentsService);

  private _financeInvestments = signal<FinanceInvestment[]>([]);
  public financeInvestments = this._financeInvestments.asReadonly();

  public totalOfFinanceInvestments = computed(() => this._financeInvestments().length);

  public async findAll(): Promise<IFindAllFinanceInvestmentsByDateRangeResponse> {
    const { data, error } = await this.financeInvestmentsService.findAll();

    if (!error && data) {
      this._financeInvestments.set(data);
    } else {
      this._financeInvestments.set([]);
    }

    return { data: data ?? null, error };
  }

  public async createInvestment(params: FinanceInvestmentAddParameters): Promise<IUpdateFinanceInvestmenteResponse> {
    const { data, error } = await this.financeInvestmentsService.createInvestment(params);
    return { data, error };
  }

  public async updateInvestment(financeInvestment: Partial<FinanceInvestment>): Promise<IUpdateFinanceInvestmenteResponse> {
    const { data, error } = await this.financeInvestmentsService.updateInvestment(financeInvestment);
    return { data, error };
  }
}
