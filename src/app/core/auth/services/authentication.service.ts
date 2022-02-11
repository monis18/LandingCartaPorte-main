import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@models/user/user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  mySubscription: any;
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(this.storage.get('currentUser') as UserModel);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  sendLandingInfo(nombre: string, correo: string, necesidad: string, whatsapp: string): Observable<any> {
    return of(200).pipe(delay(8000));
  }

}
