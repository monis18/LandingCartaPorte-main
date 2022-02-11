import { BaseModel } from '@crud';
import { InvoiceCatRegimenFiscal } from '@enums/catalogues/invoice-cat-regimen-fiscal.enum';

// tslint:disable: variable-name
export class InvoiceEmisorModel extends BaseModel {
  id: number;
  invoiceId: number;
  Rfc: string;
  Nombre: string;
  RegimenFiscal: InvoiceCatRegimenFiscal | string;

  public static clone(oldModel: InvoiceEmisorModel): InvoiceEmisorModel {
    return !!oldModel ? Object.assign(new InvoiceEmisorModel(), oldModel) : null;
  }

  clear() {
    this.id = null;
    this.invoiceId = null;
    this.Rfc = '';
    this.Nombre = '';
    this.RegimenFiscal = null;
  }
}
