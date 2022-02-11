import { BaseModel } from '@crud';
import { InvoiceAddendaDGariModel } from './d-gari/invoice-addenda-d-gari.model';
import { InvoiceAddendaBuzonFiscalModel } from './invoice-addenda-buzon-fiscal.model';
import { InvoiceAddendaKNModel } from './invoice-addenda-kn.model';
import { InvoiceAddendaVWMModel } from './vwm/invoice-addenda-vwm.model';

export class InvoiceAddendasModel extends BaseModel {
  KN?: InvoiceAddendaKNModel;
  VWM?: InvoiceAddendaVWMModel;
  BuzonFiscal?: InvoiceAddendaBuzonFiscalModel;
  DGari?: InvoiceAddendaDGariModel;
}
