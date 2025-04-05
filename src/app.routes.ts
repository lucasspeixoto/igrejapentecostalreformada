import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./app/features/auth/auth.routes') },
  {
    path: 'plataformaipr',
    component: AppLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'servicos', loadChildren: () => import('./app/pages/features/features.routes') },
      /* { path: 'documentation', component: Documentation },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }, */
    ],
  },
  /*  { path: 'landing', component: Landing }, */
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
];
