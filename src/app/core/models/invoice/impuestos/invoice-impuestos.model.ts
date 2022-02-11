import { BaseModel } from '@crud';
import { InvoiceImpuestosRetencionModel } from './invoice-impuestos-retencion.model';
import { InvoiceImpuestosTrasladoModel } from './invoice-impuestos-traslado.model';

// tslint:disable: variable-name
export class InvoiceImpuestosModel extends BaseModel {
  id: number;
  invoiceId?: number;
  invoicePagoId?: number;

  TotalImpuestosRetenidos: number;
  TotalImpuestosTrasladados: number;

  Traslados?: InvoiceImpuestosTrasladoModel[];
  Retenciones?: InvoiceImpuestosRetencionModel[];

  public static clone(oldModel: InvoiceImpuestosModel): InvoiceImpuestosModel {
    return !!oldModel ? Object.assign(new InvoiceImpuestosModel(), {
      ...oldModel,
      Traslados: oldModel.Traslados ? oldModel.Traslados.map(i => InvoiceImpuestosTrasladoModel.clone(i)) : [],
      Retenciones: oldModel.Retenciones ? oldModel.Retenciones.map(r => InvoiceImpuestosRetencionModel.clone(r)) : [],
    }) : null;
  }
}
