import { BaseModel } from '@crud';
import { InvoiceCatClaveProdServ } from '@enums/catalogues/invoice-cat-clave-prod-serv.enum';
import { InvoiceCatClaveUnidad } from '@enums/catalogues/invoice-cat-clave-unidad.enum';
import { InvoiceConceptoImpuestoModel } from './impuestos/invoice-concepto-impuesto.model';
import { InvoiceConceptoComplementoConceptoModel } from './invoice-concepto-complemento-concepto.model';
import { InvoiceConceptoCuentaPredialModel } from './invoice-concepto-cuenta-predial.model';
import { InvoiceConceptoInformacionAduanera } from './invoice-concepto-informacion-aduanera.model';
import { InvoiceConceptoParteModel } from './invoice-concepto-parte.model';

// tslint:disable: variable-name
export class InvoiceConceptoModel extends BaseModel {
  id: number;
  invoiceId: number;
  ClaveProdServ: string | InvoiceCatClaveProdServ;
  NoIdentificacion: string;
  Cantidad: number;
  ClaveUnidad: string | InvoiceCatClaveUnidad;
  Unidad: string;
  Descripcion: string;
  ValorUnitario: number;
  Importe: number;
  Descuento: number;

  Impuestos?: InvoiceConceptoImpuestoModel[];
  CuentaPredial?: InvoiceConceptoCuentaPredialModel[];
  InformacionAduanera?: InvoiceConceptoInformacionAduanera[];
  ComplementoConcepto?: InvoiceConceptoComplementoConceptoModel[];
  Parte?: InvoiceConceptoParteModel[];

  public static clone(oldModel: InvoiceConceptoModel): InvoiceConceptoModel {
    return !!oldModel ? Object.assign(new InvoiceConceptoModel(), {
      ...oldModel,
      Impuestos: oldModel.Impuestos ?
        oldModel.Impuestos.map(i => InvoiceConceptoImpuestoModel.clone(i)) : [],
      CuentaPredial: oldModel.CuentaPredial ?
        oldModel.CuentaPredial.map(cP => InvoiceConceptoCuentaPredialModel.clone(cP)) : [],
      InformacionAduanera: oldModel.InformacionAduanera ?
        oldModel.InformacionAduanera.map(iA => InvoiceConceptoInformacionAduanera.clone(iA)) : [],
      ComplementoConcepto: oldModel.ComplementoConcepto ?
        oldModel.ComplementoConcepto.map(cC => InvoiceConceptoComplementoConceptoModel.clone(cC)) : [],
      Parte: oldModel.Parte ?
        oldModel.Parte.map(p => InvoiceConceptoParteModel.clone(p)) : [],
    }) : null;
  }

  clear() {
    this.id = null;
    this.invoiceId = null;
    this.ClaveProdServ = null;
    this.NoIdentificacion = null;
    this.Cantidad = null;
    this.ClaveUnidad = null;
    this.Unidad = null;
    this.Descripcion = null;
    this.ValorUnitario = null;
    this.Importe = null;
    this.Descuento = null;
    this.Impuestos = [];
    this.CuentaPredial = [];
    this.InformacionAduanera = [];
    this.ComplementoConcepto = [];
    this.Parte = [];
  }

  baseData() {
    // this.ClaveProdServ = '202020';
    // this.Cantidad = 3;
    // this.ClaveUnidad = '303030';
    // this.Descripcion = 'Descripción Test';
    // this.ValorUnitario = 100;
    // this.Importe = this.Cantidad * this.ValorUnitario;
  }
}
