import { BaseModel } from '@crud';
import { VWMTipoProveedor } from '@enums/vwm.enums';

export class VWMProveedor extends BaseModel {
  codigo: VWMTipoProveedor;
  nombre: string;
  correoContacto: string;
}
