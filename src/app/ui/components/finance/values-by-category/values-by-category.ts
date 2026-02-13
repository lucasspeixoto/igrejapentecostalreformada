/* eslint-disable @typescript-eslint/naming-convention */
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SelectModule, type SelectChangeEvent } from 'primeng/select';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { CategoryNoteDetail } from './category-note-detail/category-note-detail';

const CREDIT_COLORS: Record<number, string> = {
  0: 'orange',
  1: 'cyan',
  2: 'lime',
};

const DEBIT_COLORS: Record<number, string> = {
  0: 'green',
  1: 'purple',
  2: 'yellow',
};

@Component({
  selector: 'app-values-by-category',
  imports: [ButtonModule, DividerModule, FormsModule, SelectModule, ButtonModule, CategoryNoteDetail],
  templateUrl: './values-by-category.html',
  styles: [
    `
      :host ::ng-deep {
        .p-button:disabled {
          cursor: not-allowed;
        }
      }
    `,
  ],
})
export class ValuesByCategory {
  public financeNotesViewModel = inject(FinanceNotesViewModel);

  public financeReportsViewModel = inject(FinanceReportsViewModel);

  public monthAndYearList = this.financeReportsViewModel.availableMonths;

  public selectedMonthAndYear = this.financeReportsViewModel.selectedMonthAndYear;

  public creditColors = CREDIT_COLORS;

  public debitColors = DEBIT_COLORS;

  public top3CreditNotesByCategories = computed(() => {
    return this.financeNotesViewModel.getTop3NotesByCategories('C');
  });

  public top3DebitNotesByCategories = computed(() => {
    return this.financeNotesViewModel.getTop3NotesByCategories('D');
  });

  public onMonthAndYearChange(event: SelectChangeEvent): void {
    localStorage.setItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH', event.value);
    this.financeReportsViewModel.setSelectedMonthAndYear(event.value);
    this.financeNotesViewModel.getAllFinanceNotesDataHandler();
  }
}
