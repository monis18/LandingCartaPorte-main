import { BaseModel } from '@crud';
import { ImpuestosLocalesRetencionLocalModel } from './impuestos-locales-retencion-local.model';
import { ImpuestosLocalesTrasladoLocalModel } from './impuestos-locales-traslado-local.model';

export class InvoiceComplementoImpuestosLocalesModel extends BaseModel {
  version: '1.0';
  TotaldeTraslados: number;
  TotaldeRetenciones: number;

  TrasladosLocales?: ImpuestosLocalesTrasladoLocalModel[];
  RetencionesLocales?: ImpuestosLocalesRetencionLocalModel[];

  public static clone(oldModel: InvoiceComplementoImpuestosLocalesModel): InvoiceComplementoImpuestosLocalesModel {
    return !!oldModel ? Object.assign(new InvoiceComplementoImpuestosLocalesModel(), oldModel) : null;
  }

  clear() {
    this.version = '1.0';
    this.TotaldeTraslados = 0;
    this.TotaldeRetenciones = 0;
    this.TrasladosLocales = [];
    this.RetencionesLocales = [];
  }
}
