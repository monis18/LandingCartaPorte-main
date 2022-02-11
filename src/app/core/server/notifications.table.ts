import { NotificationStatus } from '@enums/notification-status.interface';

export class NotificationsTable {
  public static notifications: any[] = [
    {
      id: 1,
      invoiceSenderId: 1,
      Description: 'Se han descargado 100 Facturas de Ingresos',
      Status: NotificationStatus.Unread,
      Date: new Date(),
    },
    {
      id: 2,
      invoiceSenderId: 1,
      Description: 'Se han descargado 15 Facturas de Egresos',
      Status: NotificationStatus.Unread,
      Date: new Date(),
    },
    {
      id: 3,
      invoiceSenderId: 1,
      Description: 'Tus archivos CSD van a expirar el día 24 de Junio de 2020',
      Status: NotificationStatus.Read,
      Date: new Date(2020, 5, 27),
    },
    {
      id: 4,
      invoiceSenderId: 1,
      Description: 'Tu contador no está trabajando',
      Status: NotificationStatus.Read,
      Date: new Date(2020, 4, 27),
    },
  ];
}
