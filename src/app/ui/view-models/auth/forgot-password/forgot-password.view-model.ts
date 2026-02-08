import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthenticationRepository } from "../../../../data/repositories/authentication/authentication-repository";
import { LoadingService } from "../../../../data/services/shared/loading/loading";
import { messages } from "../../../../utils/messages";

@Injectable()
export class ForgotPasswordViewModel {
  public router = inject(Router);

  public authenticationRepository = inject(AuthenticationRepository);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public messages = messages;

  public async forgotPasswordHandler(email: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.authenticationRepository.forgotPasswordHandler(email);

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

    this.router.navigateByUrl('/login');

    this.loadingService.isLoading.set(false);

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Link de recuperação enviado por e-mail!',
      life: 3000,
    });
  }
}
