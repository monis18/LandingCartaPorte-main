import { BaseModel } from '@crud';
import { VWMDivision, VWMTipoDocumentoFiscal, VWMTipoDocumentoVWM } from '@enums/vwm.enums';

export class VWMFactura extends BaseModel {
  version: '1.0';
  tipoDocumentoFiscal: VWMTipoDocumentoFiscal;
  tipoDocumentoVWM: VWMTipoDocumentoVWM;
  division: VWMDivision;
}
