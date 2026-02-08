/* eslint-disable @typescript-eslint/naming-convention */
import type { PostgrestError } from "@supabase/supabase-js";
import type { ISupabaseResponse } from "./supabase.model";

export interface PastoralCareType {
  id: number;
  created_at: string;
  name: string;
  description: string;
}

export interface PastoralCare {
  id?: string;
  created_at: string;
  type_id: number;
  date: string;
  member_id: number;
  pastor: string;
  description: string | null;
  members?: { name: string };
  pastoral_care_types?: { name: string };
}

export type IFindAllPastoralCareCategoriesResponse = ISupabaseResponse<PastoralCareType[]>
export type IFindAllPastoralCareResponse = ISupabaseResponse<PastoralCare[]>
export type IUpdatePastoralCareResponse = ISupabaseResponse<PastoralCare>
export interface IDeletePastoralCareResponse { error: PostgrestError | null; }
