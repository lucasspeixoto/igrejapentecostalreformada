/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Routes } from '@angular/router';
import { MembersListComponent } from '../../app/features/members/views/members-list.component';
import { ResumesComponent } from './resumes/resumes';
import { FinanceComponent } from './finance/views/finance/finance.component';
import { isAdminGuard } from '../auth/guards/is-admin/is-admin.guard';

export default [
  { path: 'painel', component: ResumesComponent },
  { path: 'membros', component: MembersListComponent },
  {
    path: 'financeiro',
    component: FinanceComponent,
    canActivate: [isAdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./finance/finance.routes'),
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
