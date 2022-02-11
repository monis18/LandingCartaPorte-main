import { BaseModel } from '@crud';

// tslint:disable: variable-name
export class InvoiceConceptoInformacionAduanera extends BaseModel {
  invoiceConceptoId: number;
  NumeroPedimento: string;

  public static clone(oldModel: InvoiceConceptoInformacionAduanera): InvoiceConceptoInformacionAduanera {
    return !!oldModel ? Object.assign(new InvoiceConceptoInformacionAduanera(), oldModel) : null;
  }
}
