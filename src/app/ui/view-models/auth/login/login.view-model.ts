import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthenticationRepository } from "../../../../data/repositories/authentication/authentication-repository";
import { LoadingService } from "../../../../data/services/shared/loading/loading";
import { messages } from "../../../../utils/messages";
import { LoginFormControl } from "./login-form";
import type { FormGroup } from "@angular/forms";


@Injectable()
export class LoginViewModel {
  public router = inject(Router);

  public authenticationRepository = inject(AuthenticationRepository);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public messages = messages;

  public async loginHandler(email: string, password: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.authenticationRepository.loginUserHandler(email, password);

    if (error) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: messages[error.status!],
        life: 3000,
      });

      this.loadingService.isLoading.set(false);

      return;
    }

    this.router.navigateByUrl('/plataforma-ipr/painel');

    await this.authenticationRepository.getUser();

    this.loadingService.isLoading.set(false);

    this.messageService.add({
      severity: 'success',
      summary: 'Graça e Paz',
      detail: 'Bem-vindo!',
      life: 3000,
    });
  }

  public checkLoginFormCredentials(loginForm: FormGroup<LoginFormControl>): void {
    if (!loginForm.valid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Preenchas os campos corretamente',
        life: 3000,
      });

      this.loadingService.isLoading.set(false);

      throw new Error('Dados inválidos!. Preencha email e senha corretamente!');
    }
  }
}
