import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSidebar } from './sidebar';
import { AppMenu } from './menu';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RouterModule } from '@angular/router';
import { UserRolesRepository } from '../../../data/repositories/user-roles/user-roles-repository';
import { AuthenticationRepository } from '../../../data/repositories/authentication/authentication-repository';

describe('AppSidebar', () => {
  let component: AppSidebar;
  let fixture: ComponentFixture<AppSidebar>;

  const mockUserRolesRepository = {
    isUserAdmin: vi.fn().mockReturnValue(false),
    isUserTreasury: vi.fn().mockReturnValue(false),
    isUserSecretary: vi.fn().mockReturnValue(false),
  };

  const mockAuthenticationRepository = {
    // any needed mocks
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebar, AppMenu, RouterModule.forRoot([])],
      providers: [
        { provide: UserRolesRepository, useValue: mockUserRolesRepository },
        { provide: AuthenticationRepository, useValue: mockAuthenticationRepository },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain app-menu', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-menu')).toBeTruthy();
  });
});
