import { Routes } from '@angular/router';
import { EmptyComponent } from './empty/empty';

export default [
  { path: 'empty', component: EmptyComponent },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
