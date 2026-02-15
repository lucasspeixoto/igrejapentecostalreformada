/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Injectable } from '@angular/core';
import type { PostgrestError } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { FinanceInvestmentsRepository } from '../../../data/repositories/finance-investments/finance-investments-repository';
import { LoadingService } from '../../../data/services/shared/loading/loading';
import type { FinanceInvestment, FinanceInvestmentAddParameters } from '../../../domain/models/finance-investment.model';

@Injectable()
export class FinanceInvestmentsViewModel {
  private financeInvestmentsRepository = inject(FinanceInvestmentsRepository);

  private messageService = inject(MessageService);

  private loadingService = inject(LoadingService);

  public financeInvestments = this.financeInvestmentsRepository.financeInvestments;

  public async createInvestment(financeInvestment: FinanceInvestment): Promise<{ error: PostgrestError | null }> {
    const newFinanceInvestment = {
      p_value: financeInvestment.value,
      p_reason: financeInvestment.reason,
      p_account_bank: financeInvestment.account_bank,
    } as FinanceInvestmentAddParameters;
    return await this.financeInvestmentsRepository.createInvestment(newFinanceInvestment);
  }

  public async updateInvestment(financeInvestment: FinanceInvestment): Promise<{ error: PostgrestError | null }> {
    const updatedFinanceInvestment = {
      id: financeInvestment.id,
      value: financeInvestment.value,
      reason: financeInvestment.reason,
      account_bank: financeInvestment.account_bank,
      updated_at: new Date().toISOString(),
    };
    return await this.financeInvestmentsRepository.updateInvestment(updatedFinanceInvestment);
  }

  public async creatOrEditInvestment(
    mode: 'add' | 'edit',
    investmentValue: FinanceInvestment,
    maxValueAvailable: number
  ): Promise<{ error: PostgrestError | null }> {
    let error: PostgrestError | null = null;

    const value = investmentValue.value;

    if (Number(value) > maxValueAvailable && mode === 'add') {
      this.messageService.add({
        severity: 'info',
        summary: 'Valor indisponível',
        detail: `O Valor solicitado está acima do máximo disponível R$ ${maxValueAvailable.toFixed(2)}!`,
      });

      this.loadingService.isLoading.set(false);
      return { error };
    }

    if (mode === 'add') {
      const { error: createFinanceInvestmentError } = await this.createInvestment(investmentValue);
      if (createFinanceInvestmentError) error = createFinanceInvestmentError;
    } else if (mode === 'edit') {
      const { error: updateFinanceInvestmentError } = await this.updateInvestment(investmentValue);
      if (updateFinanceInvestmentError) error = updateFinanceInvestmentError;
    }

    return { error };
  }

  public async findAll(): Promise<void> {
    this.loadingService.isLoading.set(true);
    await this.financeInvestmentsRepository.findAll();
    this.loadingService.isLoading.set(false);
  }
}
