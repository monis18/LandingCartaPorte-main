import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { environment } from '@environments/environment';
import { CustomersModel } from '@models/customer.model';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { PaymentsModel } from '@models/payments.model';
import { HttpUtilsService } from '@utils';
import { Observable } from 'rxjs';

const API_PAYMENTS = 'api/payments';
const API_CUSTOMERS = 'api/customers';
const API_INVOICES = 'api/invoices';
@Injectable()
export class PaymentMethodsService {

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

  title = '';
  @Output() change: EventEmitter<string> = new EventEmitter();

  setTitle(title) {
    this.title = title;
    this.change.emit(this.title);
  }

  findPays(queryParams: QueryParamsModel, id: number): Observable<QueryResultsModel> {
    const url = `${environment.preferencesEndpoint}/${API_PAYMENTS}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify({ queryParams, id }));
    return this.http.get<QueryResultsModel>(url + queryString);
  }

  findPaysById(id: number): Observable<PaymentsModel[]> {
    return this.http.get<PaymentsModel[]>(`${environment.preferencesEndpoint}/${API_PAYMENTS}?UserId=${id}`);
  }

  signClient(token, plan, amount): Observable<PaymentsModel> {
    const payInformation = [token, plan, amount];
    return this.http.post<PaymentsModel>(`${environment.preferencesEndpoint}/${API_PAYMENTS}`, payInformation, this.httpOptions);
  }

  getSelfInvoiceEmisor(rfc1: string, rfc2: string): Observable<string> {
    return this.http.post<string>(`${environment.preferencesEndpoint}/${API_INVOICES}/auth`, { rfc1, rfc2 }, this.httpOptions);
  }

  InvoicePayment(invoice: InvoiceModel, token): Observable<InvoiceModel> {
    return this.http.post<InvoiceModel>(`${environment.preferencesEndpoint}/${API_INVOICES}`, invoice, this.httpOptions);
  }

  updatePayment(payment: PaymentsModel): Observable<PaymentsModel> {
    return this.http.put<PaymentsModel>(`${environment.preferencesEndpoint}/${API_PAYMENTS}`, payment, this.httpOptions);
  }

  findCards(queryParams: QueryParamsModel, id: number): Observable<QueryResultsModel> {
    const url = `${environment.preferencesEndpoint}/${API_CUSTOMERS}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify({ queryParams, id }));
    return this.http.get<QueryResultsModel>(url + queryString);
  }

  findCardsById(id: number): Observable<PaymentsModel[]> {
    return this.http.get<PaymentsModel[]>(`${environment.preferencesEndpoint}/${API_CUSTOMERS}?UserId=${id}`);
  }

  addCard(card: CustomersModel): Observable<CustomersModel> {
    return this.http.post<CustomersModel>(`${environment.preferencesEndpoint}/${API_CUSTOMERS}`, card, this.httpOptions);
  }

  payActualPlan(id: number): Observable<PaymentsModel> {
    return this.http.post<any>(`${environment.preferencesEndpoint}/${API_PAYMENTS}`, id, this.httpOptions);
  }

}
