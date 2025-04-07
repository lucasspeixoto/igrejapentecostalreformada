import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitemComponent, RouterModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of model; let i = index">
      <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `,
})
export class AppMenuComponent implements OnInit {
  public model: MenuItem[] = [];

  public ngOnInit(): void {
    this.model = [
      {
        label: 'Módulos',
        items: [
          { label: 'Resumos', icon: 'pi pi-fw pi-home', routerLink: ['/inicio/resumos'] },
          {
            label: 'Membros',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/inicio/membros'],
          },
          {
            label: 'Financeiro',
            icon: 'pi pi-fw pi-dollar',
            items: [
              {
                label: 'Lançamentos',
                icon: 'pi pi-fw pi-file-arrow-up',
                routerLink: ['/inicio/financeiro/notas'],
              },
              {
                label: 'Relatórios',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: ['/inicio/financeiro/relatorios'],
              },
            ],
          },
        ],
      },
    ];
  }
}
