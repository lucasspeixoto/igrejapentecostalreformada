import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import type { AuthChangeEvent, AuthTokenResponsePassword, Session, UserResponse } from "@supabase/supabase-js";
import type { AuthChangesResponse, ILogoutResponse, IResetPasswordResponse, IUserSessionResponse } from "../../../domain/models/auth.model";
import { injectSupabase } from "../shared/supabase";

export interface IAuthenticationService {
  loginUserHandler(email: string, password: string): Promise<AuthTokenResponsePassword>;
  forgotPasswordHandler(email: string): Promise<IResetPasswordResponse>;
  resetPasswordHandler(password: string): Promise<UserResponse>;
  getSession(): Promise<IUserSessionResponse>;
  signOut(): Promise<ILogoutResponse>;
  getSessionFromStorage(): Session | null;
  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): AuthChangesResponse
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements IAuthenticationService {

  public supabase = injectSupabase();

  public async loginUserHandler(email: string, password: string): Promise<AuthTokenResponsePassword> {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  public async forgotPasswordHandler(email: string): Promise<IResetPasswordResponse> {
    return await this.supabase.auth.resetPasswordForEmail(email);
  }

  public async resetPasswordHandler(password: string): Promise<UserResponse> {
    return await this.supabase.auth.updateUser({ password });
  }

  public async getSession(): Promise<IUserSessionResponse> {
    return await this.supabase.auth.getSession();
  }

  public async getUser(): Promise<UserResponse> {
    return await this.supabase.auth.getUser()
  }

  public async signOut(): Promise<ILogoutResponse> {
    return await this.supabase.auth.signOut();
  }

  public getSessionFromStorage(): Session | null {
    let session: Session | null = null;
    try {
      const url = new URL(environment.supabaseUrl);
      const projectId = url.hostname.split('.')[0];
      const sessionData = localStorage.getItem(`sb-${projectId}-auth-token`);

      if (sessionData) {
        const parsedSession = JSON.parse(sessionData);
        session = parsedSession?.currentSession || parsedSession?.session || null;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse session from storage', JSON.stringify(error));
    }

    return session;
  }

  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): AuthChangesResponse {
    return this.supabase.auth.onAuthStateChange(callback)
  }
}
