import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { InvoiceStatus } from '@enums/invoice-status.enum';
import { environment } from '@environments/environment';
import { InvoiceWrapperTotals } from '@interfaces/invoice-wrapper-totals.interface';
import { MovementsFilters } from '@interfaces/movements-filters.interface';
import { InvoiceWrapper } from '@models/invoice/invoice-wrapper';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { dowloadFile, HttpUtilsService } from '@utils';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

const API_INVOICES_URL = 'api/invoices';

// Real REST API
@Injectable()
export class MovementsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService
  ) { }

  getInvoiceById(invoiceId: number): Observable<InvoiceModel> {
    return this.http.get<InvoiceModel>(`${environment.movementsEndpoint}/${API_INVOICES_URL}` + `/${invoiceId}`);
  }

  findInvoices(queryParams: QueryParamsModel, wrapperId: string, filters: MovementsFilters): Observable<QueryResultsModel> {
    const url = `${environment.movementsEndpoint}/${API_INVOICES_URL}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify({ queryParams, wrapperId, filters }));
    return this.http.get<QueryResultsModel>(url + queryString);
  }

  findInvoiceDrafts(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    const url = `${environment.movementsEndpoint}/${API_INVOICES_URL}/drafts`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get<QueryResultsModel>(url + queryString);
  }

  getTotalsInRange(
    wrappers: InvoiceWrapper[],
    tiposDeComprobante: string[] = [],
    filters: MovementsFilters
  ): Observable<InvoiceWrapperTotals> {
    const url = `${environment.movementsEndpoint}/${API_INVOICES_URL}/totals`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify({ wrappers, tiposDeComprobante, filters }));
    return this.http.get<InvoiceWrapperTotals>(url + queryString);
  }

  deleteInvoice(invoiceId: number): Observable<InvoiceModel> {
    const url = `${environment.invoicesEndpoint}/${API_INVOICES_URL}/${invoiceId}`;
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
        return this.http.put<InvoiceModel>(`${environment.invoicesEndpoint}/${API_INVOICES_URL}/${id}`, invoice, this.httpOptions);
      })
    );
  }

  updateInvoiceDeducible(id: number, deducible: boolean) {
    return this.getInvoiceById(id).pipe(
      switchMap(invoice => {
        invoice.Deducible = deducible;
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
    console.log('updateInvoiceStatus', environment.movementsEndpoint);
    return this.getInvoiceById(id).pipe(
      switchMap(invoice => {
        console.log('switchMap invoice', invoice);
        invoice.Status = opts.Status !== undefined ? opts.Status : invoice.Status;
        invoice.FechaStatus = opts.FechaStatus !== undefined ? opts.FechaStatus : invoice.FechaStatus;
        invoice.Deducible = opts.Deducible !== undefined ? opts.Deducible : invoice.Deducible;
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        console.log(`${environment.movementsEndpoint}/${API_INVOICES_URL}/${id}`);
        return this.http.put<InvoiceModel>(`${environment.movementsEndpoint}/${API_INVOICES_URL}/${id}`, invoice, this.httpOptions);
      })
    );
  }

  cancelInvoices(ids: number[]) {
    const tasks$ = [];
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.cancelInvoice(ids[i]));
    }
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
    const url = `${environment.movementsEndpoint}/api/PDF/Factura`;
    const queryString = '?id=' + encodeURIComponent(JSON.stringify(id));
    return this.http.get(url + queryString, { responseType: 'blob' });
  }

  downloadInvoice(id: number, filename: string) {
    const url = `${environment.movementsEndpoint}/${API_INVOICES_URL}/download`;
    const queryString = '?id=' + encodeURIComponent(JSON.stringify(id));
    return this.http.get(url + queryString, { responseType: 'blob' as 'json', observe: 'response' }).pipe(
      tap((data: any) => {
        const blob = data.body;
        dowloadFile(blob, `${filename}.zip`);
      })
    );
  }

  downloadInvoices(ids: number[]) {
    const url = `${environment.movementsEndpoint}/${API_INVOICES_URL}/download`;
    const queryString = '?ids=' + encodeURIComponent(JSON.stringify(ids));
    return this.http.get(url + queryString, { responseType: 'blob' as 'json', observe: 'response' }).pipe(
      tap((data: any) => {
        const blob = data.body;
        const name = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
        dowloadFile(blob, `visoor-${name}.zip`);
      })
    );
  }

  sendInvoiceEmail(invoiceId: number, emails: string[]): Observable<InvoiceModel> {
    const url = `${environment.movementsEndpoint}/${API_INVOICES_URL}/${invoiceId}/send`;
    const queryString = '?emails=' + encodeURIComponent(JSON.stringify(emails));
    return this.http.get<InvoiceModel>(url + queryString);
  }

  downloadInvoicesExcel(options) {
    const url = `${environment.movementsEndpoint}/${API_INVOICES_URL}/excel`;
    const queryString = '?opts=' + encodeURIComponent(JSON.stringify(options));
    return this.http.get(url + queryString, { responseType: 'blob' as 'json', observe: 'response' }).pipe(
      tap((data: any) => {
        const blob = data.body;
        const name = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
        dowloadFile(blob, `visoor-${name}.xlsx`);
      })
    );
  }

}
