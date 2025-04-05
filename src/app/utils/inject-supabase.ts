import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

export const injectSupabase = (): SupabaseClient => {
  const supabaseService = inject(SupabaseService);
  return supabaseService.getClient();
};
