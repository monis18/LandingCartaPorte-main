import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@auth/services/storage.service';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { InvoiceSenderClientModel } from '@models/invoice-sender/invoice-sender-client.model';
import { InvoiceSenderProductModel } from '@models/invoice-sender/invoice-sender-product.model';
import { InvoiceSenderSerieModel } from '@models/invoice-sender/invoice-sender-serie.model';
import { InvoiceSenderModel } from '@models/invoice-sender/invoice-sender.model';
import { UserModel } from '@models/user/user.model';
import { HttpUtilsService } from '@utils';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private API_URL = 'api/users';
  private API_URL_INVOICES = 'api/invoiceSenders';
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private httpUtils: HttpUtilsService,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(this.storage.get('currentUser') as UserModel);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  public get getAccessToken() {
    return this.storage.get('accessToken') as string;
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.API_URL}/${id}`).pipe(
      map(result => {
        return result[0];
      })
    );
  }

  updateUser(user: UserModel) {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.put(this.API_URL, user, { headers: httpHeaders });
  }

  findClients(queryParams: QueryParamsModel, invoiceSenderId: number): Observable<QueryResultsModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
    const queryResults = new QueryResultsModel();
    return this.findClientsById(invoiceSenderId).pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result);
      })
    );
  }

  findClientsById(invoiceSenderId: number): Observable<InvoiceSenderClientModel[]> {
    return this.http.get<InvoiceSenderClientModel[]>(`api/invoiceSenderClients/?invoiceSenderId=${invoiceSenderId}`);
  }

  getClientById(id: number): Observable<InvoiceSenderClientModel> {
    return this.http.get<InvoiceSenderClientModel>(`api/invoiceSenderClients/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  addClient(client: InvoiceSenderClientModel): Observable<InvoiceSenderClientModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<InvoiceSenderClientModel>(`api/invoiceSenderClients`, client, { headers: httpHeaders });
  }

  updateClient(client: InvoiceSenderClientModel): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.put(`api/invoiceSenderClients`, client, { headers: httpHeaders });
  }

  deleteClient(id: number) {
    return this.http.delete<InvoiceSenderClientModel>(`api/invoiceSenderClients/${id}`);
  }

  findProducts(queryParams: QueryParamsModel, invoiceSenderId: number): Observable<QueryResultsModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
    const queryResults = new QueryResultsModel();
    return this.findProductsById(invoiceSenderId).pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result);
      })
    );
  }

  findProductsById(invoiceSenderId: number): Observable<InvoiceSenderProductModel[]> {
    return this.http.get<InvoiceSenderProductModel[]>(`api/invoiceSenderProducts/?invoiceSenderId=${invoiceSenderId}`);
  }

  getProductById(id: number): Observable<InvoiceSenderProductModel> {
    return this.http.get<InvoiceSenderProductModel>(`api/invoiceSenderProducts/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  addProduct(product: InvoiceSenderProductModel): Observable<InvoiceSenderProductModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<InvoiceSenderProductModel>(`api/invoiceSenderProducts`, product, { headers: httpHeaders });
  }

  updateProduct(product: InvoiceSenderProductModel): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.put(`api/invoiceSenderProducts`, product, { headers: httpHeaders });
  }

  deleteProduct(id: number) {
    return this.http.delete<InvoiceSenderProductModel>(`api/invoiceSenderProducts/${id}`);
  }

  findSeries(queryParams: QueryParamsModel, invoiceSenderId: number): Observable<QueryResultsModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
    const queryResults = new QueryResultsModel();
    return this.findSeriesById(invoiceSenderId).pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result);
      })
    );
  }

  findSeriesById(invoiceSenderId: number): Observable<InvoiceSenderSerieModel[]> {
    return this.http.get<InvoiceSenderSerieModel[]>(`api/invoiceSenderSeries/?invoiceSenderId=${invoiceSenderId}`);
  }

  addSerie(serie: InvoiceSenderSerieModel): Observable<InvoiceSenderSerieModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<InvoiceSenderSerieModel>(`api/invoiceSenderSeries`, serie, { headers: httpHeaders });
  }

  updateSerie(serie: InvoiceSenderSerieModel): Observable<InvoiceSenderSerieModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.put<InvoiceSenderSerieModel>(`api/invoiceSenderSeries`, serie, { headers: httpHeaders });
  }

  deleteSerie(id: number) {
    return this.http.delete<InvoiceSenderSerieModel>(`api/invoiceSenderSeries/${id}`);
  }

  addInvoiceSender(emisor: InvoiceSenderModel): Observable<InvoiceSenderModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<InvoiceSenderModel>(this.API_URL_INVOICES, emisor, { headers: httpHeaders });
  }

  getInvoiceSendersByUserId(id: number): Observable<InvoiceSenderModel[]> {
    return this.http.get<InvoiceSenderModel[]>(`api/invoiceSenders/?userId=${id}`);
  }

  updateInvoiceSender(invoiceSender: InvoiceSenderModel, files): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(this.API_URL_INVOICES, invoiceSender, { headers: httpHeader });
  }

  updateInvoiceSenderManifiesto(invoiceSender: InvoiceSenderModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(this.API_URL_INVOICES, invoiceSender, { headers: httpHeader });
  }
}
