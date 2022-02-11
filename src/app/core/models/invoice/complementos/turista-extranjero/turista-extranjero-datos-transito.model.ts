import { BaseModel } from '@crud';

export class TuristaExtranjeroDatosTransito extends BaseModel {
  Via: 'Aérea' | 'Marítima' | 'Terrestre';
  TipoId: string;
  NumeroId: string;
  Nacionalidad: string;
  EmpresaTransporte: string;
  IdTransporte?: string;

  clear() {
    this.Via = null;
    this.TipoId = null;
    this.NumeroId = null;
    this.Nacionalidad = null;
    this.EmpresaTransporte = null;
    this.IdTransporte = null;
  }

  baseData() {
    this.Via = 'Aérea';
  }
}
