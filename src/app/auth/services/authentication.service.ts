/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, signal } from '@angular/core';

import { Router } from '@angular/router';

import { Session } from '@supabase/supabase-js';
import { injectSupabase } from '../../utils/inject-supabase';
import { messages } from '../../utils/messages';
import { iUser } from '../models/user.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public supabase = injectSupabase();

  public currentUser = signal<iUser | null>(null);

  public messageService = inject(MessageService);

  public isLoading = signal(false);

  public messages = messages;

  public session: Session | null = null;

  private router = inject(Router);

  public async loginUserHandler(email: string, password: string): Promise<void> {
    this.isLoading.set(true);

    const { error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Erro',
        detail: messages[error?.code!],
        life: 3000,
      });

      this.isLoading.set(false);

      return;
    }

    this.loadUserData();

    this.isLoading.set(false);

    this.router.navigateByUrl('/modules/dashboard');

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Login realizado com sucesso!',
      life: 3000,
    });
  }

  public async forgotPasswordHandler(email: string): Promise<void> {
    this.isLoading.set(true);

    const { error } = await this.supabase.auth.resetPasswordForEmail(email);

    if (error) {
      alert('Erro: ' + messages[error?.code!]);
      this.isLoading.set(false);

      return;
    }

    this.loadUserData();

    alert('Link de recuperação enviado por e-mail!');

    this.isLoading.set(false);

    this.router.navigateByUrl('/login');
  }

  public async resetPasswordHandler(password: string): Promise<void> {
    this.isLoading.set(true);

    const { error } = await this.supabase.auth.updateUser({ password });

    if (error) {
      alert('Erro: ' + messages[error?.code!]);
      this.isLoading.set(false);

      return;
    }

    this.loadUserData();

    alert('Senha alterada com sucesso!');

    this.isLoading.set(false);

    this.router.navigateByUrl('/login');
  }

  public async loadUserData(): Promise<void> {
    this.isLoading.set(true);

    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError || !session) {
      this.restoreSessionFromStorage();
    }

    this.session = session;

    this.isLoading.set(false);

    if (session?.user.id) {
      const { data, error: userDataError } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', session?.user.id)
        .single();

      if (userDataError) {
        this.isLoading.set(false);
      }

      this.currentUser.set(data as unknown as iUser);
    }
  }

  public restoreSessionFromStorage() {
    this.isLoading.set(true);

    const sessionData = localStorage.getItem('sb-xqsikzksebdtexargilq-auth-token');

    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      this.session = parsedSession?.currentSession || parsedSession?.session || null;
      this.isLoading.set(false);
    }
  }

  public isLoggedCheckHandler(): boolean {
    if (this.session) {
      return true;
    }

    const sessionData = localStorage.getItem('sb-xqsikzksebdtexargilq-auth-token');

    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      this.session = parsedSession?.currentSession || parsedSession?.session || null;

      return this.session !== null;
    }

    return false;
  }

  public async logoutAndRedirect(): Promise<void> {
    this.router.navigate(['/']);
    await this.supabase.auth.signOut();
  }
}
