import { NotificationStatus } from '@enums/notification-status.interface';

export class NotificationModel {
  id: number;
  invoiceSenderId: number;
  Description: string;
  Status: number | NotificationStatus;
  Date: Date;
}
