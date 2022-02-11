import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from '@utils';
import { forkJoin, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

const API_VISOOR_SAT_URL = 'api/invoices';

@Injectable()
export class VisoorSatService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService,
  ) { }

  urlWithParams(baseUrl: string, request: object): string {
    const params = Object.keys(request).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(request[k])}`).join('&');
    const queryString = '?' + params;
    return baseUrl + queryString;
  }

  quickSync(): Observable<any> {
    const request = {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    };
    const url = `${API_VISOOR_SAT_URL}/sync`;
    return this.http.get(this.urlWithParams(url, request)).pipe(delay(5000));
  }

  syncMonth(month: number, year: number): Observable<any> {
    const request = {
      from: new Date(year, month, 1),
      to: new Date(year, month + 1, 0),
    };
    const url = `${API_VISOOR_SAT_URL}/sync`;
    return this.http.get(this.urlWithParams(url, request)).pipe(delay(5000));
  }

  private importXML(file: File) {
    const formData: FormData = new FormData();
    formData.append('xml', file, file.name);

    const httpHeaders = this.httpUtils.getHTTPHeaders();
    httpHeaders.set('Content-Type', null);
    httpHeaders.set('Accept', 'multipart/form-data');

    const url = `${API_VISOOR_SAT_URL}/import`;
    return this.http.post<any>(url, formData, { headers: httpHeaders });
  }

  public importXMLs(files: FileList): Observable<any> {
    const tasks$ = [];
    const length = files.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.importXML(files[i]));
    }
    return forkJoin(tasks$);
  }

}
