import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import type { MenuItem } from 'primeng/api';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthenticationRepository } from '../../../data/repositories/authentication/authentication-repository';
import { UserRolesRepository } from '../../../data/repositories/user-roles/user-roles-repository';
import { AppMenu } from './menu';

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

  function findItemByLabelPart(labelPart: string): MenuItem | undefined {
    return component.menuItems[0].items?.find((item): boolean => item.label?.includes(labelPart) ?? false);
  }

  beforeEach(async () => {
    mockUserRolesRepository.isUserAdmin.mockReturnValue(false);
    mockUserRolesRepository.isUserTreasury.mockReturnValue(false);
    mockUserRolesRepository.isUserSecretary.mockReturnValue(false);

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

    expect(findItemByLabelPart('Painel')?.visible).toBe(true);
    expect(findItemByLabelPart('Membros')?.visible).toBe(false);
    expect(findItemByLabelPart('Patrim')?.visible).toBe(false);
    expect(findItemByLabelPart('Financeiro')?.visible).toBe(false);
  });

  it('should show Membros if user is secretary', () => {
    mockUserRolesRepository.isUserSecretary.mockReturnValue(true);
    fixture.detectChanges();

    expect(findItemByLabelPart('Membros')).toBeTruthy();
  });

  it('should show all items if user is admin', () => {
    mockUserRolesRepository.isUserAdmin.mockReturnValue(true);
    fixture.detectChanges();

    expect(findItemByLabelPart('Painel')).toBeTruthy();
    expect(findItemByLabelPart('Membros')).toBeTruthy();
    expect(findItemByLabelPart('Patrim')).toBeTruthy();
    expect(findItemByLabelPart('Atendimento Pastoral')).toBeTruthy();
    expect(findItemByLabelPart('Financeiro')).toBeTruthy();
  });
});
