import { inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { LoadingService } from '../../../../services/loading/loading.service';
import type { PastoralCareType } from '../../models/pastoral-care.model';

@Injectable({
  providedIn: 'root',
})
export class PastoralCareCategoryService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public pastoralCareTypes = signal<PastoralCareType[]>([]);

  public async getPastoralCareCategoryDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('pastoral_care_types')
      .select('*')
      .order('name', { ascending: true });

    if (!error) this.pastoralCareTypes.set(data);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.pastoralCareTypes.set([]);
      throw new Error('Erro ao carregar categorias de pastorado, tente novamente mais tarde!');
    }
  }
}
