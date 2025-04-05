import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './app/layout/service/layout.service';
import { isPlatformBrowser } from '@angular/common';
import { LoadingComponent } from './app/pages/loading/loading.component';
import { LoadingService } from './app/services/loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LoadingComponent],
  template: `<router-outlet></router-outlet>
    <app-loading [isLoading]="loadingService.isLoading()" />`,
})
export class AppComponent implements OnInit {
  public layoutService = inject(LayoutService);

  public loadingService = inject(LoadingService);

  private platformId = inject(PLATFORM_ID);

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.layoutService.startAppConfig();
    }
  }
}
