import { BaseModel } from '@crud';
import { InvoiceCatFormaPago } from '@enums/catalogues/invoice-cat-forma-pago.enum';
import { InvoiceCatMoneda } from '@enums/catalogues/invoice-cat-moneda.enum';
import { InvoiceImpuestosModel } from '@models/invoice/impuestos/invoice-impuestos.model';
import { InvoiceComplementoPagoDoctoRelacionadoModel } from './invoice-complemento-pago-docto-relacionado.model';

export class InvoiceComplementoPagoModel extends BaseModel {
  id: number;
  invoiceId: number;

  FechaPago: Date;
  FormaDePagoP: InvoiceCatFormaPago | string;
  MonedaP: InvoiceCatMoneda | string;
  TipoCambioP: number;
  Monto: number;
  NumOperacion: string;
  RfcEmisorCtaOrd: string;
  NomBancoOrdExt: string;
  CtaOrdenante: string;
  RfcEmisorCtaBen: string;
  CtaBeneficiario: string;
  TipoCadPago: string;
  CertPago: string;
  CadPago: string;
  SelloPago: string;

  DoctoRelacionados?: InvoiceComplementoPagoDoctoRelacionadoModel[];
  Impuestos?: InvoiceImpuestosModel[];

  public static clone(oldModel: InvoiceComplementoPagoModel): InvoiceComplementoPagoModel {
    return !!oldModel ? Object.assign(new InvoiceComplementoPagoModel(), oldModel) : null;
  }

  clear() {
    this.id = null;
    this.invoiceId = null;
    this.FechaPago = new Date();
    this.FormaDePagoP = '';
    this.MonedaP = '';
    this.TipoCambioP = null;
    this.Monto = 0;
    this.NumOperacion = '';
    this.RfcEmisorCtaOrd = '';
    this.NomBancoOrdExt = '';
    this.CtaOrdenante = '';
    this.RfcEmisorCtaBen = '';
    this.CtaBeneficiario = '';
    this.TipoCadPago = '';
    this.CertPago = '';
    this.CadPago = '';
    this.SelloPago = '';

    this.DoctoRelacionados = [];
    this.Impuestos = [];
  }

  baseData() {
    this.MonedaP = InvoiceCatMoneda['Peso Mexicano'];
    this.FormaDePagoP = InvoiceCatFormaPago.Efectivo;
  }
}
