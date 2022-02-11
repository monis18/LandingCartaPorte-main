import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { Observable } from 'rxjs';

const API_PAYROLL_URL = 'api/invoices';

@Injectable()
export class PayrollService {

  constructor(
    private http: HttpClient,
  ) { }

  uploadExcel(file: File, registroPatronal: boolean): Observable<InvoiceModel[]> {
    const url = `${API_PAYROLL_URL}/uploadExcel`;
    return this.http.get<InvoiceModel[]>(url);
  }

}
