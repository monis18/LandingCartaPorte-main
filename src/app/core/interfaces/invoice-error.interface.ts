import { InvoiceModel } from '@models/invoice/invoice.model';

export interface InvoiceResponseError {
  status: 'BAD_REQUEST';
  errors: {
    codigo: string | number;
    descripcion: string;
    errores: string | string[];
  };
  invoice?: InvoiceModel;
}
