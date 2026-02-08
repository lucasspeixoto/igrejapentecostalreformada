import { Injectable } from "@angular/core";
import { injectSupabase } from "../shared/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { PastoralCareType } from "../../../domain/models/pastoral-care.model";

export interface IPastoralCareCategoriesService {
  findAll(): Promise<PostgrestSingleResponse<PastoralCareType[]>>;
}

@Injectable({
  providedIn: 'root',
})
export class PastoralCareCategoriesService implements IPastoralCareCategoriesService {

  public supabase = injectSupabase();

  public async findAll(): Promise<PostgrestSingleResponse<PastoralCareType[]>> {
    return await this.supabase.from('pastoral_care_types').select('*').order('name', { ascending: true });
  }
}
