import { AuthenticationService } from './../../auth/services/authentication.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitemComponent, RouterModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of menuItems; let i = index">
      <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `,
})
export class AppMenuComponent implements OnInit {
  public menuItems: MenuItem[] = [];

  private authenticationService = inject(AuthenticationService);

  public isVisible = false;

  public ngOnInit(): void {
    this.isVisible = this.checkIsAdmin();

    this.menuItems = [
      {
        label: 'Menu',
        visible: true,
        items: [
          {
            label: 'Painel',
            visible: true,
            icon: 'pi pi-fw pi-home',
            routerLink: ['/inicio/painel'],
          },
          {
            label: 'Membros',
            visible: true,
            icon: 'pi pi-fw pi-users',
            routerLink: ['/inicio/membros'],
          },
          {
            label: 'Financeiro',
            visible: this.isVisible,
            icon: 'pi pi-fw pi-dollar',
            items: [
              {
                label: 'Lançamentos',
                visible: this.isVisible,
                icon: 'pi pi-fw pi-file-arrow-up',
                routerLink: ['/inicio/financeiro/notas'],
              },
              {
                label: 'Relatórios',
                visible: this.isVisible,
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: ['/inicio/financeiro/relatorios'],
              },
            ],
          },
        ],
      },
    ];
  }

  public checkIsAdmin(): boolean {
    return this.authenticationService.isAdminCheckHandler();
  }
}
