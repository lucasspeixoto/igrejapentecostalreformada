import { Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard';
import { MembersListComponent } from 'src/app/features/members/views/members-list.component';

export default [
  { path: 'dashboard', data: { breadcrumb: 'Home' }, component: DashboardComponent },
  { path: 'membros', data: { breadcrumb: 'Membros' }, component: MembersListComponent },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
