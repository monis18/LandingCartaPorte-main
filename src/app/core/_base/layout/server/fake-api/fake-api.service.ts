// Angular
import { Injectable } from '@angular/core';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { ActivityLogsTable } from '@server/activity-logs.table';
import { BlackListRecordsTable } from '@server/black-list-records.table';
import { CustomersTable } from '@server/customers.table';
import { DiotRecordsTable } from '@server/diot-records.table';
import { InvoiceSenderBlackListTable } from '@server/invoice-sender-black-list.table';
import { InvoicesDataContext } from '@server/invoices.data-context';
import { NotificationsTable } from '@server/notifications.table';
import { UsersDataContext } from '@server/users.data.context';
// Angular in memory
import { getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
// RxJS
import { Observable } from 'rxjs';

@Injectable()
export class FakeApiService implements InMemoryDbService {
  /**
	  * Service Constructore
   */
  responseOverridden: ResponseOptions;
  constructor(
    // private http: HttpClient,
    // private httpUtils: HttpUtilsService,
  ) { }

  processVsSatSync() {
    // const notification = new NotificationModel();
    // notification.Description = 'Notification from FakeApi';
    // const httpHeaders = this.httpUtils.getHTTPHeaders();
    // this.http.post('api/notifications', notification, { headers: httpHeaders }).subscribe(() => {
    //   this.http.get<NotificationModel[]>(`api/notifications`).subscribe(response => {
    //     console.log('notifications response', response);
    //   });
    // });
  }

  get(reqInfo: RequestInfo, db: {}) {

    if (reqInfo.url.includes('api/invoices/sync')) {
      const params = new URLSearchParams(reqInfo.url.replace('api/invoices/sync?', ''));
      const from = new Date(params.get('from'));
      const to = new Date(params.get('to'));
      InvoicesDataContext.vsInvoices
        .filter((invoice: InvoiceModel) => {
          const invoiceDate = new Date(invoice.Fecha);
          return invoiceDate >= from && invoiceDate <= to;
        })
        .filter((invoice: InvoiceModel) => {
          return !(reqInfo.collection as InvoiceModel[]).find(i => i.id === invoice.id);
        })
        .map((invoice: InvoiceModel) => (reqInfo.collection as InvoiceModel[]).push(invoice));
      return reqInfo.utils.createResponse$(() => {
        const options: ResponseOptions = {
          body: {},
          status: STATUS.OK
        };
        return this.finishOptions(options, reqInfo);
      });
    }

    if (reqInfo.url.includes('api/invoiceSenderBlackList')) {
      const params = new URLSearchParams(reqInfo.url.replace('api/invoiceSenderBlackList?', ''));
      const invoiceSenderId = Number(params.get('invoiceSenderId'));
      return reqInfo.utils.createResponse$(() => {
        const options: ResponseOptions = {
          body: InvoiceSenderBlackListTable.records.filter(r => r.invoiceSenderId === invoiceSenderId),
          status: STATUS.OK
        };
        return this.finishOptions(options, reqInfo);
      });
    }

    switch (reqInfo.url) {
      case 'api/invoices/uploadExcel':
        console.log('api/invoices/uploadExcel', reqInfo);
        return reqInfo.utils.createResponse$(() => {
          const options: ResponseOptions = {
            body: InvoicesDataContext.payrollInvoices,
            status: STATUS.OK
          };
          return this.finishOptions(options, reqInfo);
        });
      case 'api/users/updatePassword':
        console.log(reqInfo);
        return reqInfo.utils.createResponse$(() => {
          const options: ResponseOptions = {
            body: {},
            status: STATUS.OK
          };
          return this.finishOptions(options, reqInfo);
        });
      case 'api/login':
        return reqInfo.utils.createResponse$(() => {
          const options: ResponseOptions = {
            body: { code: '123' },
            status: STATUS.OK
          };
          return this.finishOptions(options, reqInfo);
        });
      case 'api/login/newPassword':
        return reqInfo.utils.createResponse$(() => {
          const options: ResponseOptions = {
            body: { text: 'La nueva contrasena se envio al correo' },
            status: STATUS.OK
          };
          return this.finishOptions(options, reqInfo);
        });
      case 'api/login/token':
        return reqInfo.utils.createResponse$(() => {
          const options: ResponseOptions = {
            body: { token: '5i8oWNpOiATQRjfw1r0N9cIdSEiT0x8KTLNlpWG4jrgtP5PD' },
            status: STATUS.OK
          };
          return this.finishOptions(options, reqInfo);
        });
      case 'api/users/sendEmail':
        return reqInfo.utils.createResponse$(() => {
          const options: ResponseOptions = {
            body: { text: 'se envio un correo' },
            status: STATUS.OK
          };
          return this.finishOptions(options, reqInfo);
        });
      default:
        return;
    }
  }

  private finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }

  createDb(): {} | Observable<{}> {

    const codes = [
      { id: 1, code: '1143' },
      { id: 2, code: '1254' },
      { id: 3, code: '5482' },
      { id: 4, code: '9456' },
      { id: 5, code: '8794' }
    ];

    const db = {
      // users2,
      codes,

      // customized tables
      invoices: InvoicesDataContext.invoices,
      invoiceCatClaveProdServ: InvoicesDataContext.invoiceCatClaveProdServ,
      invoiceCatClaveUnidad: InvoicesDataContext.invoiceCatClaveUnidad,
      invoiceSenderClients: InvoicesDataContext.invoiceSenderClients,
      invoiceSenderProducts: InvoicesDataContext.invoiceSenderProducts,
      invoiceSenderSeries: InvoicesDataContext.invoiceSenderSeries,
      invoiceSenders: InvoicesDataContext.invoiceSenders,
      invoiceSenderProviders: InvoicesDataContext.invoiceSenderProviders,
      payrollInvoices: InvoicesDataContext.payrollInvoices,
      users: UsersDataContext.users,
      notifications: NotificationsTable.notifications,
      blacklistRecords: BlackListRecordsTable.records,
      diotRecords: DiotRecordsTable.records,
      payments: UsersDataContext.payments,
      customers: CustomersTable.customers,
      invoiceSenderBlackList: InvoiceSenderBlackListTable.records,
      activityLogs: ActivityLogsTable.logs,
    };
    return db;
  }
}
