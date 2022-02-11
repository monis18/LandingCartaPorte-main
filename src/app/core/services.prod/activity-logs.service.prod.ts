import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IActivityLog } from '@interfaces/activity-log.interface';
import { HttpUtilsService } from '@utils';
import { Observable } from 'rxjs';

const ACTIVITY_API_URL = 'api/activityLogs';

@Injectable()
export class ActivityLogsService {

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService,
  ) { }

  getRecentActivity(): Observable<IActivityLog[]> {
    const url = `${environment.movementsEndpoint}/${ACTIVITY_API_URL}`;
    return this.http.get<IActivityLog[]>(url);
  }
}
