/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Routes } from '@angular/router';
import { Finance } from '../../ui/views/finance/finance';
import { FixedAssets } from '../../ui/views/fixed-assets/fixed-assets';
import { Members } from '../../ui/views/members/members';
import { Resumes } from '../../ui/views/panel/resumes';
import { PastoralCareList } from '../../ui/views/pastoral-care/pastoral-care-list';
import { isAdminGuard } from '../guards/is-admin/is-admin.guard';
import { isSecretaryGuard } from '../guards/is-secretary/is-secretary.guard';
import { isTreasuryGuard } from '../guards/is-treasury/is-treasury.guard';

export default [
  { path: 'painel', component: Resumes },
  { path: 'membros', canActivate: [isSecretaryGuard], component: Members },
  { path: 'patrimonio', canActivate: [isAdminGuard], component: FixedAssets },
  {
    path: 'atendimento-pastoral',
    canActivate: [isAdminGuard],
    component: PastoralCareList,
  },
  {
    path: 'financeiro',
    component: Finance,
    canActivate: [isTreasuryGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./finance.routes'),
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
