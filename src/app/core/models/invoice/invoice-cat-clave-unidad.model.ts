import { BaseModel } from '@crud';

export class InvoiceCatClaveUnidadModel extends BaseModel {
  Clave: string;
  Descripcion: string;

  public static clone(oldModel: InvoiceCatClaveUnidadModel): InvoiceCatClaveUnidadModel {
    return !!oldModel ? Object.assign(new InvoiceCatClaveUnidadModel(), oldModel) : null;
  }

  clear() {
    this.Clave = '';
    this.Descripcion = '';
  }
}
