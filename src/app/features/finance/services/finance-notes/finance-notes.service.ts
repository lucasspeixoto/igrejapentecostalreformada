import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FinanceNote, TopFinanceNoteByCategory } from '../../models/finance-note.model';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { LoadingService } from '../../../../services/loading/loading.service';
import { getActualDate, getFirstAndLastDayOfAMonth } from '../../../../utils/date';
import { PostgrestError } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class FinanceNotesService {
  private supabase = injectSupabase();

  private loadingService = inject(LoadingService);

  private messageService = inject(MessageService);

  public financeNotes = signal<FinanceNote[]>([]);

  public allFinanceNotesOfAMonth = signal(0);

  public totalOfFinanceNotes = computed(() => this.financeNotes().length);

  public async getAllFinanceNotesDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { firstDay, lastDay } = this.getFirstAndLastDayOfAMonth();

    const { data, error } = await this.supabase
      .from('finance_notes')
      .select('*, users(full_name), finance_categories(name), members(name)')
      .gte('date', firstDay)
      .lte('date', lastDay)
      .order('created_at', { ascending: false });

    if (!error) {
      this.financeNotes.set(data);
      this.allFinanceNotesOfAMonth.set(data.length);
    }

    if (error) {
      this.financeNotes.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar notas, tente novamente mais tarde!',
        life: 3000,
      });
    }

    this.loadingService.isLoading.set(false);
  }

  public async getAllFinanceNotesByCategory(categoryId: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { firstDay, lastDay } = this.getFirstAndLastDayOfAMonth();

    const { data, error } = await this.supabase
      .from('finance_notes')
      .select('*, users(full_name), finance_categories(name), members(name)')
      .eq('category_id', categoryId)
      .gte('date', firstDay)
      .lte('date', lastDay)
      .order('created_at', { ascending: false });

    if (!error) this.financeNotes.set(data);

    if (error) {
      this.financeNotes.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar notas, tente novamente mais tarde!',
        life: 3000,
      });
    }

    this.loadingService.isLoading.set(false);
  }

  public async insertFinanceNoteHandler(financeNote: FinanceNote): Promise<PostgrestError | null> {
    let insertError: PostgrestError | null = null;

    const { error } = await this.supabase.from('finance_notes').insert([financeNote]);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao inserir nota. tente novamente!',
        life: 3000,
      });

      insertError = error;
    }

    return insertError;
  }

  public async updateFinanceNoteCheckHandler(financeNote: FinanceNote): Promise<void> {
    const { error } = await this.supabase
      .from('finance_notes')
      .update({ is_checked: financeNote.is_checked })
      .eq('id', financeNote.id);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao marcar nota como verificada. tente novamente!',
        life: 3000,
      });

      throw new Error('Error editing a finance note!');
    } else {
      this.getAllFinanceNotesDataHandler();
    }
  }

  public async updateFinanceNoteHandler(financeNote: FinanceNote): Promise<PostgrestError | null> {
    let updateError: PostgrestError | null = null;

    const { error } = await this.supabase
      .from('finance_notes')
      .update([financeNote])
      .eq('id', financeNote.id);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao editar nota. tente novamente!',
        life: 3000,
      });

      updateError = error;
    }

    return updateError;
  }

  public async deleteFinanceNoteHandler(id: string): Promise<PostgrestError | null> {
    let updateError: PostgrestError | null = null;

    const { error } = await this.supabase.from('finance_notes').delete().eq('id', id);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir nota. tente novamente!',
        life: 3000,
      });

      updateError = error;
    }

    return updateError;
  }

  public async updateCurrentFinanceNotesList(): Promise<void> {
    const { firstDay, lastDay } = this.getFirstAndLastDayOfAMonth();

    const { data, error } = await this.supabase
      .from('finance_notes')
      .select('*, users(full_name), finance_categories(name), members(name)')
      .gte('date', firstDay)
      .lte('date', lastDay)
      .order('created_at', { ascending: false });

    if (!error) this.financeNotes.set(data);
  }

  public getFirstAndLastDayOfAMonth(): { firstDay: string; lastDay: string } {
    const currentActualDate = localStorage.getItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH');
    return getFirstAndLastDayOfAMonth(currentActualDate ? currentActualDate : getActualDate());
  }

  public getTop3NotesByCategories(type: 'C' | 'D'): TopFinanceNoteByCategory[] {
    // Create an object to accumulate values by category
    const categoryTotals = {} as Record<string, TopFinanceNoteByCategory>;

    let total = 0;

    const financeNotesByType = this.financeNotes().filter(item => item.type === type);

    // Process each note
    financeNotesByType.forEach(financeNote => {
      const categoryId = financeNote.category_id;
      const categoryName = financeNote.finance_categories?.name || 'Uncategorized';
      total += financeNote.value;

      if (!categoryTotals[categoryId]) {
        categoryTotals[categoryId] = {
          name: categoryName,
          total: 0,
          quantity: 0,
          percent: 0,
        };
      }

      categoryTotals[categoryId].total += financeNote.value;
      categoryTotals[categoryId].quantity += 1;
    });

    // Convert to array and sort by total (descending)
    const sortedCategories = Object.values(categoryTotals).sort((a, b) => b['total'] - a['total']);

    // Include percent
    const categoriesWithPercent = sortedCategories.map(item => {
      return {
        ...item,
        percent: +(100 * (item.total / total)).toFixed(2),
      };
    });

    // Return top 3
    return categoriesWithPercent.slice(0, 3);
  }

  public getAllDebitNotesData(): TopFinanceNoteByCategory[] {
    // Create an object to accumulate values by category
    const categoryTotals = {} as Record<string, TopFinanceNoteByCategory>;

    let total = 0;

    const financeNotesByType = this.financeNotes().filter(item => item.type === 'D');

    // Process each note
    financeNotesByType.forEach(financeNote => {
      const categoryId = financeNote.category_id;
      const categoryName = financeNote.finance_categories?.name || 'Uncategorized';
      total += financeNote.value;

      if (!categoryTotals[categoryId]) {
        categoryTotals[categoryId] = {
          name: categoryName,
          total: 0,
          quantity: 0,
          percent: 0,
        };
      }

      categoryTotals[categoryId].total += financeNote.value;
      categoryTotals[categoryId].quantity += 1;
    });

    // Convert to array and sort by total (descending)
    const sortedCategories = Object.values(categoryTotals).sort((a, b) => b['total'] - a['total']);

    // Include percent
    const categoriesWithPercent = sortedCategories.map(item => {
      return {
        ...item,
        percent: +(100 * (item.total / total)).toFixed(2),
      };
    });

    return categoriesWithPercent;
  }
}
