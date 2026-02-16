/* eslint-disable @typescript-eslint/naming-convention */
import type { PostgrestError } from '@supabase/supabase-js';
import type { ISupabaseResponse } from './supabase.model';

export interface FixedAsset {
  id: number;
  created_at: string;
  updated_at: string | null;
  local: string;
  type: string;
  asset: string;
  user_id: number;
  users?: {
    full_name: string;
  };
}

export type IFindAllFixedAssetsResponse = ISupabaseResponse<FixedAsset[]>;

export type IUpdatedFixedAssetResponse = ISupabaseResponse<FixedAsset>;

export interface IDeleteFixedAssetResponse {
  error: PostgrestError | null;
}
