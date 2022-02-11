import { BaseModel } from '@crud';

// tslint:disable: variable-name
export class InvoiceSenderSerieModel extends BaseModel {
  id: number;
  invoiceSenderId: number;
  Folio: number;
  Serie: string;

  clear() {
    this.id = null;
    this.invoiceSenderId = null;
    this.Folio = 1;
    this.Serie = 'A';
  }
}
