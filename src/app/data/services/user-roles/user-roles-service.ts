import { Injectable } from "@angular/core";
import { injectSupabase } from "../shared/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IUserRole } from "../../../domain/models/auth.model";

export interface IUserRolesService {
  getUserRoleData(userId: string): Promise<PostgrestSingleResponse<IUserRole>>;
}

@Injectable({
  providedIn: 'root',
})
export class UserRolesService implements IUserRolesService {

  public supabase = injectSupabase();

  public async getUserRoleData(userId: string): Promise<PostgrestSingleResponse<IUserRole>> {
    return await this.supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
  }
}
