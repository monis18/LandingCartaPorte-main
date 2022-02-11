import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from '@utils';
import { forkJoin, Observable } from 'rxjs';

const ENDPOINT = 'http://api.visoor.mx';
const API_VISOOR_SAT_URL = 'api/visoor-sat';

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

  dateToTimestamp(date: Date): number {
    return Math.round(date.getTime() / 1000);
  }

  quickSync(): Observable<any> {
    const request = {
      from: this.dateToTimestamp(new Date(new Date().setDate(new Date().getDate() - 30))),
      to: this.dateToTimestamp(new Date()),
    };
    const url = `${ENDPOINT}/${API_VISOOR_SAT_URL}/sync`;
    return this.http.get(this.urlWithParams(url, request));
  }

  syncMonth(month: number, year: number): Observable<any> {
    const request = {
      from: this.dateToTimestamp(new Date(year, month, 1)),
      to: this.dateToTimestamp(new Date(year, month + 1, 0)),
    };
    const url = `${ENDPOINT}/${API_VISOOR_SAT_URL}/sync`;
    return this.http.get(this.urlWithParams(url, request));
  }

  private importXML(file: File) {
    const formData: FormData = new FormData();
    formData.append('xml', file, file.name);

    const httpHeaders = this.httpUtils.getHTTPHeaders();
    httpHeaders.set('Content-Type', null);
    httpHeaders.set('Accept', 'multipart/form-data');

    const url = `${ENDPOINT}/${API_VISOOR_SAT_URL}/import`;
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
