import { BaseModel } from '@crud';
import { VWMUnidadDeNegocios } from '@enums/vwm.enums';

export class VWMReferencias extends BaseModel {
  referenciaProveedor: string;
  remision: string;
  numeroASN: string;
  unidadNegocios: VWMUnidadDeNegocios;
}
