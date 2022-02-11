import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel } from '@crud';
import { InvoiceResponseError } from '@interfaces/invoice-error.interface';
import { InvoiceSenderClientModel } from '@models/invoice-sender/invoice-sender-client.model';
import { InvoiceSenderProductModel } from '@models/invoice-sender/invoice-sender-product.model';
import { InvoiceSenderProviderModel } from '@models/invoice-sender/invoice-sender-provider.model';
import { InvoiceSenderSerieModel } from '@models/invoice-sender/invoice-sender-serie.model';
import { InvoiceCatClaveProdServModel } from '@models/invoice/invoice-cat-clave-prod-serv.model';
import { InvoiceCatClaveUnidadModel } from '@models/invoice/invoice-cat-clave-unidad.model';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { HttpUtilsService } from '@utils';
import * as RandExp from 'randexp';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

const API_INVOICES_URL = 'api/invoices';
// Real REST API
@Injectable()
export class InvoiceEditService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService
  ) { }

  // CREATE =>  POST: add a new product to the server
  createInvoice(invoice: InvoiceModel): Observable<InvoiceModel | InvoiceResponseError> {
    invoice = InvoiceModel.clone(invoice);
    invoice.UUID = new RandExp(/[a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}/).gen();
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<InvoiceModel | InvoiceResponseError>(API_INVOICES_URL, invoice, { headers: httpHeaders }).pipe(
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
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<InvoiceModel | InvoiceResponseError>(API_INVOICES_URL, invoice, { headers: httpHeaders }).pipe(
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
    return this.http.get<InvoiceModel[]>(API_INVOICES_URL);
  }

  getInvoiceById(invoiceId: number): Observable<InvoiceModel> {
    return this.http.get<InvoiceModel>(API_INVOICES_URL + `/${invoiceId}`);
  }

  public getInvoiceSenderSeries() {
    return this.http.get<InvoiceSenderSerieModel[]>(`api/invoiceSenderSeries`);
  }

  public findQueryInvoices(value: string): Observable<InvoiceModel[]> {
    const queryParams = new QueryParamsModel(
      { UUID: value },
    );

    return this.getAllInvoices().pipe(
      mergeMap(res => {
        const entitiesResult = res.filter(i => !!i.UUID);
        const result = this.httpUtils.baseFilter(entitiesResult, queryParams);
        return of(result.items as InvoiceModel[]);
      })
    );
  }

  public findQueryInvoiceSenderClients(value: string): Observable<InvoiceSenderClientModel[]> {
    const queryParams = new QueryParamsModel(
      { Name: value },
      'asc',
      'Name',
    );

    return this.http.get<InvoiceSenderClientModel[]>('api/invoiceSenderClients').pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result.items as InvoiceSenderClientModel[]);
      })
    );
  }

  public findQueryInvoiceSenderProviders(value: string): Observable<InvoiceSenderProviderModel[]> {
    const queryParams = new QueryParamsModel(
      { Rfc: value },
      'asc',
      'Rfc',
    );

    return this.http.get<InvoiceSenderProviderModel[]>('api/invoiceSenderProviders').pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result.items as InvoiceSenderProviderModel[]);
      })
    );
  }

  public findQueryInvoiceSenderProducts(value: string): Observable<InvoiceSenderProductModel[]> {
    const queryParams = new QueryParamsModel(
      { Description: value, UnitCost: value },
      'asc',
      'UnitCost',
    );

    return this.http.get<InvoiceSenderProductModel[]>('api/invoiceSenderProducts').pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result.items as InvoiceSenderProductModel[]);
      })
    );
  }

  public findQueryInvoiceCatClaveUnidad(value: string): Observable<InvoiceCatClaveUnidadModel[]> {
    const queryParams = new QueryParamsModel(
      { Descripcion: value, Clave: value },
    );

    return this.http.get<InvoiceCatClaveUnidadModel[]>('api/invoiceCatClaveUnidad').pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result.items as InvoiceCatClaveUnidadModel[]);
      })
    );
  }

  public findQueryInvoiceCatClaveProdServ(value: string): Observable<InvoiceCatClaveProdServModel[]> {
    const queryParams = new QueryParamsModel(
      { Descripcion: value, Clave: value },
    );

    return this.http.get<InvoiceCatClaveProdServModel[]>('api/invoiceCatClaveProdServ').pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result.items as InvoiceCatClaveProdServModel[]);
      })
    );
  }

  // UPDATE => PUT: update the product on the server
  updateInvoiceDraft(invoice: InvoiceModel): Observable<InvoiceModel | InvoiceResponseError> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.put<InvoiceModel | InvoiceResponseError>(`${API_INVOICES_URL}/${invoice.id}`, invoice, { headers: httpHeaders }).pipe(
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

}
