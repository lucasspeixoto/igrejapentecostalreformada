
import { inject, Injectable } from '@angular/core';
import { FinanceNoteCategoriesRepository } from '../../../data/repositories/finance-note-categories/finance-note-categories-repository';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../data/services/shared/loading/loading';

@Injectable({ providedIn: 'root' })
export class FinanceNoteCategoriesViewModel {
  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public financeNoteCategoriesRepository = inject(FinanceNoteCategoriesRepository);

  public financeNoteTypes = this.financeNoteCategoriesRepository.financeNoteTypes;

  public async findAll(): Promise<void> {
    this.loadingService.isLoading.set(true);
    const { error } = await this.financeNoteCategoriesRepository.findAll();

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Houve um erro ao carregar as categorias de notas!',
        life: 3000,
      });
    }
  }

}
