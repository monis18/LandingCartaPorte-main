import { BaseModel } from '@crud';
import { InvoiceCatEstado } from '@enums/catalogues/invoice-cat-estado.enum';
import { InvoiceCatFormaPago } from '@enums/catalogues/invoice-cat-forma-pago.enum';
import { InvoiceCatUsoCfdi } from '@enums/catalogues/invoice-cat-uso-cfdi.enum';

// tslint:disable: variable-name
export class InvoiceSenderClientModel extends BaseModel {
  id: number;
  invoiceSenderId: number;
  Name: string;
  Phone: string;
  Email: string;
  CompanyName: string;
  Rfc: string;
  Street: string;
  Location: string;
  NumInt: string;
  NumOut: string;
  City: string;
  Country: string;
  Zipcode: number;
  accountNumber: string;
  LastFourDigits: string;
  CreatedDate: Date;
  UpdatedDate: Date;
  InvoiceCatEstado: InvoiceCatEstado | string;
  InvoiceCatFormaPago: InvoiceCatFormaPago | string;
  InvoiceCatUsoCfdi: InvoiceCatUsoCfdi | string;

  clear() {
    this.id = null;
    this.invoiceSenderId = null;
    this.Name = '';
    this.Phone = '';
    this.Email = '';
    this.CompanyName = '';
    this.Rfc = '';
    this.Street = '';
    this.Location = '';
    this.NumInt = '';
    this.NumOut = '';
    this.City = '';
    this.Country = '';
    this.Zipcode = null;
    this.LastFourDigits = null;
    this.InvoiceCatEstado = null;
    this.InvoiceCatFormaPago = null;
    this.InvoiceCatUsoCfdi = null;
  }
}
