import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ResetPasswordViewModel } from '../../../view-models/auth/reset-password/reset-password.view-model';
import { createResetPasswordForm, type ResetPasswordFormValue } from '../../../view-models/auth/reset-password/reset-password-form';
import { CustomValidationMessageComponent } from '../../../components/shared/custom-validation-message/custom-validation-message';

@Component({
  selector: 'app-reset-password',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    ReactiveFormsModule,
    CustomValidationMessageComponent
  ],
  providers: [ResetPasswordViewModel],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  public router = inject(Router);

  public resetPasswordViewModel = inject(ResetPasswordViewModel);

  public resetPasswordForm = createResetPasswordForm();

  public async resetPasswordHandler(): Promise<void> {

    const { password } = this.resetPasswordForm.value as ResetPasswordFormValue;

    this.resetPasswordViewModel.resetPasswordHandler(password);

    this.resetPasswordForm.reset();
  }
}
