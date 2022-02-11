import { BaseModel } from '@crud';
import { InvoiceComplementoPagoModel } from './invoice-complemento-pago.model';

export class InvoiceComplementoPagosModel extends BaseModel {
  Pagos: InvoiceComplementoPagoModel[];
  Version: '1.0';

  public static clone(oldModel: InvoiceComplementoPagosModel): InvoiceComplementoPagosModel {
    return !!oldModel ? Object.assign(new InvoiceComplementoPagosModel(), oldModel) : null;
  }

  clear() {
    this.Version = '1.0';
    this.Pagos = [];
  }

  baseData() {
    this.Pagos = [new InvoiceComplementoPagoModel(true)];
  }
}
