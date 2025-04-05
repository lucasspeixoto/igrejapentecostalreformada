import { Routes } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { RememberPasswordComponent } from './remember-password';

export default [
  { path: 'lembrar-senha', component: RememberPasswordComponent },
  { path: 'login', component: LoginComponent },
] as Routes;
