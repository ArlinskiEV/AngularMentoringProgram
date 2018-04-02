import { Injectable } from '@angular/core';
import { User } from '../entities';
import { Observable } from 'rxjs/Observable';

import { NgZone } from '@angular/core';

@Injectable()
export class AuthorizationService {
  public source: Observable<any>;
  private user: User = {
    id: 0,
    userName: 'NoName',
  };
  private action: () => void;

  constructor(private _ngZone: NgZone) {
    console.log('### AuthorizationService constructor ###');
    this.source = new Observable((observer) => {
      this.action = () => { observer.next(''); };
    });

    // ----------------------------------------------------------------
    _ngZone.onStable.subscribe(() => console.log(`ngZone Stable. now=${Date.now()}`));
    // get onUnstable: EventEmitter<any>
    _ngZone.onUnstable.subscribe(() => console.log(`ngZone Unstable. now=${Date.now()}`));
    // get onStable: EventEmitter<any>

    // ----------------------------------------------------------------

  }
  public login(payload: any) {// how do it right??
    // Login (stores fake user info and token to local storage)

    console.log(`name:${payload.login}, pass:${payload.password}`);
    // userId = verify(payload);
    this.user.userName = payload.login;
    this.user.id = Math.trunc(1 + Math.random() * 10);
    this.action();
  }
  public logout() {
    // Logout (wipes fake user info and token from local storage)
    this.user = {id: 0, userName: 'NoName', };
    this.action();
  }
  public isAuthenticated() {
    // IsAuthenticated (boolean)
    return !!this.user.id;
  }
  public getUserInfo() {
    // GetUserInfo (returns user login)
    return {
      login: this.user.userName,
    };
  }

}
