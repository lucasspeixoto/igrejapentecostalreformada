import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './app/layout/service/layout.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  private layoutService = inject(LayoutService);

  private platformId = inject(PLATFORM_ID);

  public ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.layoutService.startAppConfig();
    }
  }
}
