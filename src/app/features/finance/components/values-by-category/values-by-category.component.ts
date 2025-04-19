import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { FinanceReportsService } from '../../services/finance-reports/finance-reports.service';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';
import { CategoryNoteDetailComponent } from '../category-note-detail/category-note-detail.component';

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
  imports: [ButtonModule, DividerModule, CategoryNoteDetailComponent],
  templateUrl: './values-by-category.component.html',
})
export class ValuesByCategoryComponent {
  public financeReportsService = inject(FinanceReportsService);

  public financeNotesService = inject(FinanceNotesService);

  public monthAndYearList = this.financeReportsService.availableMonths;

  public creditColors = CREDIT_COLORS;

  public debitColors = DEBIT_COLORS;

  public top3CreditNotesByCategories = computed(() => {
    return this.financeNotesService.getTop3NotesByCategories('C');
  });

  public top3DebitNotesByCategories = computed(() => {
    return this.financeNotesService.getTop3NotesByCategories('D');
  });

  public onMonthAndYearChange(event: DropdownChangeEvent): void {
    localStorage.setItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH', event.value);
    this.financeReportsService.selectedMonthAndYear.set(event.value);
    this.financeNotesService.getAllFinanceNotesDataHandler();
  }
}
