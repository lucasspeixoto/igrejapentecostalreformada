/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Injectable } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { FixedAssetsRepository } from '../../../data/repositories/fixed-assets/fixed-assets-repository';
import { LoadingService } from '../../../data/services/shared/loading/loading';
import { injectSupabase } from '../../../data/services/shared/supabase';
import type { FixedAsset } from '../../../domain/models/fixed-assets.model';
import type { FixedAssetsFormControl, FixedAssetsFormValue } from './fixed-assets-form';

export interface User {
  id: number;
  full_name: string;
}

@Injectable({ providedIn: 'root' })
export class FixedAssetsViewModel {
  private fixedAssetsRepository = inject(FixedAssetsRepository);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  private supabase = injectSupabase();

  public fixedAssets = this.fixedAssetsRepository.fixedAssets;

  public totalOfFixedAssets = this.fixedAssetsRepository.totalOfFixedAssets;

  public async findAll(): Promise<void> {
    this.loadingService.isLoading.set(true);
    const { error } = await this.fixedAssetsRepository.findAll();

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar patrimônio, tente novamente mais tarde!',
        life: 3000,
      });
    }
  }

  public async deleteFixedAsset(id: number): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.fixedAssetsRepository.deleteFixedAsset(id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir patrimônio. Tente novamente!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Patrimônio excluído com sucesso!',
        life: 3000,
      });
    }
  }

  public async deleteFixedAssets(ids: number[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.fixedAssetsRepository.deleteFixedAssets(ids);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir patrimônios. Um ou mais não foram excluídos, por favor verifique!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Patrimônios excluídos com sucesso!',
        life: 3000,
      });
    }
  }

  public checkUpdateFixedAssetForm(form: FormGroup<FixedAssetsFormControl>): void {
    if (form.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });

      throw new Error('Formulário inválido!\nPreencha todos os campos obrigatórios!');
    }
  }

  public async saveFixedAsset(fixedAssetsFormValue: FixedAssetsFormValue, mode: 'add' | 'edit'): Promise<void> {
    this.loadingService.isLoading.set(true);

    const transformedFixedAssetData = {
      local: fixedAssetsFormValue.local,
      type: fixedAssetsFormValue.type,
      asset: fixedAssetsFormValue.asset,
    } as Partial<FixedAsset>;

    if (mode === 'add') {
      await this.saveFixedAssetHandler(transformedFixedAssetData);
    } else {
      await this.updateFixedAssetHandler(transformedFixedAssetData, +fixedAssetsFormValue.id);
    }
  }

  public async saveFixedAssetHandler(fixedAsset: Partial<FixedAsset>): Promise<void> {
    const { error } = await this.fixedAssetsRepository.saveFixedAsset(fixedAsset);
    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao inserir patrimônio. Tente novamente!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Patrimônio inserido com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateFixedAssetHandler(fixedAsset: Partial<FixedAsset>, assetId: number): Promise<void> {
    const { error } = await this.fixedAssetsRepository.updateFixedAsset(fixedAsset as FixedAsset, assetId);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao editar patrimônio. Tente novamente!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Patrimônio editado com sucesso!',
        life: 3000,
      });
    }
  }

  public async findAllUsers(): Promise<User[]> {
    const { data, error }: PostgrestSingleResponse<User[]> = await this.supabase
      .from('users')
      .select('id, full_name')
      .order('full_name', { ascending: true });

    if (error) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar usuários!',
        life: 3000,
      });
      return [];
    }

    return data ?? [];
  }
}
