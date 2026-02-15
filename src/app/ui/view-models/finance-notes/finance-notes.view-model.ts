/* eslint-disable @typescript-eslint/naming-convention */
import { computed, inject, Injectable } from '@angular/core';
import type { PostgrestError } from '@supabase/supabase-js';
import { FinanceReportsRepository } from '../../../data/repositories/finance-reports/finance-reports-repository';
import { FinanceRpcRepository } from '../../../data/repositories/finance-rpc-repository/finance-rpc-repository';
import { LoadingService } from '../../../data/services/shared/loading/loading';
import type { FinanceNoteExcel } from '../../../domain/models/finance-note-excel.model';
import type {
  FinanceNote,
  FinanceNoteAddParameters,
  FinanceNoteDeleteParameters,
  FinanceNoteEditParameters,
  IDeleteFinanceNoteResponse,
  TopFinanceNoteByCategory,
} from '../../../domain/models/finance-note.model';
import { getActualDate, getFirstAndLastDayOfAMonth } from '../../../utils/date';
import { ORGANIC_CREDIT_IDS, SEMINAR_IDS } from '../../../utils/options';
import { FinanceNotesRepository } from './../../../data/repositories/finance-notes/finance-notes-repository';
import type { FinanceNoteFormValue } from './finance-note-form';

@Injectable({ providedIn: 'root' })
export class FinanceNotesViewModel {
  private loadingService = inject(LoadingService);

  private financeNotesRepository = inject(FinanceNotesRepository);

  private financeReportsRepository = inject(FinanceReportsRepository);

  private financeRpcRepository = inject(FinanceRpcRepository);

  public totalOfFinanceNotes = this.financeNotesRepository.totalOfFinanceNotes;

  public financeNotes = this.financeNotesRepository.financeNotes;

  public numberOfNonCheckedNotes = this.financeNotesRepository.numberOfNonCheckedNotes;

  public numberOfPendingNotes = this.financeNotesRepository.numberOfPendingNotes;

  public seminarIds = SEMINAR_IDS;

  public organicCreditIds = ORGANIC_CREDIT_IDS;

  public async createFinanceNote(params: FinanceNoteAddParameters): Promise<{ error: PostgrestError | null }> {
    return await this.financeRpcRepository.createFinanceNote(params);
  }

  public async editFinanceNote(params: FinanceNoteEditParameters): Promise<{ error: PostgrestError | null }> {
    return await this.financeRpcRepository.editFinanceNote(params);
  }

  public async deleteFinanceNote(params: FinanceNoteDeleteParameters): Promise<{ error: PostgrestError | null }> {
    return await this.financeRpcRepository.deleteFinanceNote(params);
  }

  public async closeCurrentMonth(): Promise<{ error: PostgrestError | null }> {
    return await this.financeRpcRepository.closeCurrentMonth();
  }

  public getAllDebitNotesData(): TopFinanceNoteByCategory[] {
    // Create an object to accumulate values by category
    const categoryTotals = {} as Record<string, TopFinanceNoteByCategory>;

    let total = 0;

    const financeNotesByType = this.financeNotesRepository.financeNotes().filter(item => item.type === 'D');

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

  public async updateFinanceNoteCheck(financeNote: FinanceNote): Promise<IDeleteFinanceNoteResponse> {
    const updatedFinanceNote = {
      ...financeNote,
      is_checked: !financeNote.is_checked,
    };
    return await this.financeNotesRepository.updateFinanceNoteCheck(updatedFinanceNote);
  }

  public async getAllFinanceNotesDataByDateHandler(currentActualDate: string): Promise<void> {
    this.loadingService.isLoading.set(true);
    const { firstDay, lastDay } = getFirstAndLastDayOfAMonth(currentActualDate ? currentActualDate : getActualDate());
    await this.financeNotesRepository.findAllByDateRange(firstDay, lastDay);
    this.loadingService.isLoading.set(false);
  }

  public async getAllFinanceNotesDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);
    const { firstDay, lastDay } = this.getFirstAndLastDayOfAMonth();
    await this.financeNotesRepository.findAllByDateRange(firstDay, lastDay);
    this.loadingService.isLoading.set(false);
  }

  public async getAllFinanceNotesByCategory(categoryId: string): Promise<void> {
    this.loadingService.isLoading.set(true);
    const { firstDay, lastDay } = this.getFirstAndLastDayOfAMonth();
    await this.financeNotesRepository.findAllByDateRangeAndCategory(firstDay, lastDay, categoryId);
    this.loadingService.isLoading.set(false);
  }

  public getFirstAndLastDayOfAMonth(): { firstDay: string; lastDay: string } {
    const currentActualDate = localStorage.getItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH');
    return getFirstAndLastDayOfAMonth(currentActualDate ? currentActualDate : getActualDate());
  }

  public generateFinanceNotesForCSV(): FinanceNoteExcel[] {
    return this.financeNotes()
      .reverse()
      .map(item => {
        return {
          date: item.date.split('-')[2],
          description: item.description,
          member_id: item.member_id,
          category: item.finance_categories.name,
          debit: item.type === 'D' ? item.value : null,
          credit: item.type === 'C' ? item.value : null,
        } as FinanceNoteExcel;
      });
  }

  public generateFinanceNoteAddParameters(transformedMemberData: FinanceNoteFormValue, userId: string): FinanceNoteAddParameters {
    return {
      p_date: transformedMemberData.date,
      p_user_id: userId,
      p_description: transformedMemberData.description,
      p_category_id: transformedMemberData.category,
      p_member_id: transformedMemberData.member !== '' ? transformedMemberData.member : null,
      p_type: transformedMemberData.type,
      p_value: transformedMemberData.value,
    } as FinanceNoteAddParameters;
  }

  public generateFinanceNoteEditParameters(
    transformedMemberData: FinanceNoteFormValue,
    userId: string
  ): FinanceNoteEditParameters {
    return {
      p_note_id: transformedMemberData.id,
      p_date: transformedMemberData.date,
      p_user_id: userId,
      p_description: transformedMemberData.description,
      p_category_id: transformedMemberData.category,
      p_member_id: transformedMemberData.member !== '' ? transformedMemberData.member : null,
      p_type: transformedMemberData.type,
      p_value: transformedMemberData.value,
    } as FinanceNoteEditParameters;
  }

  public totalOfCampaignNotes = computed(() => {
    return this.financeNotesRepository
      .financeNotes()
      .filter(item => item.type === 'C' && item.category_id === '545faf46-4161-4d0b-9a98-026dde981be6')
      .map(item => item.value)
      .reduce((acc, curr) => acc + curr, 0);
  });

  public totalOfSeminarNotes = computed(() => {
    return this.financeNotesRepository
      .financeNotes()
      .filter(item => item.type === 'C' && this.seminarIds.includes(item.category_id))
      .map(item => item.value)
      .reduce((acc, curr) => acc + curr, 0);
  });

  public totalOfOrganicNotes = computed(() => {
    return this.financeNotesRepository
      .financeNotes()
      .filter(item => this.organicCreditIds.includes(item.category_id))
      .map(item => item.value)
      .reduce((acc, curr) => acc + curr, 0);
  });

  public top3CreditNotesByCategories = computed(() => {
    return this.getTop3NotesByCategories('C');
  });

  public top3DebitNotesByCategories = computed(() => {
    return this.getTop3NotesByCategories('D');
  });

  public getTop3NotesByCategories(type: 'C' | 'D'): TopFinanceNoteByCategory[] {
    const categoryTotals = {} as Record<string, TopFinanceNoteByCategory>;

    let total = 0;

    const financeNotesByType = this.financeNotes().filter(item => item.type === type);

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

    const sortedCategories = Object.values(categoryTotals).sort((a, b) => b['total'] - a['total']);

    const categoriesWithPercent = sortedCategories.map(item => {
      return {
        ...item,
        percent: +(100 * (item.total / total)).toFixed(2),
      };
    });

    return categoriesWithPercent.slice(0, 3);
  }
}
