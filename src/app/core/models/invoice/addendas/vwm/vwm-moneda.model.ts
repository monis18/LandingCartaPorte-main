import { BaseModel } from '@crud';
import { VWMCodigoImpuesto, VWMTipoMoneda } from '@enums/vwm.enums';

export class VWMMoneda extends BaseModel {
  tipoMoneda: VWMTipoMoneda;
  tipoCambio: string;
  codigoImpuesto: VWMCodigoImpuesto;
}
