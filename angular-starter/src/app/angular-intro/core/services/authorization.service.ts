import { Injectable } from '@angular/core';
import { User } from '../entities';
import { Observable } from 'rxjs/Observable';

import { NgZone } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthorizationService {
  public mySource: BehaviorSubject<any>;
  // object = {login: 'myLogin'}
  private user: User = {
    id: 0,
    userName: 'NoName(serv)',
  };

  constructor(private _ngZone: NgZone) {
    console.log('### AuthorizationService constructor ###');
    this.mySource = new BehaviorSubject({login: ''});

    // ----------------------------------------------------------------STABLE-UNSTABLE-TIMING
    let start = 0;
    _ngZone.onUnstable.subscribe(() => start = Date.now());
    _ngZone.onStable.subscribe(() =>
      console.log(`ngZone Stable. unstable time=${Date.now() - start}`));
    // ----------------------------------------------------------------

  }

  public login(payload: any) {// how do it right??
    // Login (stores fake user info and token to local storage)

    console.log(`name:${payload.login}, pass:${payload.password}`);
    // verify

    this.user.userName = payload.login;
    this.user.id = Math.trunc(1 + Math.random() * 10);
    this.mySource.next({login: this.user.userName});
  }
  public logout() {
    // Logout (wipes fake user info and token from local storage)
    this.user = {id: 0, userName: 'NoName', };
    this.mySource.next({login: ''});
  }
  public isAuthenticated() {
    // IsAuthenticated (boolean)
    return !!this.user.id;
  }
  public getUserInfo() {
    return this.mySource.asObservable();
  }

}
