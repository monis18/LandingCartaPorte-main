import { BaseModel } from '@crud';

export class LeyendaFiscalModel extends BaseModel {
  norma: string;
  textoLeyenda: string;
  disposicionFiscal: string;

  public static clone(oldModel: LeyendaFiscalModel): LeyendaFiscalModel {
    return !!oldModel ? Object.assign(new LeyendaFiscalModel(), oldModel) : null;
  }

  clear() {
    this.norma = '';
    this.textoLeyenda = '';
    this.disposicionFiscal = '';
  }
}
