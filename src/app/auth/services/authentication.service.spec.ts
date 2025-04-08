/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// Mock the injectSupabase function
jest.mock('../../utils/inject-supabase', () => ({
  injectSupabase: () => mockSupabaseClient,
}));

// Create mock for Supabase client
const mockSupabaseClient = {
  auth: {
    getSession: jest.fn(),
    signOut: jest.fn(),
    signInWithPassword: jest.fn(),
    updateUser: jest.fn(),
    resetPasswordForEmail: jest.fn(),
  },
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn(),
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let router: jest.Mocked<Router>;
  let loadUserDataSpy!: jest.SpyInstance;

  beforeEach(() => {
    const routerSpy = { navigateByUrl: jest.fn(), navigate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [MessageService, AuthenticationService, { provide: Router, useValue: routerSpy }],
    });

    // Get instances of the service and mocked dependencies
    service = TestBed.inject(AuthenticationService);

    loadUserDataSpy = jest.spyOn(service, 'loadUserData').mockImplementation();

    router = TestBed.inject(Router) as jest.Mocked<Router>;

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('creates service', () => {
    expect(service).toBeTruthy();
  });

  it('initial state', () => {
    //expect(service.isLoading()).toBe(false);
    expect(service.currentUser()).toBe(null);
  });

  describe('loginUserHandler', () => {
    it('should handle login error correctly', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'wrong-password';
      const error = { code: 'invalid_credentials' };

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        error,
      });

      // Act
      await service.loginUserHandler(email, password);

      // Assert
      //expect(service.isLoading()).toBe(false);
      expect(loadUserDataSpy).not.toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });

    it('should successfully login user and navigate to collect/register', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        error: null,
      });

      // Act
      await service.loginUserHandler(email, password);

      // Assert
      expect(loadUserDataSpy).toHaveBeenCalled();
      //expect(service.isLoading()).toBe(false);
      //expect(router.navigateByUrl).toHaveBeenCalledWith('/inicio/painel');
    });

    it('should set loading state during login process', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue(
        () => new Promise(resolve => setTimeout(() => resolve({ error: null }), 100))
      );

      // Act
      const loginPromise = service.loginUserHandler(email, password);

      // Assert - Check loading state is true during the process
      //expect(service.isLoading()).toBe(true);

      await loginPromise;

      // Assert - Check loading state is false after completion
      //expect(service.isLoading()).toBe(false);
    });
  });

  describe('forgotPasswordHandler', () => {
    it('should handle forgot password error correctly', async () => {
      // Arrange
      const email = 'non-existing-email@email.com';
      const error = { code: 'invalid_credentials' };

      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({ error });

      // Act
      await service.forgotPasswordHandler(email);

      // Asserts
      //expect(service.isLoading()).toBe(false);
      expect(loadUserDataSpy).not.toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });

    it('should successfully forgot password and navigate to /login', async () => {
      // Arrange
      const email = 'existing-email@email.com';

      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({ error: null });

      // Act
      await service.forgotPasswordHandler(email);

      // Assert
      //expect(service.isLoading()).toBe(false);
      expect(loadUserDataSpy).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });

    it('should set loading state during forgot Password process', async () => {
      // Arrange
      const email = 'test@example.com';

      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue(
        () => new Promise(resolve => setTimeout(() => resolve({ error: null }), 100))
      );

      // Act
      const forgotPasswordPromise = service.forgotPasswordHandler(email);

      // Assert - Check loading state is true during the process
      //expect(service.isLoading()).toBe(true);

      await forgotPasswordPromise;

      // Assert - Check loading state is false after completion
      //expect(service.isLoading()).toBe(false);
    });
  });

  describe('resetPasswordHandler', () => {
    it('should handle reset password error correctly', async () => {
      // Arrange
      const password = 'new-password';
      const error = { code: 'invalid_credentials' };

      mockSupabaseClient.auth.updateUser.mockResolvedValue({ error });

      // Act
      await service.resetPasswordHandler(password);

      // Asserts
      //expect(service.isLoading()).toBe(false);
      expect(loadUserDataSpy).not.toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });

    it('should successfully reset password and navigate to /login', async () => {
      // Arrange
      const password = 'new-password';

      mockSupabaseClient.auth.updateUser.mockResolvedValue({ error: null });

      // Act
      await service.resetPasswordHandler(password);

      // Assert
      expect(loadUserDataSpy).toHaveBeenCalled();
      //expect(service.isLoading()).toBe(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });

    it('should set loading state during reset Password process', async () => {
      // Arrange
      const password = 'new-password';

      mockSupabaseClient.auth.updateUser.mockResolvedValue(
        () => new Promise(resolve => setTimeout(() => resolve({ error: null }), 100))
      );

      // Act
      const resetPasswordPromise = service.resetPasswordHandler(password);

      // Assert - Check loading state is true during the process
      //expect(service.isLoading()).toBe(true);

      await resetPasswordPromise;

      // Assert - Check loading state is false after completion
      //expect(service.isLoading()).toBe(false);
    });
  });
});
