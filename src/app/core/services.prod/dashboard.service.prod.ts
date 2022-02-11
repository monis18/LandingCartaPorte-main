import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IChartData } from '@interfaces/chart-data.interface';
import { InvoiceTotalsByStatus } from '@interfaces/invoice-totals-by-status.interface';
import { MovementsFilters } from '@interfaces/movements-filters.interface';
import { InvoiceWrapper } from '@models/invoice/invoice-wrapper';
import { HttpUtilsService } from '@utils';
import { Observable } from 'rxjs';

const DASHBOARD_API_URL = 'api/dashboard';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService
  ) { }

  getInvoiceChart(data: {
    esIngreso: boolean,
    status: number,
    wrappers: InvoiceWrapper[],
    tiposDeComprobante: string[],
    filters: MovementsFilters
  }): Observable<IChartData[]> {
    const url = `${environment.movementsEndpoint}/${DASHBOARD_API_URL}/invoices`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(data));
    return this.http.get<IChartData[]>(url + queryString);
  }

  getProfitChartData(
    wrappers: InvoiceWrapper[],
    tiposDeComprobante: string[] = [],
    filters: MovementsFilters
  ): Observable<IChartData[]> {
    const url = `${environment.movementsEndpoint}/${DASHBOARD_API_URL}/profit`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify({ wrappers, tiposDeComprobante, filters }));
    return this.http.get<IChartData[]>(url + queryString);
  }

  getInvoiceCounterData(
    wrappers: InvoiceWrapper[],
    tiposDeComprobante: string[] = [],
    filters: MovementsFilters
  ): Observable<InvoiceTotalsByStatus[]> {
    const url = `${environment.movementsEndpoint}/${DASHBOARD_API_URL}/counter`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify({ wrappers, tiposDeComprobante, filters }));
    return this.http.get<InvoiceTotalsByStatus[]>(url + queryString);
  }
}
