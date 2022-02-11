import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { InvoiceCatTipoDeComprobante } from '@enums/catalogues/invoice-cat-tipo-de-comprobante.enum';
import { InvoiceStatus } from '@enums/invoice-status.enum';
import { InvoiceWrapperTotals } from '@interfaces/invoice-wrapper-totals.interface';
import { MovementsFilters } from '@interfaces/movements-filters.interface';
import { InvoiceWrapper } from '@models/invoice/invoice-wrapper';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { HttpUtilsService } from '@utils';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

const API_INVOICES_URL = 'api/invoices';
// Real REST API
@Injectable()
export class MovementsService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService
  ) { }

  getAllInvoices(): Observable<InvoiceModel[]> {
    return this.http.get<InvoiceModel[]>(API_INVOICES_URL);
  }

  getInvoiceById(invoiceId: number): Observable<InvoiceModel> {
    return this.http.get<InvoiceModel>(API_INVOICES_URL + `/${invoiceId}`);
  }

  // Server should return filtered/sorted result
  findInvoices(queryParams: QueryParamsModel, wrapperId: string, filters: MovementsFilters): Observable<QueryResultsModel> {
    const firstDayOfMonth = (y: number, m: number): Date => {
      return new Date(y, m, 1);
    };

    const lastDayOfMonth = (y: number, m: number): Date => {
      return new Date(y, m + 1, 0);
    };

    const year = Number(wrapperId.substr(0, 4));
    const month = Number(wrapperId.substr(5, 7)) - 1;
    const tiposDeComprobante = (queryParams.filter.TiposDeComprobante as string[]);

    return this.getAllInvoices().pipe(
      mergeMap(res => {

        const dateRange = {
          from: !isNaN(year) && !isNaN(month) && firstDayOfMonth(year, month),
          to: !isNaN(year) && !isNaN(month) && lastDayOfMonth(year, month),
        };

        let entitiesResult = res
          .filter(i => {
            const iDate = new Date(new Date(i.Fecha).toUTCString());
            return !dateRange.from || !dateRange.to || (iDate >= dateRange.from && iDate <= dateRange.to);
          })
          .filter(i => !!i.UUID)
          .filter(i => !tiposDeComprobante.includes(InvoiceCatTipoDeComprobante.Ingreso) ? !i.EsIngreso : true)
          .filter(i => !tiposDeComprobante.includes(InvoiceCatTipoDeComprobante.Egreso) ? i.EsIngreso : true)
          .filter(i => (
            tiposDeComprobante.includes(InvoiceCatTipoDeComprobante.Pago) && i.TipoDeComprobante === InvoiceCatTipoDeComprobante.Pago
            || tiposDeComprobante.includes(InvoiceCatTipoDeComprobante.Nómina) && i.TipoDeComprobante === InvoiceCatTipoDeComprobante.Nómina
            || i.TipoDeComprobante === InvoiceCatTipoDeComprobante.Ingreso
            || i.TipoDeComprobante === InvoiceCatTipoDeComprobante.Egreso
          ))
          .filter(i => {
            const filterClients = filters.senderClientsRfcs.length > 0;
            const filterProviders = filters.senderProvidersRfcs.length > 0;
            if (!filterClients && !filterClients) {
              return true;
            } else if (filterClients && filterClients) {
              return filters.senderClientsRfcs.includes(i.Receptor.Rfc) || filters.senderProvidersRfcs.includes(i.Emisor.Rfc);
            } else {
              const validIngreso = filterClients ? filters.senderClientsRfcs.includes(i.Receptor.Rfc) : true;
              const validEgreso = filterProviders ? filters.senderProvidersRfcs.includes(i.Emisor.Rfc) : true;
              return validIngreso && validEgreso;
            }
          })
          ;

        entitiesResult = this.httpUtils.sortArray(entitiesResult, queryParams.sortField, queryParams.sortOrder);
        const totalCount = entitiesResult.length;
        const initialPos = queryParams.pageNumber * queryParams.pageSize;
        entitiesResult = entitiesResult.slice(initialPos, initialPos + queryParams.pageSize);

        const queryResults = new QueryResultsModel();
        queryResults.items = entitiesResult;
        queryResults.totalCount = totalCount;
        return of(queryResults);
      })
    );
  }

  findInvoiceDrafts(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    return this.getAllInvoices().pipe(
      mergeMap(res => {
        let entitiesResult = res.filter(i => !i.UUID);

        entitiesResult = this.httpUtils.sortArray(entitiesResult, queryParams.sortField, queryParams.sortOrder);
        const totalCount = entitiesResult.length;
        const initialPos = queryParams.pageNumber * queryParams.pageSize;
        entitiesResult = entitiesResult.slice(initialPos, initialPos + queryParams.pageSize);

        const queryResults = new QueryResultsModel();
        queryResults.items = entitiesResult;
        queryResults.totalCount = totalCount;
        return of(queryResults);
      })
    );
  }

  getTotalsInRange(
    wrappers: InvoiceWrapper[],
    tiposDeComprobante: string[] = [],
    filters: MovementsFilters
  ): Observable<InvoiceWrapperTotals> {

    const roundNumber = (num: number): number => {
      return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    return this.getAllInvoices().pipe(
      mergeMap(res => {

        const totals: InvoiceWrapperTotals = {};

        wrappers.map(w => {
          return totals[w.id] = {
            Status: {
              0: {
                I: 0,
                E: 0,
              },
              1: {
                I: 0,
                E: 0,
              }
            }
          };
        });

        let entitiesResult = res
          .filter(i => !!i.UUID)
          .filter(i => !tiposDeComprobante.includes(InvoiceCatTipoDeComprobante.Ingreso) ? !i.EsIngreso : true)
          .filter(i => !tiposDeComprobante.includes(InvoiceCatTipoDeComprobante.Egreso) ? i.EsIngreso : true)
          .filter(i => (
            tiposDeComprobante.includes(InvoiceCatTipoDeComprobante.Pago) && i.TipoDeComprobante === InvoiceCatTipoDeComprobante.Pago
            || tiposDeComprobante.includes(InvoiceCatTipoDeComprobante.Nómina) && i.TipoDeComprobante === InvoiceCatTipoDeComprobante.Nómina
            || i.TipoDeComprobante === InvoiceCatTipoDeComprobante.Ingreso
            || i.TipoDeComprobante === InvoiceCatTipoDeComprobante.Egreso
          ))
          .filter(i => {
            const filterClients = filters.senderClientsRfcs.length > 0;
            const filterProviders = filters.senderProvidersRfcs.length > 0;
            if (!filterClients && !filterClients) {
              return true;
            } else if (filterClients && filterClients) {
              return filters.senderClientsRfcs.includes(i.Receptor.Rfc) || filters.senderProvidersRfcs.includes(i.Emisor.Rfc);
            } else {
              const validIngreso = filterClients ? filters.senderClientsRfcs.includes(i.Receptor.Rfc) : true;
              const validEgreso = filterProviders ? filters.senderProvidersRfcs.includes(i.Emisor.Rfc) : true;
              return validIngreso && validEgreso;
            }
          })
          ;

        entitiesResult = this.httpUtils.sortArray(entitiesResult, 'Fecha', 'asc');
        entitiesResult.map(i => {
          const invoiceWrapperId = String(i.Fecha).substr(0, 7);

          if (totals[invoiceWrapperId] === undefined) {
            return;
          }

          if (i.Status === InvoiceStatus['Sin Cobrar'] || i.Status === InvoiceStatus['Sin Pagar']) {

            if (i.EsIngreso) {
              totals[invoiceWrapperId].Status[InvoiceStatus['Sin Cobrar']].I += roundNumber(i.Total);
            } else {
              totals[invoiceWrapperId].Status[InvoiceStatus['Sin Pagar']].E += roundNumber(i.Total);
            }

          } else {

            if (i.EsIngreso) {
              totals[invoiceWrapperId].Status[InvoiceStatus.Cobrado].I += roundNumber(i.Total);
            } else {
              totals[invoiceWrapperId].Status[InvoiceStatus.Pagado].E += roundNumber(i.Total);
            }

          }

        });

        // round totals
        wrappers.map(w => {
          totals[w.id].Status[InvoiceStatus['Sin Pagar']].E = roundNumber(totals[w.id].Status[InvoiceStatus['Sin Pagar']].E);
          totals[w.id].Status[InvoiceStatus['Sin Cobrar']].I = roundNumber(totals[w.id].Status[InvoiceStatus['Sin Cobrar']].I);
          totals[w.id].Status[InvoiceStatus.Pagado].E = roundNumber(totals[w.id].Status[InvoiceStatus.Pagado].E);
          totals[w.id].Status[InvoiceStatus.Cobrado].I = roundNumber(totals[w.id].Status[InvoiceStatus.Cobrado].I);
        });

        return of(totals);
      })
    );
  }

  // DELETE => delete the product from the server
  deleteInvoice(invoiceId: number): Observable<InvoiceModel> {
    const url = `${API_INVOICES_URL}/${invoiceId}`;
    return this.http.delete<InvoiceModel>(url);
  }

  deleteInvoices(ids: number[] = []): Observable<any> {
    const tasks$ = [];
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.deleteInvoice(ids[i]));
    }
    return forkJoin(tasks$);
  }

  cancelInvoice(id: number) {
    return this.getInvoiceById(id).pipe(
      switchMap(invoice => {
        invoice.Status = InvoiceStatus.Cancelada;
        // const url = `${API_INVOICES_URL}/${invoiceId}/cancel`;
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.put<InvoiceModel>(`${API_INVOICES_URL}/${id}`, invoice, { headers: httpHeaders });
      })
    );
  }

  updateInvoiceOptions(id: number, opts: {
    Status?: number | InvoiceStatus,
    FechaStatus?: Date,
    Deducible?: boolean,
  }) {
    return this.getInvoiceById(id).pipe(
      switchMap(invoice => {
        invoice.Status = opts.Status !== undefined ? opts.Status : invoice.Status;
        invoice.FechaStatus = opts.FechaStatus !== undefined ? opts.FechaStatus : invoice.FechaStatus;
        invoice.Deducible = opts.Deducible !== undefined ? opts.Deducible : invoice.Deducible;
        console.log('updateInvoiceOptions', opts, invoice);
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.put<InvoiceModel>(`${API_INVOICES_URL}/${id}`, invoice, { headers: httpHeaders });
      })
    );
  }

  cancelInvoices(ids: number[]): Observable<any> {
    const tasks$ = [];
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.cancelInvoice(ids[i]));
    }
    forkJoin(tasks$).subscribe(res => console.log('cancelInvoices subscribe response', res));
    return forkJoin(tasks$);
  }

  markInvoicesAsPaid(ids: number[], statusDate: Date) {
    const tasks$ = [];
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.updateInvoiceOptions(ids[i], { Status: InvoiceStatus.Pagado, FechaStatus: statusDate }));
    }
    return forkJoin(tasks$);
  }

  markInvoicesAsCharged(ids: number[], statusDate: Date) {
    const tasks$ = [];
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.updateInvoiceOptions(ids[i], { Status: InvoiceStatus.Cobrado, FechaStatus: statusDate }));
    }
    return forkJoin(tasks$);
  }

  markInvoicesAsDeducible(ids: number[]) {
    const tasks$ = [];
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.updateInvoiceOptions(ids[i], { Deducible: true }));
    }
    return forkJoin(tasks$);
  }

  unmarkManyInvoices(ids: number[]) {
    const tasks$ = [];
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.updateInvoiceOptions(ids[i], { Status: InvoiceStatus['Sin Cobrar'], FechaStatus: null, Deducible: false }));
    }
    return forkJoin(tasks$);
  }

  getInvoicePdf(id: number): Observable<Blob> {
    const url = `/PDF/Factura/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => response && response.body as Blob)
    );
  }

  downloadInvoice(id: number, filename: string) {
    const url = `${API_INVOICES_URL}/download`;
    const queryString = '?id=' + encodeURIComponent(JSON.stringify(id));
    return this.http.get(url + queryString);
  }

  downloadInvoices(ids: number[]) {
    const url = `${API_INVOICES_URL}/download`;
    const queryString = '?ids=' + encodeURIComponent(JSON.stringify(ids));
    return this.http.get(url + queryString);
  }

  downloadInvoicesExcel(options) {
    const url = `${API_INVOICES_URL}/excel`;
    const queryString = '?opts=' + encodeURIComponent(JSON.stringify(options));
    return this.http.get(url + queryString);
  }

  sendInvoiceEmail(invoiceId: number, emails: string[]): Observable<InvoiceModel> {
    const url = `${API_INVOICES_URL}/${invoiceId}/send`;
    const queryString = '?emails=' + encodeURIComponent(JSON.stringify(emails));
    return this.http.get<InvoiceModel>(url + queryString);
  }

}
