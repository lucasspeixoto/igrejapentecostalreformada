import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { AuthenticationService } from './../../auth/services/authentication.service';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-topbar',
  imports: [RouterModule, CommonModule, StyleClassModule, TooltipModule],
  template: ` <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button
        class="layout-menu-button layout-topbar-action"
        (click)="layoutService.onMenuToggle()">
        <i class="pi pi-bars"></i>
      </button>
      <!-- <a class="layout-topbar-logo" routerLink="/">
        <img alt="Logo" src="assets/images/logo.png" />
      </a> -->
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button
          [pTooltip]="layoutService.isDarkTheme() ? 'Tema claro' : 'Tema escuro'"
          tooltipPosition="left"
          type="button"
          class="layout-topbar-action"
          (click)="toggleDarkMode()">
          <i
            [ngClass]="{
              'pi ': true,
              'pi-moon text-blue-500': layoutService.isDarkTheme(),
              'pi-sun text-yellow-500': !layoutService.isDarkTheme(),
            }"></i>
        </button>
      </div>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        pStyleClass="@next"
        enterFromClass="hidden"
        enterActiveClass="animate-scalein"
        leaveToClass="hidden"
        leaveActiveClass="animate-fadeout"
        [hideOnOutsideClick]="true">
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <!-- <button type="button" class="layout-topbar-action">
            <i class="pi pi-user"></i>
            <span>Perfil</span>
          </button> -->
          <button
            pTooltip="Sair"
            tooltipPosition="bottom"
            (click)="logoutUserHandler()"
            type="button"
            class="layout-topbar-action">
            <i class="pi pi-sign-out"></i>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  </div>`,
})
export class AppTopbarComponent {
  public items!: MenuItem[];

  public layoutService = inject(LayoutService);

  public authenticationService = inject(AuthenticationService);

  public toggleDarkMode(): void {
    this.layoutService.layoutConfig.update(state => ({ ...state, darkTheme: !state.darkTheme }));
  }

  public logoutUserHandler(): void {
    this.authenticationService.logoutAndRedirect();
  }
}
