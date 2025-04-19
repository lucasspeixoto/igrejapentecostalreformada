import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase!: SupabaseClient;

  constructor() {
    if (typeof window !== 'undefined') {
      this.supabase = new SupabaseClient(environment.SUPABASE_URL, environment.SUPABASE_KEY, {
        auth: {
          persistSession: true, // Garante que a sessão é salva localmente
          autoRefreshToken: true, // Atualiza o token automaticamente
          detectSessionInUrl: true,
          lock: undefined, // 👈 disables lock usage
        },
      });
    }
  }

  public getClient(): SupabaseClient {
    return this.supabase;
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}
