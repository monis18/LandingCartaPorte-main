import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { environment } from '@environments/environment';
import { dowloadFile, HttpUtilsService } from '@utils';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { InvoiceSenderProviderModel } from '../models/invoice-sender/invoice-sender-provider.model';

const DIOT_API_URL = 'api/diotRecords';
const PROVIDERS_API_URL = 'api/invoiceSenderProviders';

@Injectable()
export class DiotService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService
  ) { }

  findDiotRecords(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    const url = `${environment.movementsEndpoint}/${DIOT_API_URL}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get<QueryResultsModel>(url + queryString);
  }

  downloadDiotExcel(queryParams, filename: string) {
    const url = `${environment.movementsEndpoint}/${DIOT_API_URL}/excel`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get(url + queryString, { responseType: 'blob' as 'json', observe: 'response' }).pipe(
      tap((data: any) => {
        const blob = data.body;
        dowloadFile(blob, `${filename}.xlsx`);
      })
    );
  }

  downloadDiotTxt(queryParams, filename: string) {
    const url = `${environment.movementsEndpoint}/${DIOT_API_URL}/txt`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get(url + queryString, { responseType: 'blob' as 'json', observe: 'response' }).pipe(
      tap((data: any) => {
        const blob = data.body;
        dowloadFile(blob, `${filename}.txt`);
      })
    );
  }

  getInvoiceSenderProviderByRfc(rfc: string): Observable<InvoiceSenderProviderModel> {
    const url = `${PROVIDERS_API_URL}?Rfc=${rfc}`;
    return this.http.get<InvoiceSenderProviderModel[]>(url).pipe(
      map(providers => !!providers && providers.length > 0 ? providers[0] : null)
    );
  }

  updateInvoiceSenderProviderDiot(provider: Partial<InvoiceSenderProviderModel>) {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.getInvoiceSenderProviderByRfc(provider.Rfc).pipe(
      switchMap(p => {
        return this.http.put<InvoiceSenderProviderModel>(
          `${PROVIDERS_API_URL}/${p.id}`,
          Object.assign(new InvoiceSenderProviderModel(), p, provider),
          { headers: httpHeaders }
        );
      })
    );
  }
}
