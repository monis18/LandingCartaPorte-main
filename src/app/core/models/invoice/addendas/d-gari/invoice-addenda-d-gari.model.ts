import { BaseModel } from '@crud';
import { DGariInvoiceItem } from './d-gari-invoice-item.model';

// tslint:disable: variable-name
export class InvoiceAddendaDGariModel extends BaseModel {
  invoice_ind: 'x';
  doc_date: Date;
  currency: string;
  invoice_item: DGariInvoiceItem[];

  clear() {
    this.invoice_ind = null;
    this.doc_date = null;
    this.currency = null;
    this.invoice_item = [];
  }

  baseData() {
    this.doc_date = new Date();
  }
}
