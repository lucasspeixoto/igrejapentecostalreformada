import { inject, Injectable, signal } from "@angular/core";
import { FinanceNoteCategoriesService } from "../../services/finance-note-categories/finance-note-categories-service";
import type { FinanceNoteCategory, IFindAllFinanceNoteCategoriesResponse } from "../../../domain/models/finance-category.model";

@Injectable({
  providedIn: 'root',
})
export class FinanceNoteCategoriesRepository {
  private financeNoteCategoriesService = inject(FinanceNoteCategoriesService);

  private _financeNoteTypes = signal<FinanceNoteCategory[]>([]);
  public financeNoteTypes = this._financeNoteTypes.asReadonly();

  public async findAll(): Promise<IFindAllFinanceNoteCategoriesResponse> {
    const { data, error } = await this.financeNoteCategoriesService.findAll();
    if (!error) {
      this._financeNoteTypes.set(data)
    } else {
      this._financeNoteTypes.set([])
    };

    return { data, error };
  }
}
