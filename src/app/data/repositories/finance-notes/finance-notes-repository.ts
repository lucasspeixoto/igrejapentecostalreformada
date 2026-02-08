/* eslint-disable max-len */
import { computed, inject, Injectable, signal } from "@angular/core";
import type { FinanceNote, IDeleteFinanceNoteResponse, IFindAllFinanceNotesByDateRangeResponse, IUpdateFinanceNoteResponse } from "../../../domain/models/finance-note.model";
import { FinanceNotesService } from "../../services/finance-notes/finance-notes-service";

@Injectable({
  providedIn: 'root',
})
export class FinanceNotesRepository {
  private financeNotesService = inject(FinanceNotesService);

  private _financeNotes = signal<FinanceNote[]>([]);
  public financeNotes = this._financeNotes.asReadonly();

  public totalOfFinanceNotes = computed(() => this.financeNotes().length);

  public numberOfNonCheckedNotes = computed(
    () => this.financeNotes().filter(item => item.is_checked === false).length
  );

  public numberOfPendingNotes = computed(
    () => this.financeNotes().filter(item => item.value === 0).length
  );

  public async findAllByDateRange(startDate: string, endDate: string): Promise<IFindAllFinanceNotesByDateRangeResponse> {
    const { data, error } = await this.financeNotesService.findAllByDateRange(startDate, endDate);

    if (!error && data) {
      this._financeNotes.set(data);
    } else {
      this._financeNotes.set([]);
    }

    return { data: data ?? null, error };
  }

  public async findAllByDateRangeAndCategory(startDate: string, endDate: string, categoryId: string): Promise<IFindAllFinanceNotesByDateRangeResponse> {
    const { data, error } = await this.financeNotesService.findAllByDateRangeAndCategory(startDate, endDate, categoryId);

    if (!error && data) {
      this._financeNotes.set(data);
    } else {
      this._financeNotes.set([]);
    }

    return { data: data ?? null, error };
  }

  public async create(financeNote: FinanceNote): Promise<IUpdateFinanceNoteResponse> {
    const { data, error } = await this.financeNotesService.create(financeNote);
    return { data, error };
  }

  public async update(financeNote: FinanceNote): Promise<IUpdateFinanceNoteResponse> {
    const { error } = await this.financeNotesService.update(financeNote);
    return { data: null, error };
  }

  public async delete(id: string): Promise<IDeleteFinanceNoteResponse> {
    const { error } = await this.financeNotesService.delete(id);
    return { error };
  }

  public async updateFinanceNoteCheck(financeNote: FinanceNote): Promise<IDeleteFinanceNoteResponse> {
    const { error } = await this.financeNotesService.updateFinanceNoteCheck(financeNote);
    return { error };
  }
}
