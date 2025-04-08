import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { isAdminGuard } from './is-admin.guard';
import { AuthenticationService } from '../../services/authentication.service';

/*
TestBed.runInInjectionContext:
  In Angular, dependency injection (DI) requires a proper injection context to work.
  When testing standalone functions (like guards, pipes, or other injectable services),
  we need this context to properly resolve dependencies.
  Without it, any inject() calls inside your code would fail because there's no active injection context
*/

describe('isAdminGuard', () => {
  let authService: jest.Mocked<AuthenticationService>;
  let router: jest.Mocked<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceMock = { isAdminCheckHandler: jest.fn() };
    const routerMock = { navigateByUrl: jest.fn() };

    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    authService = TestBed.inject(AuthenticationService) as jest.Mocked<AuthenticationService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should allow access when user is admin in', () => {
    // Arrange
    authService.isAdminCheckHandler.mockReturnValue(true);

    // Act
    const result = TestBed.runInInjectionContext(() => isAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not admin', () => {
    // Arrange
    authService.isAdminCheckHandler.mockReturnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => isAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/inicio/painel');
  });
});
