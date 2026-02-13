import { IMAGE_CONFIG } from '@angular/common';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Lara from '@primeuix/themes/lara';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { ROUTES } from './app.routes';
import { ptBrTranslation } from './utils/pt-br';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    MessageService,
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      ROUTES,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation()
    ),
    providePrimeNG({
      translation: ptBrTranslation,
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
  ],
};
