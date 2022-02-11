import { InvoiceCatClaveProdServTable } from './invoice-cat-clave-prod-serv.table';
import { InvoiceCatClaveUnidadTable } from './invoice-cat-clave-unidad.table';
import { InvoiceSenderClientsTable } from './invoice-sender-clients.table';
import { InvoiceSenderProductsTable } from './invoice-sender-products.table';
import { InvoiceSenderProvidersTable } from './invoice-sender-providers.table';
import { InvoiceSenderSeriesTable } from './invoice-sender-series.table';
import { InvoiceSendersTable } from './invoice-senders.table';
import { InvoicesTable } from './invoices.table';
import { PayrollInvoicesTable } from './payroll-invoices.table';
import { VSInvoicesTable } from './vs-invoices.table';

// Wrapper class
export class InvoicesDataContext {
  public static invoices: any[] = InvoicesTable.invoices;
  public static invoiceCatClaveProdServ: any[] = InvoiceCatClaveProdServTable.invoice_cat_clave_prod_serv;
  public static invoiceCatClaveUnidad: any[] = InvoiceCatClaveUnidadTable.invoice_cat_clave_prod_serv;
  public static invoiceSenderClients: any[] = InvoiceSenderClientsTable.invoice_sender_clients;
  public static invoiceSenderProducts: any[] = InvoiceSenderProductsTable.invoice_sender_products;
  public static invoiceSenderSeries: any[] = InvoiceSenderSeriesTable.invoice_sender_serise;
  public static invoiceSenders: any[] = InvoiceSendersTable.invoice_senders;
  public static invoiceSenderProviders: any[] = InvoiceSenderProvidersTable.invoice_sender_providers;
  public static vsInvoices: any[] = VSInvoicesTable.invoices;
  public static payrollInvoices: any[] = PayrollInvoicesTable.invoices;
}
