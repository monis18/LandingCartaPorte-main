import { BaseModel } from '@crud';

export class InvoiceAddendaBuzonFiscalModel extends BaseModel {
  version: '2.0';
  TipoDocumento: {
    descripcion: string
  }[];

  clear() {
    this.version = '2.0';
    this.TipoDocumento = [];
  }

  baseData() {
    this.TipoDocumento = [{
      descripcion: ''
    }];
  }
}
