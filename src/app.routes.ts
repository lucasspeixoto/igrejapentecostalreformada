import { Routes } from '@angular/router';
import { AppLayoutComponent } from './app/layout/component/app.layout';

import { isLoggedGuard } from './app/auth/guards/is-logged.guard';
import { NotfoundComponent } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./app/auth/components/login.component').then(c => c.LoginComponent),
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [{ path: 'modules', loadChildren: () => import('./app/features/features.routes') }],
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];
