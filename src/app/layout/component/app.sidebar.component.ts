import { Component } from '@angular/core';
import { AppMenuComponent } from './app.menu.component';

@Component({
  selector: 'app-sidebar',
  imports: [AppMenuComponent],
  template: ` <div class="layout-sidebar">
    <app-menu></app-menu>
  </div>`,
})
export class AppSidebarComponent {}
