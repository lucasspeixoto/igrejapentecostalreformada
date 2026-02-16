import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserRolesRepository } from '../../../data/repositories/user-roles/user-roles-repository';
import { isTreasuryGuard } from './is-treasury.guard';

describe('isTreasuryGuard', () => {
  const mockNavigateByUrl = vi.fn();
  const mockIsUserAdmin = vi.fn();
  const mockIsUserTreasury = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserRolesRepository,
          useValue: {
            isUserAdmin: mockIsUserAdmin,
            isUserTreasury: mockIsUserTreasury,
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: mockNavigateByUrl,
          },
        },
      ],
    });
  });

  it('should allow access when user is admin', async () => {
    mockIsUserAdmin.mockReturnValue(true);

    const result = await TestBed.runInInjectionContext(() => isTreasuryGuard(null as never, null as never));

    expect(result).toBe(true);
    expect(mockNavigateByUrl).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to /plataforma-ipr/painel when user is not admin', async () => {
    mockIsUserAdmin.mockReturnValue(false);

    const result = await TestBed.runInInjectionContext(() => isTreasuryGuard(null as never, null as never));

    expect(result).toBe(false);
    expect(mockNavigateByUrl).toHaveBeenCalledOnce();
    expect(mockNavigateByUrl).toHaveBeenCalledWith('/plataforma-ipr/painel');
  });

  it('should call isUserAdmin on the repository', async () => {
    mockIsUserAdmin.mockReturnValue(true);

    await TestBed.runInInjectionContext(() => isTreasuryGuard(null as never, null as never));

    expect(mockIsUserAdmin).toHaveBeenCalledOnce();
  });
});
