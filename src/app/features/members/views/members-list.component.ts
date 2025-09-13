import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FluidModule } from 'primeng/fluid';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MembersService } from '../services/members.service';
import { Member } from '../models/member.model';
import { createMemberForm, MemberFormValue } from '../constants/member-form';
import { ExcelService } from '../../../services/excel/excel.service';
import { ExportColumn, Column } from '../../../models/columns.model';
import { PrimengDatePipe } from '../../../pipes/primeng-date/primeng-date.pipe';
import { FirstAndLastnamePipe } from '../../../pipes/first-and-lastname/first-and-lastname.pipe';
import { UpdateMemberDialogComponent } from '../components/update-member-dialog/update-member-dialog.component';
import { MemberTypePipe } from '../pipes/member-type.pipe';

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

const COMPONENTS = [UpdateMemberDialogComponent];

const PROVIDERS = [MessageService, ConfirmationService, DatePipe];

const PIPES = [FirstAndLastnamePipe, PrimengDatePipe, MemberTypePipe];

@Component({
  selector: 'app-members-list',
  imports: [...PRIMENG, ...COMPONENTS, ...PIPES, ...COMMON],
  templateUrl: './members-list.component.html',
  providers: [...PROVIDERS],
  styles: [
    `
      :host ::ng-deep .p-frozen-column {
        font-weight: bold;
      }

      :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
      }

      :host ::ng-deep {
        .p-button:disabled {
          cursor: not-allowed;
        }
      }

      ::ng-deep {
        .p-inputmask,
        .p-inputnumber,
        .p-datepicker {
          width: 100%;
        }
      }

      @media (max-width: 450px) {
        .p-iconfield {
          width: 100%;
        }
      }
    `,
  ],
})
export class MembersListComponent implements OnInit {
  public membersService = inject(MembersService);

  private messageService = inject(MessageService);

  private confirmationService = inject(ConfirmationService);

  private excelService = inject(ExcelService<Member>);

  private datePipe = inject(DatePipe);

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
    this.excelService.exportToExcel(this.membersService.members(), 'Listagem Irmãos');
  }

  public ngOnInit(): void {
    this.membersService.getAllMembersDataHandler();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public openInsertMember(): void {
    this.mode.set('add');
    this.memberForm.reset();
    this.memberDialog = true;
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

          this.membersService.deleteMembersHandler(memberNumbers);

          this.selectedMembers = [];
        }
      },
    });
  }

  public hideDialog(): void {
    this.memberForm.reset();
    this.memberDialog = false;
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
        this.membersService.deleteMemberHandler(+member.number);
      },
    });
  }

  public saveMemberHandler(): void {
    if (this.memberForm.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulário Inválido',
        detail: 'Preencha todos os campos obrigatórios!',
      });

      return;
    }

    const memberFormData = this.memberForm.value;

    const transformedMemberData = {
      ...memberFormData,
      birthday: memberFormData.birthday
        ? this.datePipe.transform(memberFormData.birthday, 'yyyy-MM-dd')
        : new Date(),
      baptismDate: memberFormData.baptismDate
        ? this.datePipe.transform(memberFormData.baptismDate, 'yyyy-MM-dd')
        : new Date(),
    } as MemberFormValue;

    if (this.mode() === 'add') {
      this.membersService.insertMembersDataHandler(transformedMemberData);
    } else {
      this.membersService.updateMembersDataHandler(transformedMemberData);
    }

    this.hideDialog();
  }
}
