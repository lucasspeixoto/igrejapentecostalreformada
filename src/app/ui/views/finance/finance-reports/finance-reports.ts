import { Component } from '@angular/core';
import { AnualInputsAndOutputs } from '../../../components/finance/anual-inputs-and-outputs-balance/anual-inputs-and-outputs-balance';
import { InputsAndOutputsMontlhy } from '../../../components/finance/inputs-and-outputs-monthly/inputs-and-outputs-monthly';
import { MonthlyTotalsByYear } from '../../../components/finance/monthly-totals-by-year/monthly-totals-by-year';
import { SummaryForAssembly } from '../../../components/finance/summary-for-assembly/summary-for-assembly';
import { ValuesByCategory } from '../../../components/finance/values-by-category/values-by-category';

@Component({
  selector: 'app-finance-reports',
  imports: [MonthlyTotalsByYear, SummaryForAssembly, InputsAndOutputsMontlhy, ValuesByCategory, AnualInputsAndOutputs],
  templateUrl: './finance-reports.html',
  styleUrl: './finance-reports.scss',
})
export class FinanceReports {}
