import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logout } from '@auth/actions/auth.actions';
import { AuthenticationService } from '@auth/services/authentication.service';
import { StorageService } from '@auth/services/storage.service';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlExluded = '/api/auth';
    const tokenSender = this.storage.get('tokenSender') as string;
    const tokenUser = this.storage.get('tokenUser') as string;
    const id = this.storage.get('active') as number;

    return next.handle(request);
  }

  validateTokenExpire(token): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    // const date = new Date(expiry * 1000);
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }
}
