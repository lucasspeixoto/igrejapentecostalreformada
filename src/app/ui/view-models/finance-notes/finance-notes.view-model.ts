/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { PostgrestError } from '@supabase/supabase-js';
import { FinanceReportsRepository } from '../../../data/repositories/finance-reports/finance-reports-repository';
import { FinanceRpcRepository } from '../../../data/repositories/finance-rpc-repository/finance-rpc-repository';
import { LoadingService } from '../../../data/services/shared/loading/loading';
import type { FinanceNoteExcel } from '../../../domain/models/finance-note-excel.model';
import type { FinanceNote, FinanceNoteAddParameters, FinanceNoteDeleteParameters, FinanceNoteEditParameters, IDeleteFinanceNoteResponse } from '../../../domain/models/finance-note.model';
import { getActualDate, getFirstAndLastDayOfAMonth } from '../../../utils/date';
import { FinanceNotesRepository } from './../../../data/repositories/finance-notes/finance-notes-repository';
import { inject, Injectable } from '@angular/core';
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

  public async updateFinanceNoteCheck(financeNote: FinanceNote): Promise<IDeleteFinanceNoteResponse> {
    const updatedFinanceNote = {
      ...financeNote, is_checked: !financeNote.is_checked,
    };
    return await this.financeNotesRepository.updateFinanceNoteCheck(updatedFinanceNote);
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

  public async getAllFinanceReportsDataHandler(): Promise<void> {
    await this.financeReportsRepository.findAll();
  }

  public getFirstAndLastDayOfAMonth(): { firstDay: string; lastDay: string } {
    const currentActualDate = localStorage.getItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH');
    return getFirstAndLastDayOfAMonth(currentActualDate ? currentActualDate : getActualDate());
  }

  public generateFinanceNotesForCSV(): FinanceNoteExcel[] {
    return this.financeNotes().reverse().map(item => {
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
    } as FinanceNoteAddParameters
  }

  public generateFinanceNoteEditParameters(transformedMemberData: FinanceNoteFormValue, userId: string): FinanceNoteEditParameters {
    return {
      p_note_id: transformedMemberData.id,
      p_date: transformedMemberData.date,
      p_user_id: userId,
      p_description: transformedMemberData.description,
      p_category_id: transformedMemberData.category,
      p_member_id: transformedMemberData.member !== '' ? transformedMemberData.member : null,
      p_type: transformedMemberData.type,
      p_value: transformedMemberData.value,
    } as FinanceNoteEditParameters
  }
}
