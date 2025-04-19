import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { isLoggedGuard } from './is-logged.guard';
import { AuthenticationService } from '../../services/authentication.service';

describe('isLoggedGuard', () => {
  let authService: jasmine.SpyObj<AuthenticationService>;
  let router: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceMock = {
      isLoggedCheckHandler: jasmine.createSpy('isLoggedCheckHandlerSpy'),
      loadUserData: jasmine.createSpy('loadUserDataFunc').and.returnValue(() => Promise.resolve()),
    };
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

  it('should allow access when user is logged in', async () => {
    // Arrange
    authService.loadUserData.and.returnValue(Promise.resolve());
    authService.isLoggedCheckHandler.and.returnValue(true);

    // Act
    const result = await TestBed.runInInjectionContext(async () =>
      isLoggedGuard(mockRoute, mockState)
    );

    // Assert
    expect(result).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not logged in', async () => {
    // Arrange
    authService.loadUserData.and.returnValue(Promise.resolve());
    authService.isLoggedCheckHandler.and.returnValue(false);

    // Act
    const result = await TestBed.runInInjectionContext(async () =>
      isLoggedGuard(mockRoute, mockState)
    );

    // Assert
    expect(result).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
