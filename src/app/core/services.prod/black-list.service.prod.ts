import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParamsModel, QueryResultsModel } from '@crud';
import { environment } from '@environments/environment';
import { HttpUtilsService } from '@utils';
import { forkJoin, Observable } from 'rxjs';

const API_BLACK_LIST_URL = 'api/invoiceSenderBlackList';

@Injectable()
export class BlackListService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService
  ) { }

  findBlackListRecords(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    const url = `${environment.movementsEndpoint}/${API_BLACK_LIST_URL}`;
    const queryString = '?q=' + encodeURIComponent(JSON.stringify(queryParams));
    return this.http.get<QueryResultsModel>(url + queryString);
  }

  getBlackListTotals(): Observable<{ [status: string]: number }> {
    const url = `${environment.movementsEndpoint}/${API_BLACK_LIST_URL}/counters`;
    return this.http.get<{ [status: string]: number }>(url);
  }

  searchRFC(rfc: string): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${environment.movementsEndpoint}/${API_BLACK_LIST_URL}/search`;
    return this.http.post(url, rfc, { headers: httpHeaders });
  }

  private uploadXML(file: File) {
    const formData: FormData = new FormData();
    formData.append('xml', file, file.name);

    const httpHeaders = this.httpUtils.getHTTPHeaders();
    httpHeaders.set('Content-Type', null);
    httpHeaders.set('Accept', 'multipart/form-data');

    const url = `${API_BLACK_LIST_URL}/xml`;
    return this.http.post<any>(url, formData, { headers: httpHeaders });
  }

  uploadXMLs(files: File[]): Observable<any> {
    const tasks$ = [];
    const length = files.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.uploadXML(files[i]));
    }
    return forkJoin(tasks$);
  }
}
