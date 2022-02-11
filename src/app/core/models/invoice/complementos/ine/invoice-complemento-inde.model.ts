import { BaseModel } from '@crud';
import { INETipoComite, INETipoProceso } from '@enums/ine.enums';
import { INEEntidad } from './ine-entidad.model';

export class InvoiceComplementoINE extends BaseModel {
  Version: '1.1';
  TipoProceso: INETipoProceso;
  TipoComite: INETipoComite;
  IdContabilidad: number;
  Entidad: INEEntidad[];

  clear() {
    this.TipoProceso = null;
    this.TipoComite = null;
    this.IdContabilidad = null;
    this.Entidad = [];
  }

  baseData() {
    this.Version = '1.1';
  }
}
