import { inject, Injectable, signal } from "@angular/core";
import type {
  FinanceReports,
  IDeleteFinanceReportsResponse,
  IFindAllFinanceReportsByDateRangeResponse,
  IUpdateFinanceReportsResponse,
} from "../../../domain/models/finance-reports.model";
import { FinanceReportsService } from "../../services/finance-reports/finance-reports-service";

@Injectable({ providedIn: 'root' })
export class FinanceReportsRepository {
  private financeReportsService = inject(FinanceReportsService);

  private _financeReports = signal<FinanceReports[]>([]);
  public financeReports = this._financeReports.asReadonly();

  public async findAll(): Promise<IFindAllFinanceReportsByDateRangeResponse> {
    const { data, error } = await this.financeReportsService.findAll();

    if (!error && data) {
      this._financeReports.set(data);
    } else {
      this._financeReports.set([]);
    }

    return { data: data ?? null, error };
  }

  public async create(financeReport: FinanceReports): Promise<IUpdateFinanceReportsResponse> {
    const { data, error } = await this.financeReportsService.create(financeReport);
    return { data, error };
  }

  public async update(financeReport: FinanceReports): Promise<IUpdateFinanceReportsResponse> {
    const { data, error } = await this.financeReportsService.update(financeReport);
    return { data, error };
  }

  public async delete(id: string): Promise<IDeleteFinanceReportsResponse> {
    const { error } = await this.financeReportsService.delete(id);
    return { error };
  }
}

