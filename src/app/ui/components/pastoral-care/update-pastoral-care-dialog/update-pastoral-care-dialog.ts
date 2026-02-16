import { Component, EventEmitter, inject, input, Input, Output, type OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { PastoralCareCategoriesRepository } from '../../../../data/repositories/pastoral-care-categories/pastoral-care-categories-repository';
import { MARITAL_STATUS, MEMBER_TYPES, OBREIROS } from '../../../../utils/constants';
import { MembersViewModel } from '../../../view-models/members/members.view-model';
import type { PastoralCareFormControl } from '../../../view-models/pastoral-care/pastoral-care-form';
import { CustomValidationMessageComponent } from '../../shared/custom-validation-message/custom-validation-message';

const PRIMENG = [
  InputMaskModule,
  DatePickerModule,
  ButtonModule,
  ToastModule,
  TextareaModule,
  SelectModule,
  InputTextModule,
  DialogModule,
];

const COMMON = [FormsModule, ReactiveFormsModule, CustomValidationMessageComponent];

const PROVIDERS = [MessageService, MembersViewModel];

@Component({
  selector: 'app-update-pastoral-care-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './update-pastoral-care-dialog.html',
  styles: [
    `
      :host ::ng-deep .p-frozen-column {
        font-weight: bold;
      }

      :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
      }

      ::ng-deep {
        .p-inputmask,
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
  providers: [...PROVIDERS],
})
export class UpdatePastoralCareDialog implements OnInit {
  @Input() public dialog!: boolean;

  @Input() public pastoralCareForm!: FormGroup<PastoralCareFormControl>;

  @Output() public dialogClosed = new EventEmitter<void>();

  @Output() public pastoralCareSaved = new EventEmitter<void>();

  public modalTitle = input<string>('');

  public membersViewModel = inject(MembersViewModel);

  public pastoralCareCategoriesRepository = inject(PastoralCareCategoriesRepository);

  public maritalStatus = MARITAL_STATUS;

  public memberTypes = MEMBER_TYPES;

  public obreiroTypes = OBREIROS;

  public ngOnInit(): void {
    this.membersViewModel.findAll();
  }

  public hideDialog(): void {
    this.dialog = false;
    this.dialogClosed.emit();
  }

  public savePastoralCareHandler(): void {
    if (this.pastoralCareForm.valid) {
      this.pastoralCareSaved.emit();
      this.dialog = false;
    }
  }
}
