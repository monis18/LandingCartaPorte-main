import { BaseModel } from '@crud';

// tslint:disable: variable-name
export class InvoiceImpuestosTrasladoModel extends BaseModel {
  id: number;
  invoiceImpuestoId: number;
  Impuesto: string;
  TipoFactor: string;
  TasaOCuota: number;
  Importe: number;

  public static clone(oldModel: InvoiceImpuestosTrasladoModel): InvoiceImpuestosTrasladoModel {
    return !!oldModel ? Object.assign(new InvoiceImpuestosTrasladoModel(), oldModel) : null;
  }
}
