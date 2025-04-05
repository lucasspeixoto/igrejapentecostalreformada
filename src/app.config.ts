import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import Lara from '@primeng/themes/lara';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './app/auth/services/authentication.service';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation()
    ),
    provideAppInitializer(() => inject(AuthenticationService).loadUserData()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule),
    providePrimeNG({ theme: { preset: Lara, options: { darkModeSelector: '.app-dark' } } }),
  ],
};
