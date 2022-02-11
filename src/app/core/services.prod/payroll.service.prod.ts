import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { HttpUtilsService } from '@utils';
import { Observable } from 'rxjs';

const API_PAYROLL_URL = 'api/invoices';

@Injectable()
export class PayrollService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService,
  ) { }

  uploadExcel(file: File, registroPatronal: boolean): Observable<InvoiceModel> {
    const formData: FormData = new FormData();
    formData.append('payroll', file, file.name);
    formData.append('registroPatronal', JSON.stringify(registroPatronal));

    const httpHeaders = this.httpUtils.getHTTPHeaders();
    httpHeaders.set('Content-Type', null);
    httpHeaders.set('Accept', 'multipart/form-data');

    const url = `${API_PAYROLL_URL}/uploadExcel`;
    return this.http.post<InvoiceModel>(url, formData, { headers: httpHeaders });
  }

}
