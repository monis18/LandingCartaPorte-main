import { BaseModel } from '@crud';

// tslint:disable: variable-name
export class InvoiceConceptoCuentaPredialModel extends BaseModel {
  invoiceConceptoId: number;
  Numero: string;

  public static clone(oldModel: InvoiceConceptoCuentaPredialModel): InvoiceConceptoCuentaPredialModel {
    return !!oldModel ? Object.assign(new InvoiceConceptoCuentaPredialModel(), oldModel) : null;
  }
}
