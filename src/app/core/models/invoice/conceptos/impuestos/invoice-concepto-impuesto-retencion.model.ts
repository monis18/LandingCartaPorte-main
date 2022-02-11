import { BaseModel } from '@crud';
import { InvoiceCatImpuesto } from '@enums/catalogues/invoice-cat-impuesto.enum';
import { InvoiceCatTipoFactor } from '@enums/catalogues/invoice-cat-tipo-factor.enum';
import { InvoiceImpuestoIepsRetencion } from '@enums/invoice-impuesto-ieps-retencion.enum';
import { InvoiceImpuestoIepsTraslado } from '@enums/invoice-impuesto-ieps-traslado.enum';
import { InvoiceImpuestoIvaTraslado } from '@enums/invoice-impuesto-iva-traslado.enum';

// tslint:disable: variable-name
export class InvoiceConceptoImpuestoRetencionModel extends BaseModel {
  id: number;
  invoiceConceptoId: number;
  Base: number;
  Impuesto: InvoiceCatImpuesto | string;
  TipoFactor: InvoiceCatTipoFactor | string;
  TasaOCuota?: InvoiceImpuestoIvaTraslado | InvoiceImpuestoIepsTraslado | InvoiceImpuestoIepsRetencion | string;
  Importe: number;

  public static clone(oldModel: InvoiceConceptoImpuestoRetencionModel): InvoiceConceptoImpuestoRetencionModel {
    return !!oldModel ? Object.assign(new InvoiceConceptoImpuestoRetencionModel(), oldModel) : null;
  }
}
