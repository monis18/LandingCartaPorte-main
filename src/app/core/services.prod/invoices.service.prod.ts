import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { InvoiceStatus } from '@enums/invoice-status.enum';
import { environment } from '@environments/environment';
import { InvoiceResponseError } from '@interfaces/invoice-error.interface';
import { InvoiceWrapperTotals } from '@interfaces/invoice-wrapper-totals.interface';
import { MovementsFilters } from '@interfaces/movements-filters.interface';
import { InvoiceSenderClientModel } from '@models/invoice-sender/invoice-sender-client.model';
import { InvoiceSenderProductModel } from '@models/invoice-sender/invoice-sender-product.model';
import { InvoiceSenderProviderModel } from '@models/invoice-sender/invoice-sender-provider.model';
import { InvoiceSenderSerieModel } from '@models/invoice-sender/invoice-sender-serie.model';
import { InvoiceSenderModel } from '@models/invoice-sender/invoice-sender.model';
import { InvoiceCatClaveProdServModel } from '@models/invoice/invoice-cat-clave-prod-serv.model';
import { InvoiceCatClaveUnidadModel } from '@models/invoice/invoice-cat-clave-unidad.model';
import { InvoiceWrapper } from '@models/invoice/invoice-wrapper';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { dowloadFile, HttpUtilsService } from '@utils';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

const API_INVOICES_URL = 'api/invoices';
const API_INVOICE_SENDERS_URL = 'api/invoiceSenders';
const API_INVOICE_SENDER_CLIENTS_URL = 'api/invoiceSenderClients';
const API_INVOICE_SENDER_PROVIDERS_URL = 'api/invoiceSenderProviders';
const API_INVOICE_SENDER_PRODUCTS_URL = 'api/invoiceSenderProducts';
const API_INVOICE_SENDER_SERIES_URL = 'api/invoiceSenderSeries';
const API_INVOICE_CAT_CLAVE_UNIDAD = 'api/invoiceCatClaveUnidad';
const API_INVOICE_CAT_CLAVE_PROD_SERV = 'api/invoiceCatClaveProdServ';

// Real REST API
@Injectable()
export class InvoicesService {

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

  // CREATE =>  POST: add a new product to the server
  createInvoice(invoice: InvoiceModel): Observable<InvoiceModel | InvoiceResponseError> {
    console.log(JSON.stringify(invoice));
    return this.http.post<InvoiceModel | InvoiceResponseError>
      (`${environment.invoicesEndpoint}/${API_INVOICES_URL}`, invoice, this.httpOptions).pipe(
        map(response => {
          const error = response as InvoiceResponseError;
          if (!!error && error.status !== undefined && error.status === 'BAD_REQUEST') {
            error.invoice = invoice;
            return error;
          }
          return response;
        })
      );
  }

  createInvoiceDraft(invoice): Observable<InvoiceModel | InvoiceResponseError> {
    return this.http.post<InvoiceModel | InvoiceResponseError>
      (`${environment.invoicesEndpoint}/${API_INVOICES_URL}/drafts`, invoice, this.httpOptions).pipe(
        map(response => {
          const error = response as InvoiceResponseError;
          if (error.status !== undefined && error.status === 'BAD_REQUEST') {
            error.invoice = invoice;
            return error;
          }
          return response;
        })
      );
  }

  getAllInvoices(): Observable<InvoiceModel[]> {
    return this.http.get<InvoiceModel[]>(`${environment.movementsEndpoint}/${API_INVOICES_URL}`);
  }

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

  public getInvoiceSenderById(id: number) {
    const url = `${environment.invoicesEndpoint}/${API_INVOICE_SENDERS_URL}/${id}`;
    return this.http.get<InvoiceSenderModel>(url);
  }

  public getInvoiceSenderSeries() {
    const url = `${environment.invoicesEndpoint}/${API_INVOICE_SENDER_SERIES_URL}`;
    return this.http.get<InvoiceSenderSerieModel[]>(url);
  }

  public findQueryInvoices(value: string): Observable<InvoiceModel[]> {
    const queryParams = new QueryParamsModel(
      { UUID: value },
    );

    // 'api/invoiceCatClaveUnidad?q=${value}';
    const url = `${environment.invoicesEndpoint}/${API_INVOICES_URL}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get<InvoiceModel[]>(url + queryString);
  }

  public findQueryInvoiceSenderProviders(value: string): Observable<InvoiceSenderProviderModel[]> {
    const queryParams = new QueryParamsModel(
      { Rfc: value },
      'asc',
      'Rfc',
    );

    const url = `${environment.invoicesEndpoint}/${API_INVOICE_SENDER_CLIENTS_URL}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get<InvoiceSenderProviderModel[]>(url + queryString);
  }

  public findQueryInvoiceSenderClients(value: string): Observable<InvoiceSenderClientModel[]> {
    const queryParams = new QueryParamsModel(
      { Name: value },
      'asc',
      'Name',
    );

    // 'api/invoiceCatClaveUnidad?q=${value}';
    const url = `${environment.invoicesEndpoint}/${API_INVOICE_SENDER_CLIENTS_URL}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get<InvoiceSenderClientModel[]>(url + queryString);
  }

  public findQueryInvoiceSenderProducts(value: string): Observable<InvoiceSenderProductModel[]> {
    const queryParams = new QueryParamsModel(
      { Description: value, ValorUnitario: value },
      'asc',
      'ValorUnitario',
    );

    // 'api/invoiceCatClaveUnidad?q=${value}';
    const url = `${environment.invoicesEndpoint}/${API_INVOICE_SENDER_PRODUCTS_URL}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get<InvoiceSenderProductModel[]>(url + queryString);
  }

  public findQueryInvoiceCatClaveUnidad(value: string): Observable<InvoiceCatClaveUnidadModel[]> {
    const queryParams = new QueryParamsModel(
      { Descripcion: value, Clave: value },
    );

    // 'api/invoiceCatClaveUnidad?q=${value}';
    const url = `${environment.invoicesEndpoint}/${API_INVOICE_CAT_CLAVE_UNIDAD}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get<InvoiceCatClaveUnidadModel[]>(url + queryString);
  }

  public findQueryInvoiceCatClaveProdServ(value: string): Observable<InvoiceCatClaveProdServModel[]> {
    const queryParams = new QueryParamsModel(
      { Descripcion: value, Clave: value },
    );
    // 'api/invoiceCatClaveUnidad?q=${value}';
    const url = `${environment.invoicesEndpoint}/${API_INVOICE_CAT_CLAVE_PROD_SERV}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get<InvoiceCatClaveProdServModel[]>(url + queryString);
  }

  updateInvoiceDraft(invoice: InvoiceModel): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.put(`${environment.invoicesEndpoint}/${API_INVOICES_URL}/drafts`, invoice, this.httpOptions);
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

  getInvoicePdf(id: number) {
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

  getAllInvoiceSenderProviders(): Observable<InvoiceSenderProviderModel[]> {
    const url = `${environment.movementsEndpoint}/${API_INVOICE_SENDER_PROVIDERS_URL}`;
    return this.http.get<InvoiceSenderProviderModel[]>(url);
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
