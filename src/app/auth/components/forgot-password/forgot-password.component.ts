import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { messages } from '../../../utils/messages';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { MessageService } from 'primeng/api';
import { CustomValidationMessageComponent } from '../../../components/custom-validation-message/custom-validation-message';
import {
  createForgotPasswordForm,
  ForgotPasswordFormValue,
} from '../../constants/forgot-password-form';

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
  template: `
    <div
      class="px-2 sm:px-8 py-20 md:px-12 lg:px-20 flex items-center justify-center backdrop-blur-3xl !bg-cover !bg-center !bg-no-repeat min-h-screen"
      style="background-image: url('/assets/images/background.jpeg')">
      <div class="w-full flex flex-col items-center justify-center">
        <div class="w-[95%] sm:w-[400px]">
          <div class="backdrop-blur-2xl bg-white/10 py-12 px-4 sm:px-10 rounded-2xl">
            <div class="text-center mb-8">
              <div class="text-surface-100 dark:text-surface-0 text-3xl font-medium mb-4">
                Bem vindo a IPR
              </div>
              <span class="text-surface-100 dark:text-surface-0 text-xl">Recuperar senha</span>
            </div>

            <form [formGroup]="forgotPasswordForm">
              <div class="my-4">
                <label
                  for="emailField"
                  class="block text-surface-100 dark:text-surface-0 text-xl font-medium mb-2"
                  >Email</label
                >
                <input
                  pInputText
                  id="emailField"
                  type="text"
                  placeholder="Endereço de Email"
                  class="w-full mb-2"
                  formControlName="email" />

                <app-custom-validation-message id="emailErrorMessage" controlName="email" />
              </div>

              <div class="flex items-center justify-end mt-2 mb-8 gap-8">
                <span
                  routerLink="/login"
                  class="text-sm sm:text-base font-medium hover:underline no-underline ml-2 text-right cursor-pointer text-primary"
                  >Login</span
                >
              </div>
              <p-button
                (click)="forgotPasswordHandler()"
                id="forgotPasswordButton"
                label="Lembrar"
                styleClass="w-full"></p-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ForgotPasswordComponent {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationService);

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

    this.authenticationService.forgotPasswordHandler(email);

    this.forgotPasswordForm.reset();
  }
}
