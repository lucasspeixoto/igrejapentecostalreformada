import { Routes } from '@angular/router';
import { AppLayoutComponent } from './app/layout/component/app.layout.component';

import { NotfoundComponent } from './app/pages/notfound/notfound';
import { isLoggedGuard } from './app/auth/guards/is-logged/is-logged.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./app/auth/components/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'lembrar-senha',
    loadComponent: () =>
      import('./app/auth/components/forgot-password/forgot-password.component').then(
        c => c.ForgotPasswordComponent
      ),
  },
  {
    path: 'resetar-senha',
    loadComponent: () =>
      import('./app/auth/components/reset-password/reset-password.component').then(
        c => c.ResetPasswordComponent
      ),
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [{ path: 'inicio', loadChildren: () => import('./app/features/features.routes') }],
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];
