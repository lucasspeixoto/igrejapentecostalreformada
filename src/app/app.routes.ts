import { Routes } from '@angular/router';
import { isLoggedGuard } from './core/guards/is-logged/is-logged.guard';
import { Notfound } from './ui/components/shared/notfound';
import { AppLayoutComponent } from './ui/views/layout/layout';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./ui/views/auth/login/login').then(c => c.LoginComponent),
  },
  {
    path: 'lembrar-senha',
    loadComponent: () => import('./ui/views/auth/forgot-password/forgot-password').then(c => c.ForgotPassword),
  },
  {
    path: 'resetar-senha',
    loadComponent: () => import('./ui/views/auth/reset-password/reset-password').then(c => c.ResetPassword),
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [{ path: 'plataforma-ipr', loadChildren: () => import('./core/routes/features.routes') }],
  },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
];
