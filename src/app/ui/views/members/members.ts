/* eslint-disable @typescript-eslint/naming-convention */
import { DatePipe, NgClass } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ExcelService } from '../../../data/services/shared/excel';
import type { Member } from '../../../domain/models/members.model';
import { MembersViewModel } from './../../view-models/members/members.view-model';
import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { createMemberForm } from '../../view-models/members/member-form';
import type { ExportColumn, Column } from '../../../domain/models/columns.model';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FirstAndLastnamePipe } from '../pipes/first-and-lastname/first-and-lastname.pipe';
import { PrimengDatePipe } from '../pipes/primeng-date/primeng-date.pipe';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MemberTypePipe } from '../pipes/member-type/member-type.pipe';
import { UpdateMemberDialog } from '../../components/members/update-member-dialog/update-member-dialog';

const PRIMENG = [
  TableModule,
  ButtonModule,
  ToastModule,
  ToolbarModule,
  InputTextModule,
  TagModule,
  InputIconModule,
  IconFieldModule,
  ConfirmDialogModule,
  FluidModule,
];

const COMMON = [NgClass];

const COMPONENTS = [UpdateMemberDialog];

const PROVIDERS = [MembersViewModel, MessageService, ConfirmationService, DatePipe];

const PIPES = [FirstAndLastnamePipe, PrimengDatePipe, MemberTypePipe];

@Component({
  selector: 'app-members',
  imports: [...PRIMENG, ...COMPONENTS, ...PIPES, ...COMMON],
  templateUrl: 'members.html',
  styleUrls: ['members.scss'],
  providers: [...PROVIDERS]
})

export class Members implements OnInit {
  public membersViewModel = inject(MembersViewModel);

  private confirmationService = inject(ConfirmationService);

  private excelService = inject(ExcelService<Member>);

  public selectedMembers!: Member[] | null;

  public memberDialog: boolean = false;

  public mode = signal<'add' | 'edit'>('add');

  public modalTitle = computed(() =>
    this.mode() === 'add' ? 'Adicionar Membro' : 'Editar Membro'
  );

  public exportColumns!: ExportColumn[];

  public columns!: Column[];

  public memberForm = createMemberForm();

  public filteredvalues!: Member[];

  public exportCSV(): void {
    this.excelService.exportToExcel(this.membersViewModel.members(), 'Listagem Irmãos');
  }

  public ngOnInit(): void {
    this.membersViewModel.findAll();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openInsertMember(): void {
    this.mode.set('add');
    this.memberForm.reset();
    this.memberDialog = true;
  }

  public hideDialog(): void {
    this.memberForm.reset();
    this.memberDialog = false;
  }

  public openUpdateMember(member: Member): void {
    this.mode.set('edit');

    const {
      number,
      name,
      birthday,
      rg,
      cpf,
      address,
      baptism_date,
      previous_church,
      baptism_church,
      naturality,
      cellphone,
      tellphone,
      marital_status,
      email,
      member_type,
    } = member;

    this.memberForm.setValue({
      number,
      name,
      birthday,
      rg: rg!,
      cpf: cpf!,
      address,
      baptismDate: baptism_date!,
      previousChurch: previous_church!,
      baptismChurch: baptism_church!,
      naturality: naturality!,
      cellphone: cellphone!,
      tellphone: tellphone!,
      maritalStatus: marital_status,
      email: email!,
      memberType: member_type!,
    });

    this.memberDialog = true;
  }

  public deleteSelectedMembers(): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir os membros selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        if (this.selectedMembers) {
          const memberNumbers = this.selectedMembers.map(member => +member.number);

          this.membersViewModel.deleteMembers(memberNumbers);

          this.selectedMembers = [];
        }
      },
    });
  }

  public openDeleteMember(member: Member): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o membro ' + member.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.membersViewModel.deleteMember(+member.number);
      },
    });
  }

  public saveMemberHandler(): void {
    this.membersViewModel.checkUpdateMemberForm(this.memberForm);

    const member = this.memberForm.getRawValue();

    this.membersViewModel.saveMember(member, this.mode());

  }


}
