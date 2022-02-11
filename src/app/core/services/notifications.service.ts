import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationStatus } from '@enums/notification-status.interface';
import { NotificationModel } from '@models/notification.model';
import { HttpUtilsService } from '@utils';
import { forkJoin, Observable } from 'rxjs';

const API_NOTIFICATIONS_URL = 'api/notifications';

@Injectable()
export class NotificationsService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService
  ) { }

  getNotifications(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${API_NOTIFICATIONS_URL}`);
  }

  updateNotificationStatus(notification: NotificationModel, status: NotificationStatus) {
    notification.Status = status;
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.put<NotificationModel>(`${API_NOTIFICATIONS_URL}/${notification.id}`, notification, { headers: httpHeaders });
  }

  readNotifications(notifications: NotificationModel[]) {
    const tasks$ = [];
    const length = notifications.length;
    for (let i = 0; i < length; i++) {
      tasks$.push(this.updateNotificationStatus({ ...notifications[i] }, NotificationStatus.Read));
    }
    return forkJoin(tasks$);
  }

  deleteNotification(id: number) {
    const url = `${API_NOTIFICATIONS_URL}/${id}`;
    return this.http.delete<NotificationModel>(url);
  }

}
