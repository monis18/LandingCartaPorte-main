import { BaseModel } from '@crud';
import { InvoiceCatFormaPago } from '@enums/catalogues/invoice-cat-forma-pago.enum';
import { InvoiceCatMetodoPago } from '@enums/catalogues/invoice-cat-metodo-pago.enum';
import { InvoiceCatMoneda } from '@enums/catalogues/invoice-cat-moneda.enum';
import { InvoiceCatTipoDeComprobante } from '@enums/catalogues/invoice-cat-tipo-de-comprobante.enum';
import { InvoiceStatus } from '@enums/invoice-status.enum';
import { InvoiceAddendasModel } from './addendas/invoice-addenda.model';
import { InvoiceComplementosModel } from './complementos/invoice-complemento.model';
import { InvoiceConceptoModel } from './conceptos/invoice-concepto.model';
import { InvoiceImpuestosModel } from './impuestos/invoice-impuestos.model';
import { InvoiceCfdiRelacionadosModel } from './invoice-cfdi-relacionados.model';
import { InvoiceEmisorModel } from './invoice-emisor.model';
import { InvoiceReceptorModel } from './invoice-receptor.model';

// tslint:disable: variable-name
export class InvoiceModel extends BaseModel {
  id: number;
  EmisorId: number;
  Serie: string;
  Folio: string;
  Fecha: Date;
  Total: number;
  SubTotal: number;
  Descuento: number;
  FormaPago: InvoiceCatFormaPago | string;
  CondicionesDePago: string;
  Moneda: InvoiceCatMoneda | string;
  TipoCambio: number;
  TipoDeComprobante: string;
  MetodoPago: InvoiceCatMetodoPago | string;
  LugarExpedicion: string;
  Version: string;
  Certificado: string;
  Sello: string;
  NoCertificado: string;
  Confirmacion: string;
  Observaciones: string;
  Status: number;
  UUID: string;
  EsIngreso: boolean;
  FechaStatus: Date;
  Deducible: boolean;

  Emails: string[];
  Emisor?: InvoiceEmisorModel;
  Receptor?: InvoiceReceptorModel;
  Conceptos?: InvoiceConceptoModel[];
  Impuestos?: InvoiceImpuestosModel[];
  Complementos?: InvoiceComplementosModel;
  CfdiRelacionados?: InvoiceCfdiRelacionadosModel;
  Addendas?: InvoiceAddendasModel;

  public static clone(oldModel: InvoiceModel): InvoiceModel {
    return !!oldModel ? Object.assign(new InvoiceModel(), {
      ...oldModel,
      Emisor: oldModel.Emisor !== undefined ? InvoiceEmisorModel.clone(oldModel.Emisor) : null,
      Receptor: oldModel.Receptor !== undefined ? InvoiceReceptorModel.clone(oldModel.Receptor) : null,
      Conceptos: oldModel.Conceptos !== undefined ? oldModel.Conceptos.map(concepto => InvoiceConceptoModel.clone(concepto)) : [],
      Impuestos: oldModel.Impuestos !== undefined ? oldModel.Impuestos.map(i => InvoiceImpuestosModel.clone(i)) : [],
      Complementos: oldModel.Complementos !== undefined ? InvoiceComplementosModel.clone(oldModel.Complementos) : null,
      CfdiRelacionados: oldModel.CfdiRelacionados !== undefined ? InvoiceCfdiRelacionadosModel.clone(oldModel.CfdiRelacionados) : null,
      Addendas: oldModel.Addendas !== undefined ? InvoiceAddendasModel.clone(oldModel.Addendas) : null,
    }) : null;
  }

  clear() {
    this.id = null;
    this.EmisorId = null;
    this.Serie = '';
    this.Folio = '';
    this.Fecha = null;
    this.Total = 0;
    this.SubTotal = 0;
    this.Descuento = 0;
    this.FormaPago = InvoiceCatFormaPago.Efectivo;
    this.CondicionesDePago = '';
    this.Moneda = InvoiceCatMoneda['Peso Mexicano'];
    this.TipoCambio = null;
    this.TipoDeComprobante = '';
    this.MetodoPago = '';
    this.LugarExpedicion = '';
    this.Version = '3.3';
    this.Certificado = '';
    this.Sello = '';
    this.NoCertificado = '';
    this.Confirmacion = '';
    this.Observaciones = '';
    this.UUID = '';
    this.Status = InvoiceStatus['Sin Pagar'];
    this.EsIngreso = true;
    this.FechaStatus = null;
    this.Deducible = false;

    this.Emails = [];
    this.Emisor = null;
    this.Receptor = null;
    this.Conceptos = [];
    this.Impuestos = [];
    this.Complementos = null;
    this.CfdiRelacionados = null;
    this.Addendas = null;
  }

  baseData() {
    this.Serie = '';
    this.Folio = '';
    this.Fecha = new Date();
    this.Total = 0;
    this.SubTotal = 0;
    this.Descuento = 0;
    this.FormaPago = InvoiceCatFormaPago.Efectivo;
    this.CondicionesDePago = '';
    this.Moneda = InvoiceCatMoneda['Peso Mexicano'];
    this.TipoCambio = null;
    this.TipoDeComprobante = InvoiceCatTipoDeComprobante.Ingreso;
    this.MetodoPago = InvoiceCatMetodoPago['Pago en una sola exhibición'];

    this.Emisor = new InvoiceEmisorModel(true);
    this.Receptor = new InvoiceReceptorModel(true);
    this.Conceptos = [];
    this.Impuestos = [];
    this.Complementos = null;
    this.CfdiRelacionados = null;
    this.Addendas = null;
  }

}
