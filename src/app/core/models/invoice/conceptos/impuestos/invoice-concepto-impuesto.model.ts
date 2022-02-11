import { BaseModel } from '@crud';
import { InvoiceConceptoImpuestoRetencionModel } from './invoice-concepto-impuesto-retencion.model';
import { InvoiceConceptoImpuestoTrasladoModel } from './invoice-concepto-impuesto-traslado.model';

export class InvoiceConceptoImpuestoModel extends BaseModel {
  Traslados?: InvoiceConceptoImpuestoTrasladoModel[];
  Retenciones?: InvoiceConceptoImpuestoRetencionModel[];

  public static clone(oldModel: InvoiceConceptoImpuestoModel): InvoiceConceptoImpuestoModel {
    return !!oldModel ? Object.assign(new InvoiceConceptoImpuestoModel(), {
      ...oldModel,
      Traslados: oldModel.Traslados ? oldModel.Traslados.map(i => InvoiceConceptoImpuestoTrasladoModel.clone(i)) : [],
      Retenciones: oldModel.Retenciones ? oldModel.Retenciones.map(r => InvoiceConceptoImpuestoRetencionModel.clone(r)) : [],
    }) : null;
  }

  clear() {
    this.Traslados = [];
    this.Retenciones = [];
  }
}
