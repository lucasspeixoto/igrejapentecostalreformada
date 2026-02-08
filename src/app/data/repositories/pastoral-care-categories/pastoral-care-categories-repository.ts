import { inject, Injectable, signal } from "@angular/core";
import { PastoralCareCategoriesService } from "../../services/pastoral-care-categories/pastoral-care-categories-service";
import type { IFindAllPastoralCareCategoriesResponse, PastoralCareType } from "../../../domain/models/pastoral-care.model";

@Injectable({
  providedIn: 'root',
})
export class PastoralCareCategoriesRepository {
  private pastoralCareCategoriesService = inject(PastoralCareCategoriesService);

  private _pastoralCareTypes = signal<PastoralCareType[]>([]);
  public pastoralCareTypes = this._pastoralCareTypes.asReadonly();

  public async findAll(): Promise<IFindAllPastoralCareCategoriesResponse> {
    const { data, error } = await this.pastoralCareCategoriesService.findAll();
    if (!error) {
      this._pastoralCareTypes.set(data)
    } else {
      this._pastoralCareTypes.set([])
    };

    return { data, error };
  }
}
