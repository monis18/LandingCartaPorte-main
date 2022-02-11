import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '@auth/services/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const tokenUser = this.storageService.get('tokenUser');
    const tokenSender = this.storageService.get('tokenSender');
    const user = this.storageService.get('user');
    const senders = this.storageService.get('senders');

    if (tokenUser && tokenSender && user && senders) {
        return true;
    }
    // return true;
    // if (currentUser) {
    //     return true;
    // }

    this.router.navigate(['/inicio/entrar'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
