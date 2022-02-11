import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel } from '@crud';
import { environment } from '@environments/environment';
import { InvoiceResponseError } from '@interfaces/invoice-error.interface';
import { InvoiceSenderClientModel } from '@models/invoice-sender/invoice-sender-client.model';
import { InvoiceSenderProductModel } from '@models/invoice-sender/invoice-sender-product.model';
import { InvoiceSenderProviderModel } from '@models/invoice-sender/invoice-sender-provider.model';
import { InvoiceSenderSerieModel } from '@models/invoice-sender/invoice-sender-serie.model';
import { InvoiceCatClaveProdServModel } from '@models/invoice/invoice-cat-clave-prod-serv.model';
import { InvoiceCatClaveUnidadModel } from '@models/invoice/invoice-cat-clave-unidad.model';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { HttpUtilsService } from '@utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_INVOICES_URL = 'api/invoices';
const API_INVOICE_SENDER_CLIENTS_URL = 'api/invoiceSenderClients';
const API_INVOICE_SENDER_PRODUCTS_URL = 'api/invoiceSenderProducts';
const API_INVOICE_SENDER_SERIES_URL = 'api/invoiceSenderSeries';
const API_INVOICE_CAT_CLAVE_UNIDAD = 'api/invoiceCatClaveUnidad';
const API_INVOICE_CAT_CLAVE_PROD_SERV = 'api/invoiceCatClaveProdServ';

// Real REST API
@Injectable()
export class InvoiceEditService {

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

  getInvoiceById(invoiceId: number): Observable<InvoiceModel> {
    return this.http.get<InvoiceModel>(`${environment.movementsEndpoint}/${API_INVOICES_URL}` + `/${invoiceId}`);
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

}
