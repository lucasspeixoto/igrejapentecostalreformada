/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Routes } from '@angular/router';
import { MembersListComponent } from '../../app/features/members/views/members-list.component';
import { ResumesComponent } from './resumes/resumes';
import { FinanceComponent } from './finance/views/finance/finance.component';

export default [
  { path: 'resumos', data: { breadcrumb: 'Resumos' }, component: ResumesComponent },
  { path: 'membros', data: { breadcrumb: 'Membros' }, component: MembersListComponent },
  {
    path: 'financeiro',
    component: FinanceComponent,
    data: { breadcrumb: 'Financeiro' },
    children: [{ path: '', loadChildren: () => import('./finance/finance.routes') }],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
