import { computed, inject, Injectable, signal } from '@angular/core';
import type {
  FixedAsset,
  IDeleteFixedAssetResponse,
  IFindAllFixedAssetsResponse,
  IUpdatedFixedAssetResponse,
} from '../../../domain/models/fixed-assets.model';
import { FixedAssetsService } from '../../services/fixed-assets/fixed-assets-service';

@Injectable({
  providedIn: 'root',
})
export class FixedAssetsRepository {
  private fixedAssetsService = inject(FixedAssetsService);

  private _fixedAssets = signal<FixedAsset[]>([]);
  public fixedAssets = this._fixedAssets.asReadonly();

  public totalOfFixedAssets = computed(() => this.fixedAssets().length);

  public async findAll(): Promise<IFindAllFixedAssetsResponse> {
    const { data, error } = await this.fixedAssetsService.findAll();
    if (!error && data) {
      this._fixedAssets.set(data);
    } else {
      this._fixedAssets.set([]);
    }

    return { data: data ?? null, error };
  }

  public async saveFixedAsset(fixedAsset: Partial<FixedAsset>): Promise<IUpdatedFixedAssetResponse> {
    const { data, error } = await this.fixedAssetsService.saveFixedAsset(fixedAsset);
    return { data, error };
  }

  public async updateFixedAsset(fixedAsset: FixedAsset, assetId: number): Promise<IUpdatedFixedAssetResponse> {
    const { data, error } = await this.fixedAssetsService.updateFixedAsset(fixedAsset, assetId);
    return { data, error };
  }

  public async deleteFixedAsset(id: number): Promise<IDeleteFixedAssetResponse> {
    const { error } = await this.fixedAssetsService.deleteFixedAsset(id);
    return { error };
  }

  public async deleteFixedAssets(ids: number[]): Promise<IDeleteFixedAssetResponse> {
    const { error } = await this.fixedAssetsService.deleteFixedAssets(ids);
    return { error };
  }
}
