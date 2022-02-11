import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { IDiotRecord } from '@interfaces/diot-record.interface';
import { InvoiceSenderProviderModel } from '@models/invoice-sender/invoice-sender-provider.model';
import { HttpUtilsService } from '@utils';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const DIOT_API_URL = 'api/diotRecords';
const PROVIDERS_API_URL = 'api/invoiceSenderProviders';

@Injectable()
export class DiotService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService
  ) { }

  getAllInvoiceSenderProviders(): Observable<InvoiceSenderProviderModel[]> {
    return this.http.get<InvoiceSenderProviderModel[]>(PROVIDERS_API_URL);
  }

  getAllDiotRecords(): Observable<Partial<IDiotRecord>[]> {
    return this.http.get<Partial<IDiotRecord>[]>(DIOT_API_URL);
  }

  findDiotRecords(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    return forkJoin({
      providers: this.getAllInvoiceSenderProviders(),
      diotRecords: this.getAllDiotRecords(),
    }).pipe(
      switchMap(({ providers, diotRecords }) => {
        const partialEntitiesResult = diotRecords
          .filter(r => r.Year === queryParams.filter.Year)
          .filter(r => r.Month === queryParams.filter.Month)
          ;

        let entitiesResult = partialEntitiesResult.map(r => {
          const provider = providers.find(p => p.Rfc === r.Rfc);
          const diotRecord = Object.assign({}, r) as IDiotRecord;
          diotRecord.Company = provider.Company || '';
          diotRecord.Operation = provider.DiotOperation || null;
          diotRecord.Type = provider.DiotType || null;
          return diotRecord;
        });

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

  downloadDiotExcel(queryParams, filename: string) {
    const url = `${DIOT_API_URL}/excel`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get(url + queryString);
  }

  downloadDiotTxt(queryParams, filename: string) {
    const url = `${DIOT_API_URL}/txt`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get(url + queryString);
  }

  getInvoiceSenderProviderByRfc(rfc: string): Observable<InvoiceSenderProviderModel> {
    const url = `${PROVIDERS_API_URL}?Rfc=${rfc}`;
    return this.http.get<InvoiceSenderProviderModel[]>(url).pipe(
      map(providers => !!providers && providers.length > 0 ? providers[0] : null)
    );
  }

  updateInvoiceSenderProviderDiot(diotRecord: IDiotRecord) {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.getInvoiceSenderProviderByRfc(diotRecord.Rfc).pipe(
      switchMap(p => {
        const provider = Object.assign(new InvoiceSenderProviderModel(), p);
        provider.DiotOperation = diotRecord.Operation;
        provider.DiotType = diotRecord.Type;
        return this.http.put<InvoiceSenderProviderModel>(`${PROVIDERS_API_URL}/${p.id}`, provider, { headers: httpHeaders });
      })
    );
  }
}
