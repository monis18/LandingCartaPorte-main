// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';

@Injectable()
export class ModuleGuard implements CanActivate {
  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const moduleName = route.data.moduleName as string;
    if (!moduleName) {
      return of(false);
    }

  }
}
