import { BaseModel } from '@crud';

export class InvoiceCatClaveProdServModel extends BaseModel {
  Clave: string;
  Descripcion: string;

  public static clone(oldModel: InvoiceCatClaveProdServModel): InvoiceCatClaveProdServModel {
    return !!oldModel ? Object.assign(new InvoiceCatClaveProdServModel(), oldModel) : null;
  }

  clear() {
    this.Clave = '';
    this.Descripcion = '';
  }
}
