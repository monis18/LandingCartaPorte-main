import { BaseModel } from '@crud';

// tslint:disable: variable-name
export class InvoiceAddendaKNModel extends BaseModel {
  Purchase_Order: string;
  FileNumber_GL: string;
  Branch_Centre: string;
  TransportRef: string;

  clear() {
    this.Purchase_Order = null;
    this.FileNumber_GL = null;
    this.Branch_Centre = null;
    this.TransportRef = null;
  }
}
