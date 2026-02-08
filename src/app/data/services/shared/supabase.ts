import { inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment.development';


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
      this.supabase = new SupabaseClient(environment.supabaseUrl, environment.supabaseKey, {
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

  public async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}

export const injectSupabase = (): SupabaseClient => {
  const supabaseService = inject(SupabaseService);
  return supabaseService.getClient();
};

