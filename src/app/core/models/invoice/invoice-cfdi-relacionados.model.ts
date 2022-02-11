import { BaseModel } from '@crud';
import { InvoiceCatTipoRelacion } from '@enums/catalogues/invoice-cat-tipo-relacion.enum';
import { InvoiceCfdiRelacionadoModel } from './invoice-cfdi-relacionado.model';

// tslint:disable: variable-name
export class InvoiceCfdiRelacionadosModel extends BaseModel {
  id: number;
  invoiceId: number;

  CfdiRelacionado: InvoiceCfdiRelacionadoModel[];
  TipoRelacion: string | InvoiceCatTipoRelacion;

  public static clone(oldModel: InvoiceCfdiRelacionadosModel): InvoiceCfdiRelacionadosModel {
    return !!oldModel ? Object.assign(new InvoiceCfdiRelacionadosModel(), oldModel) : null;
  }

  clear() {
    this.id = null;
    this.invoiceId = null;
    this.CfdiRelacionado = [];
    this.TipoRelacion = null;
  }
}
