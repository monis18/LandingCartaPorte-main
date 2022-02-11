import { BaseModel } from '@crud';

export class InvoiceComplementoDonatariasModel extends BaseModel {
  version: '1.1';
  noAutorizacion: string;
  fechaAutorizacion: Date;
  leyenda: string;

  public static clone(oldModel: InvoiceComplementoDonatariasModel): InvoiceComplementoDonatariasModel {
    return !!oldModel ? Object.assign(new InvoiceComplementoDonatariasModel(), oldModel) : null;
  }

  clear() {
    this.version = '1.1';
    this.noAutorizacion = '';
    this.leyenda = '';
  }

  baseData() {
    this.fechaAutorizacion = new Date();
    // tslint:disable-next-line: max-line-length
    this.leyenda = 'Este comprobante ampara un donativo, el cual será destinado por la donataria a los fines propios de su objeto social. En el caso de que los bienes donados hayan sido deducidos previamente para los efectos del impuesto sobre la renta, este donativo no es deducible. La reproducción no autorizada de este comprobante constituye un delito en los términos de las disposiciones fiscales.';
  }
}
