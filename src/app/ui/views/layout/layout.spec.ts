import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLayoutComponent } from './layout';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LayoutService } from '../../../data/services/shared/layout';
import { signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppTopbar } from '../../components/layout/topbar';
import { AppSidebar } from '../../components/layout/sidebar';
import { AppFooter } from '../../components/layout/footer';
import { UserRolesRepository } from '../../../data/repositories/user-roles/user-roles-repository';
import { AuthenticationRepository } from '../../../data/repositories/authentication/authentication-repository';
import { UsersRepository } from '../../../data/repositories/users/users-repository';

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  const mockLayoutService = {
    layoutConfig: signal({
      ripple: true,
      inputStyle: 'outlined',
      menuMode: 'static',
      colorScheme: 'light',
      theme: 'aura-light-blue',
      darkTheme: false,
    }),
    layoutState: signal({
      staticMenuDesktopInactive: false,
      overlayMenuActive: false,
      profileSidebarVisible: false,
      configSidebarVisible: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }),
    isDarkTheme: vi.fn().mockReturnValue(false),
    overlayOpen$: new Subject<void>().asObservable(),
  };

  const mockUserRolesRepository = {
    isUserAdmin: vi.fn().mockReturnValue(true),
    isUserTreasury: vi.fn().mockReturnValue(false),
    isUserSecretary: vi.fn().mockReturnValue(false),
  };

  const mockAuthenticationRepository = {
    signOut: vi.fn(),
  };

  const mockUsersRepository = {
    currentUser: signal(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLayoutComponent, RouterModule.forRoot([]), NoopAnimationsModule, AppTopbar, AppSidebar, AppFooter],
      providers: [
        { provide: LayoutService, useValue: mockLayoutService },
        { provide: UserRolesRepository, useValue: mockUserRolesRepository },
        { provide: AuthenticationRepository, useValue: mockAuthenticationRepository },
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute container classes correctly', () => {
    const classes = component.containerClass as Record<string, boolean>;
    expect(classes['layout-static']).toBe(true);
    expect(classes['layout-static-inactive']).toBe(false);
  });

  it('should render topbar, sidebar and footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-topbar')).toBeTruthy();
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
