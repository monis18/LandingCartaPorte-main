import { Injectable } from '@angular/core';
import { IChartData } from '@interfaces/chart-data.interface';
import { InvoiceTotalsByStatus } from '@interfaces/invoice-totals-by-status.interface';
import * as RandExp from 'randexp';
import { Observable, of } from 'rxjs';
import { MovementsFilters } from '../interfaces/movements-filters.interface';
import { InvoiceWrapper } from '../models/invoice/invoice-wrapper';

@Injectable()
export class DashboardService {

  constructor() { }

  private getRandom = () => Number(new RandExp(/[0-9]{1,3}/).gen());

  getInvoiceChart({ esIngreso, status, wrappers, tiposDeComprobante, filters }: {
    esIngreso: boolean,
    status: number,
    wrappers: InvoiceWrapper[],
    tiposDeComprobante: string[],
    filters: MovementsFilters
  }): Observable<IChartData[]> {

    const randoms = [this.getRandom(), this.getRandom(), this.getRandom(), this.getRandom()].sort(((n1, n2) => n1 - n2));
    const total = randoms.reduce((a, b) => a + b, 0);
    const cliente1 = randoms.pop();
    const cliente2 = randoms.pop();
    const cliente3 = randoms.pop();
    const otros = randoms.pop();

    return of([
      {
        label: 'Cliente 1',
        data: [cliente1, total - cliente1],
      },
      {
        label: 'Cliente 2',
        data: [cliente2, total - cliente2],
      },
      {
        label: 'Cliente 3',
        data: [cliente3, total - cliente3],
      },
      {
        label: 'Otros',
        data: [otros, total - otros],
      }
    ]);
  }

  getProfitChartData(
    wrappers: InvoiceWrapper[],
    tiposDeComprobante: string[] = [],
    filters: MovementsFilters
  ): Observable<IChartData[]> {
    return of([
      {
        label: 'Cobrado',
        data: wrappers.map(() => this.getRandom()),
      },
      {
        label: 'Por cobrar',
        data: wrappers.map(() => this.getRandom()),
      },
      {
        label: 'Pagado',
        data: wrappers.map(() => this.getRandom()),
      },
      {
        label: 'Por pagar',
        data: wrappers.map(() => this.getRandom()),
      }
    ]);
  }

  getInvoiceCounterData(
    wrappers: InvoiceWrapper[],
    tiposDeComprobante: string[] = [],
    filters: MovementsFilters
  ): Observable<InvoiceTotalsByStatus[]> {
    return of(wrappers.map(() => {
      return {
        Status: {
          0: { I: this.getRandom(), E: this.getRandom() },
          1: { I: this.getRandom(), E: this.getRandom() },
        }
      };
    }));
  }
}
