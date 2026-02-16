import { Injectable } from '@angular/core';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { FixedAsset } from '../../../domain/models/fixed-assets.model';
import { injectSupabase } from '../shared/supabase';

export interface IFixedAssetsService {
  findAll(): Promise<PostgrestSingleResponse<FixedAsset[]>>;
  saveFixedAsset(fixedAsset: Partial<FixedAsset>): Promise<PostgrestSingleResponse<null>>;
  updateFixedAsset(fixedAsset: FixedAsset, assetId: number): Promise<PostgrestSingleResponse<null>>;
  deleteFixedAsset(id: number): Promise<PostgrestSingleResponse<null>>;
  deleteFixedAssets(ids: number[]): Promise<PostgrestSingleResponse<null>>;
}

@Injectable({
  providedIn: 'root',
})
export class FixedAssetsService implements IFixedAssetsService {
  public supabase = injectSupabase();

  public async findAll(): Promise<PostgrestSingleResponse<FixedAsset[]>> {
    return await this.supabase.from('fixed_assets').select('*, users(full_name)').order('created_at', { ascending: false });
  }

  public async saveFixedAsset(fixedAsset: Partial<FixedAsset>): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('fixed_assets').insert([fixedAsset]);
  }

  public async updateFixedAsset(fixedAsset: FixedAsset, assetId: number): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase
      .from('fixed_assets')
      .update([
        {
          local: fixedAsset.local,
          type: fixedAsset.type,
          asset: fixedAsset.asset,
          user_id: fixedAsset.user_id,
          updated_at: new Date().toISOString(),
        },
      ])
      .eq('id', assetId);
  }

  public async deleteFixedAsset(id: number): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase.from('fixed_assets').delete().eq('id', id);
  }

  public async deleteFixedAssets(ids: number[]): Promise<PostgrestSingleResponse<null>> {
    return await this.supabase
      .from('fixed_assets')
      .delete()
      .in('id', [...ids]);
  }
}
