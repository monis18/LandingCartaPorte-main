import { BaseModel } from '@crud';
import { InvoiceCatRegimenFiscal } from '@enums/catalogues/invoice-cat-regimen-fiscal.enum';
import { InvoiceSenderClientModel } from './invoice-sender-client.model';
import { InvoiceSenderProductModel } from './invoice-sender-product.model';
import { InvoiceSenderSerieModel } from './invoice-sender-serie.model';

export class InvoiceSenderModel extends BaseModel {
  id: number;
  userId: number;
  BusinessName: string;
  Rfc: string;
  Regimen: InvoiceCatRegimenFiscal | string;
  AdditionalRegimen: InvoiceCatRegimenFiscal | string;
  Logo: string;
  Street: string;
  NumInt: string;
  NumOut: string;
  Zipcode: number;
  Location: string;
  City: string;
  Municipality: string;
  CerCsd: string;
  KeyCsd: string;
  CsdPass: string;
  ExpirationDateCsd: Date;
  CerField: string;
  KeyField: string;
  FieldPass: string;
  ExpirationDateField: Date;
  Ciec: string;
  Manifiesto: boolean; // si está el archivo de la field pero no se ha firmado
  ManifiestoFirma: string; // back lo regresa lleno si se firma correctamente el manifiesto
  InvoiceLugarExpedicion: string;
  NoCertificado: string;
  Origin: number;
  Curp: string;
  RegistroPatronal: string;
  RfcPatron: string;
  Email: string;

  Series?: InvoiceSenderSerieModel[];
  Products?: InvoiceSenderProductModel[];
  Clients?: InvoiceSenderClientModel[];

  clear() {
    this.id = null;
    this.userId = null;
    this.BusinessName = '';
    this.Rfc = '';
    this.Regimen = '';
    this.AdditionalRegimen = '';
    this.Logo = '';
    this.Street = '';
    this.NumInt = '';
    this.NumOut = '';
    this.Zipcode = null;
    this.Location = '';
    this.City = '';
    this.Municipality = '';
    this.CerCsd = '';
    this.KeyCsd = '';
    this.CsdPass = '';
    this.ExpirationDateCsd = null;
    this.CerField = '';
    this.KeyField = '';
    this.FieldPass = '';
    this.ExpirationDateField = null;
    this.Ciec = '';
    this.Manifiesto = null;
    this.ManifiestoFirma = null;
    this.InvoiceLugarExpedicion = '';
    this.Origin = null;
    this.Curp = '';
    this.RegistroPatronal = '';
    this.RfcPatron = '';
    this.Email = '';
  }
}
