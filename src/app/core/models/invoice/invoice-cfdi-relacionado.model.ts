import { BaseModel } from '@crud';

// tslint:disable: variable-name
export class InvoiceCfdiRelacionadoModel extends BaseModel {
  id: number;
  invoiceCfdiRelacionadosId: number;
  UUID: string;

  public static clone(oldModel: InvoiceCfdiRelacionadoModel): InvoiceCfdiRelacionadoModel {
    return !!oldModel ? Object.assign(new InvoiceCfdiRelacionadoModel(), oldModel) : null;
  }
}
