import { BaseModel } from '@crud';
import { VWMCodigoImpuesto } from '@enums/vwm.enums';

export class VWMPartes extends BaseModel {
  posicion: string;
  numeroMaterial: string;
  descripcionMaterial: string;
  cantidadMaterial: string;
  unidadMedida: string;
  precioUnitario: string;
  montoLinea: string;
  pesoBruto: string;
  pesoNeto: string;
  codigoImpuesto: VWMCodigoImpuesto;
  Referencias: {
    ordenCompra: string
  };
  Nota: string;

  clear() {
    this.posicion = null;
    this.numeroMaterial = null;
    this.descripcionMaterial = null;
    this.cantidadMaterial = null;
    this.unidadMedida = null;
    this.precioUnitario = null;
    this.montoLinea = null;
    this.pesoBruto = null;
    this.pesoNeto = null;
    this.codigoImpuesto = null;
    this.Referencias = {
      ordenCompra: null,
    };
    this.Nota = null;
  }
}
