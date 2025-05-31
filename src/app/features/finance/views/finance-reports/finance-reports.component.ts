import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';

import { FinanceReportsService } from '../../services/finance-reports/finance-reports.service';

import { InputsAndOutputsMontlhyComponent } from '../../components/inputs-and-outputs-montlhy/inputs-and-outputs-montlhy.component';
import { ValuesByCategoryComponent } from '../../components/values-by-category/values-by-category.component';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';
import { AnualInputsAndOutputsBalanceComponent } from '../../components/anual-inputs-and-outputs-balance/anual-inputs-and-outputs-balance.component';
import { SummaryForAssemblyComponent } from '../../components/summary-for-assembly/summary-for-assembly.component';

@Component({
  selector: 'app-finance-reports',
  imports: [
    ValuesByCategoryComponent,
    InputsAndOutputsMontlhyComponent,
    FormsModule,
    SelectModule,
    AnualInputsAndOutputsBalanceComponent,
    SummaryForAssemblyComponent,
  ],
  templateUrl: './finance-reports.component.html',
})
export class FinanceReportsComponent {
  public financeReportsService = inject(FinanceReportsService);

  public financeNotesService = inject(FinanceNotesService);

  public monthAndYearList = this.financeReportsService.availableMonths;

  public onMonthAndYearChange(event: DropdownChangeEvent): void {
    localStorage.setItem('IPR-SISTEMA-GESTAO:CURRENT-MONTH', event.value);
    this.financeReportsService.selectedMonthAndYear.set(event.value);
    this.financeNotesService.getAllFinanceNotesDataHandler();
  }
}
