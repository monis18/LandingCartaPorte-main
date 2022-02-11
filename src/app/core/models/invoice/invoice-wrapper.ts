import { BaseModel } from '@crud';
import { InvoiceModel } from './invoice.model';

export class InvoiceWrapper extends BaseModel {
  id: string;
  month: number;
  year: number;
  manual: boolean;
  invoices: InvoiceModel[] = [];

  public static getIdByInvoiceFecha(invoice: InvoiceModel) {
    return String(invoice.Fecha).substr(0, 7);
  }

  public static clone(oldModel: InvoiceWrapper): InvoiceWrapper {
    return !!oldModel ? Object.assign(new InvoiceWrapper(), {
      ...oldModel,
      invoices: oldModel.invoices !== undefined ? oldModel.invoices.map(invoice => InvoiceModel.clone(invoice)) : [],
    }) : null;
  }

  getId?(): string {
    return `${this.year}-${('0' + (this.month + 1)).slice(-2)}`;
  }

  clean() {
    const clean = Object.assign(new InvoiceWrapper(), this);
    clean.invoices = [];
    return clean;
  }
}
