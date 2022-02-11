import { BaseModel } from '@crud';

// tslint:disable: variable-name
export class InvoiceImpuestosRetencionModel extends BaseModel {
  id: number;
  invoiceImpuestoId: number;
  Impuesto: number;
  Importe: number;

  public static clone(oldModel: InvoiceImpuestosRetencionModel): InvoiceImpuestosRetencionModel {
    return !!oldModel ? Object.assign(new InvoiceImpuestosRetencionModel(), oldModel) : null;
  }
}
