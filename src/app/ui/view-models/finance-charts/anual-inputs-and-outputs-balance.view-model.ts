import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../data/services/shared/loading/loading';
import { MONTHS_ALIAS } from '../../../utils/constants';

@Injectable({ providedIn: 'root' })
export class AnualInputsAndOutputsBalanceViewModel {
  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public months = MONTHS_ALIAS;

  public selectedYear: number = new Date().getFullYear();

  public selectedType: 'C' | 'D' | 'A' = 'A';

  public availableYears: number[] = [2025, 2026];
}
