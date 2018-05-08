import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthorizationService } from '../services';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class CanActivateGuard implements CanActivate {
  private result: boolean;
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {
    const listener: Subscription = this.authorizationService.isAuthenticated()
      .finally(() => listener.unsubscribe())
      .subscribe((result) => this.result = result)
    ;

  }

  public canActivate(): boolean {
    if (!this.result) {
      this.router.navigateByUrl('login');
    }
    return this.result;
  }
}
