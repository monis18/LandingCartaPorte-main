import { BaseModel } from '@crud';
import { InvoiceCatMetodoPago } from '@enums/catalogues/invoice-cat-metodo-pago.enum';
import { InvoiceCatMoneda } from '@enums/catalogues/invoice-cat-moneda.enum';

export class InvoiceComplementoPagoDoctoRelacionadoModel extends BaseModel {
  id: number;
  invoicePagoId: number;

  IdDocumento: string;
  Serie: string;
  Folio: string;
  MonedaDR: InvoiceCatMoneda | string;
  TipoCambioDR: number;
  MetodoDePagoDR: InvoiceCatMetodoPago | string;
  NumParcialidad: number;
  ImpSaldoAnt: number;
  ImpPagado: number;
  ImpSaldoInsoluto: number;

  public static clone(oldModel: InvoiceComplementoPagoDoctoRelacionadoModel): InvoiceComplementoPagoDoctoRelacionadoModel {
    return !!oldModel ? Object.assign(new InvoiceComplementoPagoDoctoRelacionadoModel(), oldModel) : null;
  }

  clear() {
    this.id = null;
    this.invoicePagoId = null;
    this.IdDocumento = '';
    this.Serie = '';
    this.Folio = '';
    this.MonedaDR = InvoiceCatMoneda['Peso Mexicano'];
    this.TipoCambioDR = null;
    this.MetodoDePagoDR = InvoiceCatMetodoPago['Pago en parcialidades o diferido'];
    this.NumParcialidad = null;
    this.ImpSaldoAnt = null;
    this.ImpPagado = null;
    this.ImpSaldoInsoluto = null;
  }
}
