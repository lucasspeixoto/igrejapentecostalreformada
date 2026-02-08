import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationRepository } from "../../../../data/repositories/authentication/authentication-repository";
import { LoadingService } from "../../../../data/services/shared/loading/loading";

@Injectable()
export class AuthenticationViewModel {
  public router = inject(Router);

  public authenticationRepository = inject(AuthenticationRepository);

  public loadingService = inject(LoadingService);

  public currentSession = this.authenticationRepository.currentSession;

}
