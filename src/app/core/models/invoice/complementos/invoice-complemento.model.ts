import { BaseModel } from '@crud';
import { InvoiceComplementoDetallistaModel } from './detallista/invoice-complemento-detallista.model';
import { InvoiceComplementoImpuestosLocalesModel } from './impuestos-locales/invoice-complemento-impuestos-locales.model';
import { InvoiceComplementoINE } from './ine/invoice-complemento-inde.model';
import { InvoiceComplementoDonatariasModel } from './invoice-complemento-donatarias.model';
import { InvoiceComplementoTimbreFiscalDigitalModel } from './invoice-complemento-timbre-fiscal-digital.model';
import { InvoiceComplementoLeyendasFiscalesModel } from './leyendas-fiscales/invoice-complemento-leyendas-fiscales.model';
import { InvoiceComplementoPagosModel } from './pagos/invoice-complemento-pagos.model';
import { InvoiceComplementoTuristaExtranjero } from './turista-extranjero/invoice-complemento-turista-extranjero.model';
import { InvoiceComplementoNominaModel } from './nomina/invoice-complemento-nomina.model';

export class InvoiceComplementosModel extends BaseModel {
  ComplementoPagos?: InvoiceComplementoPagosModel;
  TimbreFiscalDigital?: InvoiceComplementoTimbreFiscalDigitalModel;
  ImpuestosLocales?: InvoiceComplementoImpuestosLocalesModel;
  Donatarias?: InvoiceComplementoDonatariasModel;
  LeyendasFiscales?: InvoiceComplementoLeyendasFiscalesModel;
  Detallista?: InvoiceComplementoDetallistaModel;
  INE?: InvoiceComplementoINE;
  TuristaPasajeroExtranjero?: InvoiceComplementoTuristaExtranjero;
  Nomina?: InvoiceComplementoNominaModel;

  public static clone(oldModel: InvoiceComplementosModel): InvoiceComplementosModel {
    return !!oldModel ? Object.assign(new InvoiceComplementosModel(), oldModel) : null;
  }

  clear() {
    this.ComplementoPagos = null;
    this.TimbreFiscalDigital = null;
    this.ImpuestosLocales = null;
    this.Donatarias = null;
    this.LeyendasFiscales = null;
    this.Detallista = null;
    this.INE = null;
    this.TuristaPasajeroExtranjero = null;
    this.Nomina = null;
  }
}
