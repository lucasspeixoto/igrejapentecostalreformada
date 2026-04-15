import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTopbar } from './topbar';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RouterModule, Router } from '@angular/router';
import { LayoutService } from '../../../data/services/shared/layout';
import { AuthenticationRepository } from '../../../data/repositories/authentication/authentication-repository';
import { UsersRepository } from '../../../data/repositories/users/users-repository';
import { signal } from '@angular/core';

describe('AppTopbar', () => {
  let component: AppTopbar;
  let fixture: ComponentFixture<AppTopbar>;
  let router: Router;

  const mockLayoutService = {
    onMenuToggle: vi.fn(),
    isDarkTheme: vi.fn().mockReturnValue(false),
    layoutConfig: signal({ darkTheme: false }),
  };

  const mockAuthenticationRepository = {
    signOut: vi.fn().mockResolvedValue(undefined),
  };

  const mockUsersRepository = {
    currentUser: vi.fn().mockReturnValue({ avatar_url: 'test.jpg' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTopbar, RouterModule.forRoot([])],
      providers: [
        { provide: LayoutService, useValue: mockLayoutService },
        { provide: AuthenticationRepository, useValue: mockAuthenticationRepository },
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTopbar);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    const updateSpy = vi.spyOn(mockLayoutService.layoutConfig, 'update');
    component.toggleDarkMode();
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should call signOut and navigate to login', async () => {
    await component.signOutUserHandler();
    expect(mockAuthenticationRepository.signOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should toggle menu on click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('.layout-menu-button') as HTMLButtonElement;
    button.click();
    expect(mockLayoutService.onMenuToggle).toHaveBeenCalled();
  });
});
