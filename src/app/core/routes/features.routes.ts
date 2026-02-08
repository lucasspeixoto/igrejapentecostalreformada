/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Routes } from '@angular/router';
import { Members } from '../../ui/views/members/members';
import { Resumes } from '../../ui/views/panel/resumes';
import { PastoralCareList } from '../../ui/views/pastoral-care/pastoral-care-list';
import { isAdminGuard } from '../guards/is-admin/is-admin.guard';
import { Finance } from '../../ui/views/finance/finance';


export default [
  { path: 'painel', component: Resumes },
  { path: 'membros', canActivate: [isAdminGuard], component: Members },
  {
    path: 'atendimento-pastoral',
    canActivate: [isAdminGuard],
    component: PastoralCareList,
  },
  {
    path: 'financeiro',
    component: Finance,
    canActivate: [isAdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./finance.routes'),
      },
    ],
  },
  /* ,
  {
    path: 'escola-de-discipulos',
    component: EdComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./ed/ed.routes'),
      },
    ],
  }, */
  { path: '**', redirectTo: '/notfound' },
] as Routes;
