import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthorizationService } from '../services';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {}

  public canActivate() {

    if (this.authorizationService.isAuthenticated()) {
      return true;
    }

    this.router.navigateByUrl('login');
    return false;
  }
}
