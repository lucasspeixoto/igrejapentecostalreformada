import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { CustomValidationMessageComponent } from '../../../components/shared/custom-validation-message/custom-validation-message';
import { createForgotPasswordForm, type ForgotPasswordFormValue } from '../../../view-models/auth/forgot-password/forgot-password-form';
import { messages } from '../../../../utils/messages';
import { LoadingService } from '../../../../data/services/shared/loading/loading';
import { ForgotPasswordViewModel } from '../../../view-models/auth/forgot-password/forgot-password.view-model';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    ReactiveFormsModule,
    CustomValidationMessageComponent,
  ],
  providers: [ForgotPasswordViewModel],
  templateUrl: `./forgot-password.html`,
})
export class ForgotPassword {
  public router = inject(Router);

  public forgotPasswordViewModel = inject(ForgotPasswordViewModel);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public forgotPasswordForm = createForgotPasswordForm();

  public messages = messages;

  public async forgotPasswordHandler(): Promise<void> {
    if (!this.forgotPasswordForm.valid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Preenchas os campos corretamente',
        life: 3000,
      });

      return;
    }

    const { email } = this.forgotPasswordForm.value as ForgotPasswordFormValue;

    this.forgotPasswordViewModel.forgotPasswordHandler(email);

    this.forgotPasswordForm.reset();
  }
}
