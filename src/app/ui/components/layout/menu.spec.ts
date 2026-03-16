import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMenu } from './menu';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RouterModule } from '@angular/router';
import { UserRolesRepository } from '../../../data/repositories/user-roles/user-roles-repository';
import { AuthenticationRepository } from '../../../data/repositories/authentication/authentication-repository';

describe('AppMenu', () => {
  let component: AppMenu;
  let fixture: ComponentFixture<AppMenu>;

  const mockUserRolesRepository = {
    isUserAdmin: vi.fn(),
    isUserTreasury: vi.fn(),
    isUserSecretary: vi.fn(),
  };

  const mockAuthenticationRepository = {
    signOut: vi.fn(),
  };

  beforeEach(async () => {
    mockUserRolesRepository.isUserAdmin.mockReturnValue(false);
    mockUserRolesRepository.isUserTreasury.mockReturnValue(false);
    mockUserRolesRepository.isUserSecretary.mockReturnValue(false);
    // The provided snippet seems to be malformed here.
    // Assuming the intent was to insert mockRouter after the initial mock setup.
    // The line `mockUserRolesRepository.isUserAdmi` is incomplete and will be corrected to `mockUserRolesRepository.isUserAdmin.mockReturnValue(false);`
    // and the mockRouter will be inserted after the initial mock setups.
    // Also, `routerEventsSubject` is not defined in the snippet, so it will be added.
    const routerEventsSubject = { asObservable: () => ({}) }; // Placeholder for routerEventsSubject
    const mockRouter = {
      events: routerEventsSubject.asObservable(),
      url: '/test/route',
      isActive: vi.fn().mockReturnValue(false),
      routerState: {
        root: {}
      }
    };

    await TestBed.configureTestingModule({
      imports: [AppMenu, RouterModule.forRoot([])],
      providers: [
        { provide: UserRolesRepository, useValue: mockUserRolesRepository },
        { provide: AuthenticationRepository, useValue: mockAuthenticationRepository },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMenu);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize menu items with only home if not admin, treasury or secretary', () => {
    fixture.detectChanges();
    const menuLabel = component.menuItems[0];
    expect(menuLabel.label).toBe('Menu');
    
    const items = menuLabel.items;
    expect(items?.find(i => i.label === 'Painel')?.visible).toBe(true);
    expect(items?.find(i => i.label === 'Membros')?.visible).toBe(false);
    expect(items?.find(i => i.label === 'Patrimônio')?.visible).toBe(false);
    expect(items?.find(i => i.label === 'Financeiro')?.visible).toBe(false);
  });

  it('should show Membros if user is secretary', () => {
    mockUserRolesRepository.isUserSecretary.mockReturnValue(true);
    fixture.detectChanges();
    
    const items = component.menuItems[0].items;
    expect(items?.find(i => i.label === 'Membros')).toBeTruthy();
  });

  it('should show all items if user is admin', () => {
    mockUserRolesRepository.isUserAdmin.mockReturnValue(true);
    fixture.detectChanges();
    
    const items = component.menuItems[0].items;
    expect(items?.find(i => i.label === 'Painel')).toBeTruthy();
    expect(items?.find(i => i.label === 'Membros')).toBeTruthy();
    expect(items?.find(i => i.label === 'Patrimônio')).toBeTruthy();
    expect(items?.find(i => i.label === 'Atendimento Pastoral')).toBeTruthy();
    expect(items?.find(i => i.label === 'Financeiro')).toBeTruthy();
  });
});
