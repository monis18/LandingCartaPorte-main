import { BaseModel } from '@crud';
import { InvoiceCatUsoCfdi } from '@enums/catalogues/invoice-cat-uso-cfdi.enum';
import { InvoiceSenderClientModel } from '../invoice-sender/invoice-sender-client.model';

// tslint:disable: variable-name
export class InvoiceReceptorModel extends BaseModel {
  id: number;
  invoiceId: number;
  Rfc: string;
  Nombre: string;
  ResidenciaFiscal: string;
  NumRegIdTrib: string;
  UsoCFDI: InvoiceCatUsoCfdi | string;

  public static clone(oldModel: InvoiceReceptorModel): InvoiceReceptorModel {
    return !!oldModel ? Object.assign(new InvoiceReceptorModel(), oldModel) : null;
  }

  static InvoiceSenderClientToInvoiceReceptor(receptor: InvoiceReceptorModel): InvoiceSenderClientModel {
    const senderClient = new InvoiceSenderClientModel();
    senderClient.Rfc = receptor.Rfc;
    senderClient.Name = receptor.Nombre;
    senderClient.InvoiceCatUsoCfdi = receptor.UsoCFDI;
    return senderClient;
  }

  clear() {
    this.id = null;
    this.invoiceId = null;
    this.Rfc = '';
    this.Nombre = '';
    this.ResidenciaFiscal = null;
    this.NumRegIdTrib = null;
    this.UsoCFDI = null;
  }

  baseData() {
    this.UsoCFDI = InvoiceCatUsoCfdi['Por definir'];
  }
}
