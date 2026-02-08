/* eslint-disable @typescript-eslint/naming-convention */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AuthenticationRepository } from './authentication-repository';
import { AuthenticationService } from '../../services/authentication/authentication-service';
import type { Session } from '@supabase/supabase-js';

describe('AuthenticationRepository', () => {
  let repo: AuthenticationRepository;

  const loginUserHandler = vi.fn();
  const forgotPasswordHandler = vi.fn();
  const resetPasswordHandler = vi.fn();
  const getSession = vi.fn();
  const getUser = vi.fn();
  const signOut = vi.fn();
  const getSessionFromStorage = vi.fn();
  const authChanges = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        AuthenticationRepository,
        {
          provide: AuthenticationService,
          useValue: {
            loginUserHandler,
            forgotPasswordHandler,
            resetPasswordHandler,
            getSession,
            getUser,
            signOut,
            getSessionFromStorage,
            authChanges,
          },
        },
      ],
    });

    repo = TestBed.inject(AuthenticationRepository);
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('isUserLogged should reflect currentSession', () => {
    expect(repo.isUserLogged()).toBe(false);
    repo.currentSession.set({ access_token: 'a' } as Session);
    expect(repo.isUserLogged()).toBe(true);
  });

  it('loginUserHandler should delegate to AuthenticationService', async () => {
    const mockResponse = { data: { user: null, session: null }, error: null };
    loginUserHandler.mockResolvedValue(mockResponse);

    const result = await repo.loginUserHandler('a@b.com', 'pw');

    expect(loginUserHandler).toHaveBeenCalledWith('a@b.com', 'pw');
    expect(result).toBe(mockResponse);
  });

  it('forgotPasswordHandler should delegate to AuthenticationService', async () => {
    const mockResponse = { data: {}, error: null };
    forgotPasswordHandler.mockResolvedValue(mockResponse);

    const result = await repo.forgotPasswordHandler('a@b.com');

    expect(forgotPasswordHandler).toHaveBeenCalledWith('a@b.com');
    expect(result).toBe(mockResponse);
  });

  it('resetPasswordHandler should delegate to AuthenticationService', async () => {
    const mockResponse = { data: { user: null }, error: null };
    resetPasswordHandler.mockResolvedValue(mockResponse);

    const result = await repo.resetPasswordHandler('newpw');

    expect(resetPasswordHandler).toHaveBeenCalledWith('newpw');
    expect(result).toBe(mockResponse);
  });

  it('getSessionFromStorage should set currentSession from service', () => {
    const session = { access_token: 'stored' };
    getSessionFromStorage.mockReturnValue(session);

    repo.getSessionFromStorage();

    expect(getSessionFromStorage).toHaveBeenCalled();
    expect(repo.currentSession()).toBe(session);
  });

  it('getSession should fallback to getSessionFromStorage when error', async () => {
    const stored = { access_token: 'stored' };
    getSession.mockResolvedValue({ data: { session: null }, error: { message: 'x' } });
    getSessionFromStorage.mockReturnValue(stored);

    await repo.getSession();

    expect(getSession).toHaveBeenCalled();
    expect(getSessionFromStorage).toHaveBeenCalled();
    expect(repo.currentSession()).toBe(stored);
  });

  it('getSession should set currentSession when session exists', async () => {
    const session = { access_token: 'live' };
    getSession.mockResolvedValue({ data: { session }, error: null });

    await repo.getSession();

    expect(getSession).toHaveBeenCalled();
    expect(repo.currentSession()).toBe(session);
  });

  it('getUser should set user when no error', async () => {
    const user = { id: '1' };
    getUser.mockResolvedValue({ data: { user }, error: null });

    await repo.getUser();

    expect(getUser).toHaveBeenCalled();
    expect(repo.user()).toBe(user);
  });

  it('signOut should return { error } from AuthenticationService.signOut', async () => {
    signOut.mockResolvedValue({ error: null });

    const result = await repo.signOut();

    expect(signOut).toHaveBeenCalled();
    expect(result).toEqual({ error: null });
  });
});

