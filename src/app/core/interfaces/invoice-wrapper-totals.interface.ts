import { InvoiceTotalsByStatus } from '@interfaces/invoice-totals-by-status.interface';

export interface InvoiceWrapperTotals {
  [wrapperId: string]: InvoiceTotalsByStatus;
}
