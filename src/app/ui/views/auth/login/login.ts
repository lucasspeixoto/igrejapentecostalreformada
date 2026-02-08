import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { createLoginForm, type LoginFormValue } from '../../../view-models/auth/login/login-form';
import { CustomValidationMessageComponent } from '../../../components/shared/custom-validation-message/custom-validation-message';
import { LoginViewModel } from '../../../view-models/auth/login/login.view-model';

@Component({
  selector: 'app-login',
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
  providers: [LoginViewModel],
  templateUrl: './login.html'
})
export class LoginComponent {
  public loginViewModel = inject(LoginViewModel);

  public loginForm = createLoginForm();

  public async loginHandler(): Promise<void> {
    const { email, password } = this.loginForm.value as LoginFormValue;
    this.loginViewModel.checkLoginFormCredentials(this.loginForm);
    await this.loginViewModel.loginHandler(email, password);
  }
}
