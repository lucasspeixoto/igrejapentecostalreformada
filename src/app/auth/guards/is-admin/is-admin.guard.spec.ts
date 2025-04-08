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
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceMock = { isAdminCheckHandler: jest.fn() };

    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [Router, { provide: AuthenticationService, useValue: authServiceMock }],
    });

    authService = TestBed.inject(AuthenticationService) as jest.Mocked<AuthenticationService>;
  });

  it('should allow access when user is admin in', () => {
    // Arrange
    authService.isAdminCheckHandler.mockReturnValue(Promise.resolve(true));

    // Act
    const result = TestBed.runInInjectionContext(() => isAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBe(true);
  });

  it('should redirect to login when user is not logged in', () => {
    // Arrange
    authService.isAdminCheckHandler.mockReturnValue(Promise.resolve(false));

    // Act
    const result = TestBed.runInInjectionContext(() => isAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBe(false);
  });
});
