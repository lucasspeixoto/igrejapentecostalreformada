import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { isAdminGuard } from './is-admin.guard';
import { AuthenticationService } from '../../services/authentication.service';

describe('isAdminGuard', () => {
  let authService: jasmine.SpyObj<AuthenticationService>;
  let router: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceMock = { isAdminCheckHandler: jasmine.createSpy('authService') };
    const routerMock = { navigateByUrl: jasmine.createSpy('routerSpy') };

    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when user is admin in', () => {
    // Arrange
    authService.isAdminCheckHandler.and.returnValue(true);

    // Act
    const result = TestBed.runInInjectionContext(() => isAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not admin', () => {
    // Arrange
    authService.isAdminCheckHandler.and.returnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => isAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/inicio/painel');
  });
});
