/* eslint-disable @typescript-eslint/naming-convention */

import { inject, Injectable } from '@angular/core';
import { MembersRepository } from '../../../data/repositories/members/members-repository';
import type { Member } from '../../../domain/models/members.model';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../data/services/shared/loading/loading';
import type { FormGroup } from '@angular/forms';
import type { MemberFormControl, MemberFormValue } from './member-form';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class MembersViewModel {
  private membersRepository = inject(MembersRepository);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  private datePipe = inject(DatePipe);

  public members = this.membersRepository.members;

  public totalOfMembers = this.membersRepository.totalOfMembers;

  public async findAll(): Promise<void> {
    this.loadingService.isLoading.set(true);
    const { error } = await this.membersRepository.findAll();

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar membros, tente novamente mais tarde!',
        life: 3000,
      });
    }
  }

  public async deleteMember(number: number): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.membersRepository.deleteMember(number);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir membro. tente novamente!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Membro excluído com sucesso!',
        life: 3000,
      });
    }

  }

  public async deleteMembers(numbers: number[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.membersRepository.deleteMembers(numbers);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir membros. Um ou mais não foram excluídos, por favor verifique!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Membros excluídos com sucesso!',
        life: 3000,
      });
    }
  }

  public checkUpdateMemberForm(form: FormGroup<MemberFormControl>): void {
    if (form.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });

      throw new Error('Formulário inválido!\nPreencha todos os campos obrigatórios!')
    }
  }

  public async saveMember(memberFormValue: MemberFormValue, mode: 'add' | 'edit'): Promise<void> {
    this.loadingService.isLoading.set(true);

    const transformedMemberData = {
      ...memberFormValue,
      birthday: memberFormValue.birthday
        ? this.datePipe.transform(memberFormValue.birthday, 'yyyy-MM-dd')
        : new Date(),
      baptismDate: memberFormValue.baptismDate
        ? this.datePipe.transform(memberFormValue.baptismDate, 'yyyy-MM-dd')
        : new Date(),
    } as MemberFormValue;

    const updatedMember = {
      number: transformedMemberData.number,
      name: transformedMemberData.name,
      birthday: transformedMemberData.birthday,
      rg: transformedMemberData.rg,
      cpf: transformedMemberData.cpf,
      address: transformedMemberData.address,
      baptism_date: transformedMemberData.baptismDate,
      previous_church: transformedMemberData.previousChurch,
      baptism_church: transformedMemberData.baptismChurch,
      naturality: transformedMemberData.naturality,
      cellphone: transformedMemberData.cellphone,
      tellphone: transformedMemberData.tellphone,
      marital_status: transformedMemberData.maritalStatus,
      email: transformedMemberData.email,
      member_type: transformedMemberData.memberType,
    } as Member;

    if (mode === 'add') {
      await this.saveMemberHandler(updatedMember);
    } else {
      await this.updateMemberHandler(updatedMember, +transformedMemberData.number);
    }
  }

  public async saveMemberHandler(member: Member): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { number, ...savedMember } = member;

    const { error } = await this.membersRepository.saveMember(savedMember);
    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao inserir membro. tente novamente!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Membro inserido com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateMemberHandler(member: Member, memberNumber: number): Promise<void> {
    const { error } = await this.membersRepository.updateMember(member, memberNumber);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao editar membro. tente novamente!',
        life: 3000,
      });
    } else {
      await this.findAll();

      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Membro editado com sucesso!',
        life: 3000,
      });
    }
  }
}
