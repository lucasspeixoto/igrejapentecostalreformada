import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-remember-passoword',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
  ],
  template: `
    <div
      class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
      <div class="flex flex-col items-center justify-center">
        <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <div
            class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
            style="border-radius: 53px">
            <div class="text-center mb-8">
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
                Bem vindo a IPR
              </div>
              <span class="text-muted-color font-medium">Recupere a senha</span>
            </div>

            <div>
              <label
                for="email1"
                class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
                >Email</label
              >
              <input
                pInputText
                id="email1"
                type="text"
                placeholder="Endereço de Email"
                class="w-full md:w-[30rem] mb-8"
                [(ngModel)]="email" />

              <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                <div class="flex items-center">
                  <label for="rememberme1"></label>
                </div>
                <span
                  routerLink="/login"
                  class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
                  >Login</span
                >
              </div>
              <p-button label="Recuperar" styleClass="w-full"></p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RememberPasswordComponent {
  email: string = '';
}
