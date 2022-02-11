import { BaseModel } from '@crud';

export class ImpuestosLocalesTrasladoLocalModel extends BaseModel {
  ImpLocTrasladado: string;
  TasadeTraslado: number;
  Importe: string;

  public static clone(oldModel: ImpuestosLocalesTrasladoLocalModel): ImpuestosLocalesTrasladoLocalModel {
    return !!oldModel ? Object.assign(new ImpuestosLocalesTrasladoLocalModel(), oldModel) : null;
  }

  clear() {
    this.ImpLocTrasladado = '';
    this.TasadeTraslado = null;
    this.Importe = null;
  }
}
