import { Session, User, type UserResponse } from '@supabase/supabase-js';
import type { ILoginResponse, ILogoutResponse, IResetPasswordResponse } from '../../../domain/models/auth.model';
import { computed, inject, Injectable, signal } from "@angular/core";
import { AuthenticationService } from '../../services/authentication/authentication-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationRepository {
  private authenticationService = inject(AuthenticationService);

  public currentSession = signal<Session | null>(null);

  public user = signal<User | null>(null);

  public isUserLogged = computed(() => {
    return !!this.currentSession();
  })

  public async loginUserHandler(email: string, password: string): Promise<ILoginResponse> {
    return await this.authenticationService.loginUserHandler(email, password);
  }

  public async forgotPasswordHandler(email: string): Promise<IResetPasswordResponse> {
    return await this.authenticationService.forgotPasswordHandler(email);
  }

  public async resetPasswordHandler(password: string): Promise<UserResponse> {
    return await this.authenticationService.resetPasswordHandler(password);
  }

  public getSessionFromStorage(): void {
    const session = this.authenticationService.getSessionFromStorage();
    this.currentSession.set(session);
  }

  public async getSession(): Promise<void> {
    const { data, error } = await this.authenticationService.getSession();

    if (error || !data || !data?.session) {
      this.getSessionFromStorage()
    } else {
      this.currentSession.set(data.session);
    }
  }

  public async getUser(): Promise<void> {
    const { data, error } = await this.authenticationService.getUser();
    if (!error) this.user.set(data.user);
  }

  public async signOut(): Promise<ILogoutResponse> {
    const { error } = await this.authenticationService.signOut();

    return { error }
  }
}
