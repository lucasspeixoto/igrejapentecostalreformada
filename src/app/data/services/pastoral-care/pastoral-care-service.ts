import { Injectable } from "@angular/core";
import { injectSupabase } from "../shared/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { PastoralCare } from "../../../domain/models/pastoral-care.model";

export interface IPastoralCareService {
  findAll(): Promise<PostgrestSingleResponse<PastoralCare[]>>;
  insert(pastoralCare: Partial<PastoralCare>): Promise<PostgrestSingleResponse<null>>;
  update(pastoralCare: PastoralCare, id: string): Promise<PostgrestSingleResponse<null>>;
  deletePastoralCare(id: string): Promise<PostgrestSingleResponse<null>>;
  deletePastoralCares(ids: string[]): Promise<PostgrestSingleResponse<null>>
}

@Injectable({
  providedIn: 'root',
})
export class PastoralCareService implements IPastoralCareService {

  public supabase = injectSupabase();

  public async findAll(): Promise<PostgrestSingleResponse<PastoralCare[]>> {
    return await this.supabase.from('pastoral_care')
      .select('*, members(name), pastoral_care_types(name)')
      .order('date', { ascending: false });
  }

  public async insert(pastoralCare: Partial<PastoralCare>): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('pastoral_care').insert([pastoralCare]);
  }

  public async update(pastoralCare: PastoralCare, id: string): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('pastoral_care').update([pastoralCare]).eq('id', id);
  }

  public async deletePastoralCare(id: string): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('pastoral_care').delete().eq('id', id);
  }

  public async deletePastoralCares(ids: string[]): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('pastoral_care').delete().in('id', [...ids]);
  }

  /*




  */
}
