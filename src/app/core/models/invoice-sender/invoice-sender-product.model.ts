import { BaseModel } from '@crud';
import { InvoiceCatClaveProdServ } from '@enums/catalogues/invoice-cat-clave-prod-serv.enum';
import { InvoiceCatClaveUnidad } from '@enums/catalogues/invoice-cat-clave-unidad.enum';
import { InvoiceImpuestoIepsRetencion } from '@enums/invoice-impuesto-ieps-retencion.enum';
import { InvoiceImpuestoIepsTraslado } from '@enums/invoice-impuesto-ieps-traslado.enum';
import { InvoiceImpuestoIvaTraslado } from '@enums/invoice-impuesto-iva-traslado.enum';

// tslint:disable: variable-name
export class InvoiceSenderProductModel extends BaseModel {
  id: number;
  invoiceSenderId: number;
  Description: string;
  Unit: string;
  UnitCost: number;
  Discount: number;
  Vat: InvoiceImpuestoIvaTraslado | number; // value added tax = iva
  InvoiceCatClaveProdServ: InvoiceCatClaveProdServ | string;
  IdentificationNumber: string;
  InvoiceCatClaveUnidad: InvoiceCatClaveUnidad | string;
  Ieps: InvoiceImpuestoIepsTraslado | number;
  RetIeps: InvoiceImpuestoIepsRetencion | number;
  RetVat: number;
  RetIsr: number;

  clear() {
    this.id = null;
    this.invoiceSenderId = null;
    this.Description = '';
    this.Unit = '';
    this.UnitCost = null;
    this.Discount = null;
    this.Vat = InvoiceImpuestoIvaTraslado['Impuesto 16%'];
    this.InvoiceCatClaveProdServ = '';
    this.IdentificationNumber = '';
    this.InvoiceCatClaveUnidad = '';
    this.Ieps = null;
    this.RetIeps = null;
    this.RetVat = null;
    this.RetIsr = null;
  }
}
