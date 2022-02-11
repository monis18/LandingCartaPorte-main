import { NominaEmisorModel } from './nomina-emisor.model';
import { NominaReceptorModel } from './nomina-receptor.model';

export class InvoiceComplementoNominaModel {
  Version: '1.2';
  TipoNomina; // c_TipoNomina
  FechaPago: Date;
  FechaInicialPago: Date;
  FechaFinalPago: Date;
  NumDiasPagados: number;
  TotalPercepciones?: number;
  TotalDeducciones?: number;
  TotalOtrosPagos?: number;
  Emisor?: NominaEmisorModel;
  Receptor: NominaReceptorModel;
  Percepciones?: any;
  Deducciones?: any;
  OtrosPagos?: any;
  Incapacidades?: any;

  clear() {
    this.Version = '1.2';
    this.TipoNomina = null;
    this.FechaPago = null;
    this.FechaInicialPago = null;
    this.FechaFinalPago = null;
    this.NumDiasPagados = null;
    this.TotalPercepciones = null;
    this.TotalDeducciones = null;
    this.TotalOtrosPagos = null;
    this.Emisor = null;
    this.Receptor = null;
    this.Percepciones = null;
    this.Deducciones = null;
    this.OtrosPagos = null;
    this.Incapacidades = null;
  }
}
