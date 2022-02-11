import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { CustomersModel } from '@models/customer.model';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { PaymentsModel } from '@models/payments.model';
import { HttpUtilsService } from '@utils';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class PaymentMethodsService {

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
    return this.findPaysById(id).pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result);
      })
    );
  }

  findPaysById(id: number): Observable<PaymentsModel[]> {
    return this.http.get<PaymentsModel[]>(`api/payments/?UserId=${id}`);
  }

  signClient(token, plan, amount) {
    const payment: PaymentsModel = new PaymentsModel();
    payment.clear();
    const date = new Date();
    payment.CreatedAt = date;
    payment.Invoiced = 0;
    payment.Plan = plan;
    payment.Amount = amount;
    payment.Card = '1234';
    payment.id = 6;
    payment.Name = 'Vanessa';
    payment.Status = 0;
    payment.UserId = 2;
    return of(payment);
  }

  getSelfInvoiceEmisor(rfc1: string, rfc2: string): Observable<string> {
    return of('token12u3ha');
  }

  InvoicePayment(invoice: InvoiceModel, token): Observable<InvoiceModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<InvoiceModel>('api/invoices', invoice, { headers: httpHeaders });
  }

  updatePayment(payment: PaymentsModel) {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.put(`api/payments`, payment, { headers: httpHeaders });
  }

  findCards(queryParams: QueryParamsModel, id: number): Observable<QueryResultsModel> {
    return this.findCardsById(id).pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams);
        return of(result);
      })
    );
  }

  findCardsById(id: number): Observable<any[]> {
    this.http.get(`api/payments/?UserId=${id}`);
    return this.http.get<CustomersModel[]>(`api/customers/?UserId=${id}`);
  }

  addCard(card: CustomersModel): Observable<CustomersModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<CustomersModel>(`api/customers`, card, { headers: httpHeaders });
  }

  payActualPlan(id: number) {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return of('ok');
  }
}
