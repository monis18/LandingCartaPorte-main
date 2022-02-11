import { BaseModel } from '@crud';

export class ImpuestosLocalesRetencionLocalModel extends BaseModel {
  ImpLocRetenido: string;
  TasadeRetencion: number;
  Importe: string;

  public static clone(oldModel: ImpuestosLocalesRetencionLocalModel): ImpuestosLocalesRetencionLocalModel {
    return !!oldModel ? Object.assign(new ImpuestosLocalesRetencionLocalModel(), oldModel) : null;
  }

  clear() {
    this.ImpLocRetenido = '';
    this.TasadeRetencion = null;
    this.Importe = null;
  }
}
