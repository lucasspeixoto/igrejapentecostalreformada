/* eslint-disable @typescript-eslint/naming-convention */

import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../data/services/shared/loading/loading';
import { PastoralCareRepository } from '../../../data/repositories/pastoral-care/pastoral-care-repository';
import type { PastoralCare } from '../../../domain/models/pastoral-care.model';
import type { PastoralCareFormControl, PastoralCareFormValue } from './pastoral-care-form';
import type { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PastoralCareViewModel {

  private pastoralCareRepository = inject(PastoralCareRepository);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public pastoralCare = this.pastoralCareRepository.pastoralCare;

  public totalOfPastoralCare = this.pastoralCareRepository.totalOfPastoralCare;

  public async findAll(): Promise<void> {
    this.loadingService.isLoading.set(true);
    const { error } = await this.pastoralCareRepository.findAll();

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar lista de atendimentos, tente novamente mais tarde!',
        life: 3000,
      });
    }
  }

  public async deletePastoralCare(id: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.pastoralCareRepository.deletePastoralCare(id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir atendimento. tente novamente!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Atendimento excluído com sucesso!',
        life: 3000,
      });
    }

  }


  public async deletePastoralCares(ids: string[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.pastoralCareRepository.deletePastoralCares(ids);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir atendimentos. Um ou mais não foram excluídos, por favor verifique!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Atendimentos excluídos com sucesso!',
        life: 3000,
      });
    }
  }

  public checkUpdateMemberForm(form: FormGroup<PastoralCareFormControl>): void {
    if (form.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });

      throw new Error('Formulário inválido!\nPreencha todos os campos obrigatórios!')
    }
  }

  public async savePastoralCare(pastoralCareFormValue: PastoralCareFormValue, mode: 'add' | 'edit'): Promise<void> {
    this.loadingService.isLoading.set(true);

    const updatedPastoralCare = {
      id: pastoralCareFormValue.id,
      type_id: pastoralCareFormValue.typeId,
      date: pastoralCareFormValue.date,
      member_id: pastoralCareFormValue.memberId,
      pastor: pastoralCareFormValue.pastor,
      description: pastoralCareFormValue.description,
    } as PastoralCare;


    if (mode === 'add') {
      await this.savePastoralCareHandler(updatedPastoralCare);
    } else {
      await this.updatePastoralCareHandler(updatedPastoralCare, pastoralCareFormValue.id);
    }
  }

  public async savePastoralCareHandler(member: PastoralCare): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...savedPastoralCare } = member;

    const { error } = await this.pastoralCareRepository.insert(savedPastoralCare);
    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao inserir atendimento. tente novamente!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Atendimento inserido com sucesso!',
        life: 3000,
      });
    }
  }

  public async updatePastoralCareHandler(member: PastoralCare, id: string): Promise<void> {
    const { error } = await this.pastoralCareRepository.update(member, id);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao editar atendimento. tente novamente!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Atendimento editado com sucesso!',
        life: 3000,
      });
    }
  }
}
