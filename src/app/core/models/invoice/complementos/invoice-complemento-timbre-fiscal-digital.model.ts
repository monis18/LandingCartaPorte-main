// tslint:disable: variable-name
export class InvoiceComplementoTimbreFiscalDigitalModel {
  invoiceId: number;
  Version = '1.1';
  UUID: string;
  FechaTimbrado: string;
  RfcProvCertif: string;
  Leyenda: string;
  SelloCFD: string;
  NoCertificadoSAT: string;
  SelloSAT: string;

  public static clone(oldModel: InvoiceComplementoTimbreFiscalDigitalModel): InvoiceComplementoTimbreFiscalDigitalModel {
    return !!oldModel ? Object.assign(new InvoiceComplementoTimbreFiscalDigitalModel(), oldModel) : null;
  }
}
