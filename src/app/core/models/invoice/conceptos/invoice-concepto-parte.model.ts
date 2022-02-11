import { BaseModel } from '@crud';
import { InvoiceCatClaveProdServ } from '@enums/catalogues/invoice-cat-clave-prod-serv.enum';
import { InvoiceCatClaveUnidad } from '@enums/catalogues/invoice-cat-clave-unidad.enum';
import { InvoiceConceptoInformacionAduanera } from './invoice-concepto-informacion-aduanera.model';

export class InvoiceConceptoParteModel extends BaseModel {
  // tslint:disable-next-line: variable-name
  invoice_concepto_id: number;
  ClaveProdServ: number & InvoiceCatClaveProdServ;
  NoIdentificacion: string;
  ClaveUnidad: number & InvoiceCatClaveUnidad;
  Unidad: string;
  Descripcion: string;
  ValorUnitario: number;
  Importe: number;

  InformacionAduanera?: InvoiceConceptoInformacionAduanera;

  public static clone(oldModel: InvoiceConceptoParteModel): InvoiceConceptoParteModel {
    return !!oldModel ? Object.assign(new InvoiceConceptoParteModel(), {
      ...oldModel,
      InformacionAduanera: oldModel.InformacionAduanera ? InvoiceConceptoInformacionAduanera.clone(oldModel.InformacionAduanera) : null
    }) : null;
  }
}
