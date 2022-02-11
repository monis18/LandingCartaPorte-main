import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { environment } from '@environments/environment';
import { InvoiceSenderClientModel } from '@models/invoice-sender/invoice-sender-client.model';
import { InvoiceSenderProductModel } from '@models/invoice-sender/invoice-sender-product.model';
import { InvoiceSenderSerieModel } from '@models/invoice-sender/invoice-sender-serie.model';
import { InvoiceSenderModel } from '@models/invoice-sender/invoice-sender.model';
import { UserModel } from '@models/user/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_INVOICE_SENDER_CLIENTS = 'api/invoiceSenderClients';
const API_INVOICE_SENDER_URL = 'api/invoiceSenders';
const API_INVOICE_SENDER_PRODUCTS = 'api/invoiceSenderProducts';
const API_INVOICE_SENDER_SERIES = 'api/invoiceSenderSeries';
const API_USERS_URL = 'api/users';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  public get getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.preferencesEndpoint}/${API_USERS_URL}/users` + `/${id}`);
  }

  updateUser(user: UserModel): Observable<any> {
    return this.http.put(`${environment.preferencesEndpoint}/${API_USERS_URL}/users`, user, this.httpOptions);
  }

  findClients(queryParams: QueryParamsModel, invoiceSenderId: number): Observable<QueryResultsModel> {
    const url = `${environment.preferencesEndpoint}/${API_INVOICE_SENDER_CLIENTS}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify({ queryParams, invoiceSenderId }));
    return this.http.get<QueryResultsModel>(url + queryString);
  }

  findClientsById(invoiceSenderId: number): Observable<InvoiceSenderClientModel[]> {
    return this.http.get<InvoiceSenderClientModel[]>(`api/invoiceSenderClients/?invoiceSenderId=${invoiceSenderId}`);
  }

  getClientById(id: number): Observable<InvoiceSenderClientModel> {
    return this.http.get<InvoiceSenderClientModel>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_CLIENTS}/${id}`);
  }

  addClient(client: InvoiceSenderClientModel): Observable<InvoiceSenderClientModel> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<InvoiceSenderClientModel>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_CLIENTS}`, client, this.httpOptions);
  }

  updateClient(client: InvoiceSenderClientModel): Observable<any> {
    return this.http.put(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_CLIENTS}`, client, this.httpOptions);
  }

  deleteClient(id: number) {
    const url = `${environment.preferencesEndpoint}/${API_INVOICE_SENDER_CLIENTS}/${id}`;
    return this.http.delete<InvoiceSenderClientModel>(url);
  }

  addInvoiceSender(emisor: InvoiceSenderModel): Observable<InvoiceSenderModel> {
    return this.http.post<InvoiceSenderModel>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_URL}`, emisor, this.httpOptions);
  }

  getInvoiceSenderById(id: number): Observable<InvoiceSenderModel> {
    return this.http.get<InvoiceSenderModel>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_URL}/${id}`);
  }

  getInvoiceSendersByUserId(id: number) {
    return this.http.get<InvoiceSenderModel[]>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_URL}?userId=${id}`);
  }

  updateInvoiceSender(config: InvoiceSenderModel, files): Observable<any> {
    return this.http.put(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_URL}`, { config, files }, this.httpOptions);
  }

  updateInvoiceSenderManifiesto(invoiceSender: InvoiceSenderModel): Observable<any> {
    // const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_URL}`, invoiceSender, this.httpOptions);
  }

  findProducts(queryParams: QueryParamsModel, invoiceSenderId: number): Observable<QueryResultsModel> {
    const url = `${environment.preferencesEndpoint}/${API_INVOICE_SENDER_PRODUCTS}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify({ queryParams, invoiceSenderId }));
    return this.http.get<QueryResultsModel>(url + queryString);
  }

  findProductsById(invoiceSenderId: number): Observable<InvoiceSenderProductModel[]> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<InvoiceSenderProductModel[]>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_PRODUCTS}/${invoiceSenderId}`);
  }

  getProductById(id: number): Observable<InvoiceSenderProductModel> {
    const url = `${environment.preferencesEndpoint}/${API_INVOICE_SENDER_PRODUCTS}/${id}`;
    return this.http.get<InvoiceSenderProductModel>(url).pipe(
      map(result => {
        return result;
      })
    );
  }

  addProduct(product: InvoiceSenderProductModel): Observable<InvoiceSenderProductModel> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<InvoiceSenderProductModel>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_PRODUCTS}`, product, this.httpOptions);
  }

  updateProduct(product: InvoiceSenderProductModel): Observable<any> {
    return this.http.put(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_PRODUCTS}`, product, this.httpOptions);
  }

  deleteProduct(id: number) {
    const url = `${environment.preferencesEndpoint}/${API_INVOICE_SENDER_PRODUCTS}/${id}`;
    return this.http.delete<InvoiceSenderProductModel>(url);
  }

  findSeries(queryParams: QueryParamsModel, invoiceSenderId: number): Observable<QueryResultsModel> {
    const url = `${environment.preferencesEndpoint}/${API_INVOICE_SENDER_SERIES}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify({ queryParams, invoiceSenderId }));
    return this.http.get<QueryResultsModel>(url + queryString);
  }

  findSeriesById(invoiceSenderId: number): Observable<InvoiceSenderSerieModel[]> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<InvoiceSenderSerieModel[]>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_SERIES}/${invoiceSenderId}`);
  }

  addSerie(product: InvoiceSenderSerieModel): Observable<InvoiceSenderSerieModel> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<InvoiceSenderSerieModel>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_SERIES}`, product, this.httpOptions);
  }

  updateSerie(product: InvoiceSenderSerieModel): Observable<InvoiceSenderSerieModel> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<InvoiceSenderSerieModel>(`${environment.preferencesEndpoint}/${API_INVOICE_SENDER_SERIES}`, product, this.httpOptions);
  }

  deleteSerie(id: number) {
    const url = `${environment.preferencesEndpoint}/${API_INVOICE_SENDER_SERIES}/${id}`;
    return this.http.delete<InvoiceSenderSerieModel>(url);
  }
}
