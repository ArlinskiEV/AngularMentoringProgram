import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User, SharedUserInfo } from '../entities';

import { NgZone } from '@angular/core';

@Injectable()
export class AuthorizationService {
  public mySource: BehaviorSubject<SharedUserInfo>;
  // object = {login: 'myLogin'}
  private user: User = {
    id: 0,
    userName: 'NoName(serv)',
  };

  constructor(private _ngZone: NgZone) {
    this.mySource = new BehaviorSubject({login: ''});
    // ----------------------------------------------------------------STABLE-UNSTABLE-TIMING
    let start = 0;
    _ngZone.onUnstable.subscribe(() => start = Date.now());
    _ngZone.onStable.subscribe(() =>
      console.log(`ngZone Stable. unstable time=${Date.now() - start}`));
    // ----------------------------------------------------------------
  }

  public login(payload: {login: string, password: any}): void {// how do it right??
    // Login (stores fake user info and token to local storage)

    // ----------------------------------------------------------------
    // verify
    console.log(`name:${payload.login}, pass:${payload.password}`);
    this.user.id = Math.trunc(1 + Math.random() * 10);
    this.user.userName = payload.login;
    // ----------------------------------------------------------------
    this.mySource.next({login: this.user.userName});
  }
  public logout(): void {
    // Logout (wipes fake user info and token from local storage)
    this.user = {id: 0, userName: 'NoName', };
    this.mySource.next({login: ''});
  }
  public isAuthenticated(): boolean {
    // IsAuthenticated (boolean)
    return !!this.user.id;
  }
  public getUserInfo(): Observable<SharedUserInfo> {
    return this.mySource.asObservable();
  }

}
