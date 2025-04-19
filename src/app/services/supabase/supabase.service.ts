import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private static instance: SupabaseService;
  public supabase!: SupabaseClient;

  constructor() {
    if (SupabaseService.instance) {
      return SupabaseService.instance;
    }

    if (typeof window !== 'undefined' && !this.supabase) {
      this.supabase = new SupabaseClient(environment.SUPABASE_URL, environment.SUPABASE_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    }

    SupabaseService.instance = this;
  }

  public getClient(): SupabaseClient {
    return this.supabase;
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}
