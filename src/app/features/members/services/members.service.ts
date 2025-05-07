import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Member } from '../models/member.model';
import { injectSupabase } from '../../../../app/utils/inject-supabase';
import { LoadingService } from '../../../../app/services/loading/loading.service';
import { MemberFormValue } from '../constants/member-form';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public members = signal<Member[]>([]);

  public totalOfMembers = computed(() => this.members().length);

  public async getAllMembersDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('members')
      .select('*')
      .order('name', { ascending: true });

    if (!error) this.members.set(data);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.members.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar membros, tente novamente mais tarde!',
        life: 3000,
      });
    }
  }

  public async insertMembersDataHandler(member: MemberFormValue): Promise<void> {
    this.loadingService.isLoading.set(true);

    const updatedMember = {
      created_at: new Date().toISOString(),
      name: member.name,
      birthday: member.birthday,
      rg: member.rg,
      cpf: member.cpf,
      address: member.address,
      baptism_date: member.baptismDate,
      previous_church: member.previousChurch,
      baptism_church: member.baptismChurch,
      naturality: member.naturality,
      cellphone: member.cellphone,
      tellphone: member.tellphone,
      marital_status: member.maritalStatus,
      email: member.email,
      member_type: member.memberType,
    } as Member;

    const { error } = await this.supabase.from('members').insert([updatedMember]);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao inserir membro. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentMembersList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Membro inserido com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateMembersDataHandler(member: MemberFormValue): Promise<void> {
    this.loadingService.isLoading.set(true);

    const updatedMember = {
      number: member.number,
      name: member.name,
      birthday: member.birthday,
      rg: member.rg,
      cpf: member.cpf,
      address: member.address,
      baptism_date: member.baptismDate,
      previous_church: member.previousChurch,
      baptism_church: member.baptismChurch,
      naturality: member.naturality,
      cellphone: member.cellphone,
      tellphone: member.tellphone,
      marital_status: member.maritalStatus,
      email: member.email,
      member_type: member.memberType,
    } as Member;

    const { error } = await this.supabase
      .from('members')
      .update([updatedMember])
      .eq('number', +member.number);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao editar membro. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentMembersList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Membro editado com sucesso!',
        life: 3000,
      });
    }
  }

  public async deleteMemberHandler(number: number): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.from('members').delete().eq('number', number);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir membro. tente novamente!',
        life: 3000,
      });
    } else {
      this.updateCurrentMembersList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Membro excluído com sucesso!',
        life: 3000,
      });
    }
  }

  public async deleteMembersHandler(numbers: number[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase
      .from('members')
      .delete()
      .in('number', [...numbers]);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro',
        detail: 'Erro ao excluir membros. Um ou mais não foram excluídos, por favor verifique!',
        life: 3000,
      });
    } else {
      this.updateCurrentMembersList();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Membros excluídos com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateCurrentMembersList(): Promise<void> {
    const { data, error } = await this.supabase
      .from('members')
      .select('*')
      .order('number', { ascending: true });

    if (!error) this.members.set(data);
  }
}
