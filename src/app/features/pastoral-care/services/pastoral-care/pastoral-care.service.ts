import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PastoralCare } from '../../models/pastoral-care.model';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { injectSupabase } from 'src/app/utils/inject-supabase';
import { PastoralCareCategoryService } from '../category/pastoral-care-category.service';
import type { PastoralCareFormValue } from '../../constants/pastoral-care-form';

@Injectable({
  providedIn: 'root',
})
export class PastoralCareService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public pastoralCareCategoryService = inject(PastoralCareCategoryService);

  public pastoralCare = signal<PastoralCare[]>([]);

  public totalOfItems = computed(() => this.pastoralCare().length);

  public async getPastoralCareDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('pastoral_care')
      .select('*, members(name), pastoral_care_types(name)')
      .order('date', { ascending: false });

    if (!error) this.pastoralCare.set(data);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.pastoralCare.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar lista de atendimentos, tente novamente mais tarde!',
        life: 3000,
      });
    }
  }

  public async insertPastoralCareDataHandler(pastoralCare: PastoralCareFormValue): Promise<void> {
    this.loadingService.isLoading.set(true);

    const updatedPastoralCare = {
      created_at: new Date().toISOString(),
      type_id: pastoralCare.typeId,
      date: pastoralCare.date,
      member_id: pastoralCare.memberId,
      pastor: pastoralCare.pastor,
      description: pastoralCare.description,
    } as PastoralCare;

    const { error } = await this.supabase.from('pastoral_care').insert([updatedPastoralCare]);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao inserir atendimento. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentPastoralCareList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Atendimento inserido com sucesso!',
        life: 3000,
      });
    }
  }

  public async updatePastoralCareDataHandler(pastoralCare: PastoralCareFormValue): Promise<void> {
    this.loadingService.isLoading.set(true);

    const updatedMember = {
      id: pastoralCare.id,
      type_id: pastoralCare.typeId,
      date: pastoralCare.date,
      member_id: pastoralCare.memberId,
      pastor: pastoralCare.pastor,
      description: pastoralCare.description,
    } as PastoralCare;

    const { error } = await this.supabase
      .from('pastoral_care')
      .update([updatedMember])
      .eq('id', pastoralCare.id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao editar atendimento. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentPastoralCareList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Atendimento editado com sucesso!',
        life: 3000,
      });
    }
  }

  public async deletePastoralCareHandler(id: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.from('pastoral_care').delete().eq('id', id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir atendimento. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentPastoralCareList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Atendimento excluído com sucesso!',
        life: 3000,
      });
    }
  }

  public async deletePastoralCaresHandler(ids: string[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase
      .from('pastoral_care')
      .delete()
      .in('id', [...ids]);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail:
          'Erro ao excluir atendimentos. Um ou mais não foram excluídos, por favor verifique!',
        life: 3000,
      });
    } else {
      this.updateCurrentPastoralCareList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Atendimentos excluídos com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateCurrentPastoralCareList(): Promise<void> {
    const { data, error } = await this.supabase
      .from('pastoral_care')
      .select('*, members(name), pastoral_care_types(name)')
      .order('date', { ascending: false });

    if (!error) this.pastoralCare.set(data);
  }
}
