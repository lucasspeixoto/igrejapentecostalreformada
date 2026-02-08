import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { LayoutService } from './data/services/shared/layout';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoadingService } from './data/services/shared/loading/loading';
import { Loading } from './ui/components/shared/loading/loading';
import { AuthenticationRepository } from './data/repositories/authentication/authentication-repository';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Loading, ToastModule],
  template: `<div>
    <p-toast class="hidden md:block" position="top-right" />
    <p-toast class="md:hidden block" position="top-center" />
    <router-outlet />
    <app-loading [isLoading]="loadingService.isLoading()" />
  </div>`,
})
export class App implements OnInit {
  public layoutService = inject(LayoutService);

  public loadingService = inject(LoadingService);

  public authenticationRepository = inject(AuthenticationRepository);

  private platformId = inject(PLATFORM_ID);

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.layoutService.startAppConfig();
      this.layoutService.setInitialStorageTheme();
    }
  }
}
