/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from '@angular/core';
import type { PostgrestError } from '@supabase/supabase-js';
import type {
  FinanceNoteAddParameters,
  FinanceNoteDeleteParameters,
  FinanceNoteEditParameters,
} from '../../../domain/models/finance-note.model';
import { FinanceRpcService } from '../../services/finance-rpc/finance-rpc-service';

@Injectable({
  providedIn: 'root',
})
export class FinanceRpcRepository {
  private financeRpcService = inject(FinanceRpcService);

  public async createFinanceNote(params: FinanceNoteAddParameters): Promise<{ error: PostgrestError | null }> {
    const { data, error } = await this.financeRpcService.createFinanceNote(params);

    return { error };
  }

  public async editFinanceNote(params: FinanceNoteEditParameters): Promise<{ error: PostgrestError | null }> {
    const { data, error } = await this.financeRpcService.editFinanceNote(params);

    return { error };
  }

  public async deleteFinanceNote(params: FinanceNoteDeleteParameters): Promise<{ error: PostgrestError | null }> {
    const { data, error } = await this.financeRpcService.deleteFinanceNote(params);

    return { error };
  }

  public async closeCurrentMonth(): Promise<{ error: PostgrestError | null }> {
    const { data, error } = await this.financeRpcService.closeCurrentMonth();

    return { error };
  }
}
