import { inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { LoadingService } from '../../../../services/loading/loading.service';
import { FinanceNoteCategory } from '../../models/finance-category.model';

@Injectable({
  providedIn: 'root',
})
export class FinanceNoteCategoryService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public financeNoteCategory = signal<FinanceNoteCategory[]>([]);

  public async getAllFinanceCategoryDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('finance_categories')
      .select('*')
      .order('name', { ascending: true });

    if (!error) this.financeNoteCategory.set(data);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.financeNoteCategory.set([]);
      throw new Error('Erro ao carregar notas, tente novamente mais tarde!');
    }
  }
}
