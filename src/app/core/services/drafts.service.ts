import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { InvoiceResponseError } from '@interfaces/invoice-error.interface';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { HttpUtilsService } from '@utils';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

const API_INVOICES_URL = 'api/invoices';
// Real REST API
@Injectable()
export class DraftsService {

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
