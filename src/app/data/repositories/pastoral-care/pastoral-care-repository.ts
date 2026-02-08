import { computed, inject, Injectable, signal } from "@angular/core";
import { PastoralCareService } from "../../services/pastoral-care/pastoral-care-service";
import type { IDeletePastoralCareResponse, IFindAllPastoralCareResponse, IUpdatePastoralCareResponse, PastoralCare } from "../../../domain/models/pastoral-care.model";

@Injectable({
  providedIn: 'root',
})
export class PastoralCareRepository {
  private pastoralCareService = inject(PastoralCareService);

  private _pastoralCare = signal<PastoralCare[]>([]);
  public pastoralCare = this._pastoralCare.asReadonly();

  public totalOfPastoralCare = computed(() => this.pastoralCare().length);

  public async findAll(): Promise<IFindAllPastoralCareResponse> {
    const { data, error } = await this.pastoralCareService.findAll();
    if (!error) {
      this._pastoralCare.set(data)
    } else {
      this._pastoralCare.set([])
    };

    return { data, error };
  }

  public async insert(pastoralCare: Partial<PastoralCare>): Promise<IUpdatePastoralCareResponse> {
    const { data, error } = await this.pastoralCareService.insert(pastoralCare);
    return { data, error };
  }

  public async update(pastoralCare: PastoralCare, id: string): Promise<IUpdatePastoralCareResponse> {
    const { data, error } = await this.pastoralCareService.update(pastoralCare, id);
    return { data, error };
  }

  public async deletePastoralCare(id: string): Promise<IDeletePastoralCareResponse> {
    const { error } = await this.pastoralCareService.deletePastoralCare(id);
    return { error };
  }

  public async deletePastoralCares(ids: string[]): Promise<IDeletePastoralCareResponse> {
    const { error } = await this.pastoralCareService.deletePastoralCares(ids);
    return { error };
  }
}
