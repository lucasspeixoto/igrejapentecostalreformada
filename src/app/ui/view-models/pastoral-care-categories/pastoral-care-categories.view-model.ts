
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../data/services/shared/loading/loading';
import { PastoralCareCategoriesRepository } from '../../../data/repositories/pastoral-care-categories/pastoral-care-categories-repository';

@Injectable({ providedIn: 'root' })
export class PastoralCareCategoriesViewModel {

  private pastoralCareCategoriesRepository = inject(PastoralCareCategoriesRepository);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public pastoralCareTypes = this.pastoralCareCategoriesRepository.pastoralCareTypes

  public async findAll(): Promise<void> {
    this.loadingService.isLoading.set(true);
    const { error } = await this.pastoralCareCategoriesRepository.findAll();

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar categories de atendimento pastoral, tente novamente mais tarde!',
        life: 3000,
      });
    }
  }
}
