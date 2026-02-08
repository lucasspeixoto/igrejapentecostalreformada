import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import { ROUTES } from './app.routes';
import { ptBrTranslation } from './utils/pt-br';
import Lara from '@primeuix/themes/lara';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    MessageService,
    provideBrowserGlobalErrorListeners(),
    /* provideAnimationsAsync(), */
    provideRouter(
      ROUTES,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation()
    ),
    providePrimeNG({
      translation: ptBrTranslation,
      theme: { preset: Lara, options: { darkModeSelector: '.app-dark' } },
    }),
  ]
};
