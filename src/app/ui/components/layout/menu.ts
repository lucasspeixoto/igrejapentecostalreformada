import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationRepository } from '../../../data/repositories/authentication/authentication-repository';
import { UserRolesRepository } from '../../../data/repositories/user-roles/user-roles-repository';
import { AppMenuitem } from './menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuitem, RouterModule],
  template: `<ul class="layout-menu">
    @for (item of menuItems; track item; let i = $index) {
      @if (!item.separator) {
        <li app-menuitem [item]="item" [index]="i" [root]="true"></li>
      }
      @if (item.separator) {
        <li class="menu-separator"></li>
      }
    }
  </ul>`,
})
export class AppMenu implements OnInit {
  public menuItems: MenuItem[] = [];

  public userRolesRepository = inject(UserRolesRepository);

  public authenticationRepository = inject(AuthenticationRepository);

  public isAdmin = false;

  public isLogged = false;

  public ngOnInit(): void {
    this.isAdmin = this.userRolesRepository.isUserAdmin();

    this.isLogged = this.authenticationRepository.isUserLogged();

    this.menuItems = [
      {
        label: 'Menu',
        visible: true,
        items: [
          {
            label: 'Painel',
            visible: true,
            icon: 'pi pi-fw pi-home',
            routerLink: ['/plataforma-ipr/painel'],
          },
          {
            label: 'Membros',
            visible: this.isAdmin,
            icon: 'pi pi-fw pi-users',
            routerLink: ['/plataforma-ipr/membros'],
          },
          {
            label: 'Atendimento Pastoral',
            visible: this.isAdmin,
            icon: 'pi pi-fw pi-heart-fill',
            routerLink: ['/plataforma-ipr/atendimento-pastoral'],
          },
          {
            label: 'Financeiro',
            visible: this.isAdmin,
            icon: 'pi pi-fw pi-dollar',
            items: [
              {
                label: 'Lançamentos',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-file-arrow-up',
                routerLink: ['/plataforma-ipr/financeiro/notas'],
              },
              {
                label: 'Relatórios',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: ['/plataforma-ipr/financeiro/relatorios'],
              },
              {
                label: 'Investimentos',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-chart-line',
                routerLink: ['/plataforma-ipr/financeiro/investimentos'],
              },
            ],
          },
        ],
      },
    ];
  }
}
