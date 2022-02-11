import { BaseModel } from '@crud';
import { VWMArchivo } from './vwm-archivo.model';
import { VWMDestino } from './vwm-destino.model';
import { VWMFactura } from './vwm-factura.model';
import { VWMMedidas } from './vwm-medidas.model';
import { VWMMoneda } from './vwm-moneda.model';
import { VWMPartes } from './vwm-partes.model';
import { VWMProveedor } from './vwm-proveedor.model';
import { VWMReferencias } from './vwm-referencias.model';
import { VWMSolicitante } from './vwm-solicitante.model';

export class InvoiceAddendaVWMModel extends BaseModel {
  Factura: VWMFactura;
  Moneda: VWMMoneda;
  Proveedor: VWMProveedor;
  Destino?: VWMDestino;
  Medidas?: VWMMedidas;
  Referencias: VWMReferencias;
  Solicitante: VWMSolicitante;
  Archivo?: VWMArchivo;
  Partes: VWMPartes;

  clear() {
    this.Factura = null;
    this.Moneda = null;
    this.Proveedor = null;
    this.Destino = null;
    this.Medidas = null;
    this.Referencias = null;
    this.Solicitante = null;
    this.Archivo = null;
    this.Partes = null;
  }

  baseData() {
    this.Factura = new VWMFactura(true);
    this.Moneda = new VWMMoneda(true);
    this.Proveedor = new VWMProveedor(true);
    this.Destino = new VWMDestino(true);
    this.Medidas = new VWMMedidas(true);
    this.Referencias = new VWMReferencias(true);
    this.Solicitante = new VWMSolicitante(true);
    this.Archivo = new VWMArchivo(true);
    this.Partes = new VWMPartes(true);
  }
}
