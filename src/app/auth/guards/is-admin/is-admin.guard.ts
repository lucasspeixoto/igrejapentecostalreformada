/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

export const isAdminGuard: CanActivateFn = (_route, _state) => {
  const authenticationService = inject(AuthenticationService);

  const router = inject(Router);

  if (authenticationService.isAdminCheckHandler()) {
    return true;
  } else {
    router.navigateByUrl('/inicio/painel');
    return false;
  }
};
