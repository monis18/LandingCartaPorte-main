import { BaseModel } from '@crud';
import { LeyendaFiscalModel } from './leyenda-fiscal.model';

export class InvoiceComplementoLeyendasFiscalesModel extends BaseModel {
  version: '1.0';
  Leyendas: LeyendaFiscalModel[];

  public static clone(oldModel: InvoiceComplementoLeyendasFiscalesModel): InvoiceComplementoLeyendasFiscalesModel {
    return !!oldModel ? Object.assign(new InvoiceComplementoLeyendasFiscalesModel(), oldModel) : null;
  }

  clear() {
    this.version = '1.0';
    this.Leyendas = [];
  }
}
