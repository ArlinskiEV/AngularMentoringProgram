import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { User, SharedUserInfo } from '../entities';

import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthorizationService {
  // public mySource: BehaviorSubject<SharedUserInfo>;
  public mySource: ReplaySubject<SharedUserInfo>;
  private user: User = {
    id: 0,
    userName: 'NoName(serv)',
  };

  constructor(private _ngZone: NgZone) {
    // this.mySource = new BehaviorSubject({login: ''});
    this.mySource = new ReplaySubject(1);
    this.mySource.next({login: ''});
    // ----------------------------------------------------------------STABLE-UNSTABLE-TIMING
    let start = 0;
    const stable: Subscription = _ngZone.onUnstable.subscribe(() => start = Date.now(), null,
      () => stable.unsubscribe()
    );
    const unstable: Subscription = _ngZone.onStable.subscribe(() =>
      console.log(`ngZone Stable. unstable time=${Date.now() - start}`), null,
      () => unstable.unsubscribe()
    );
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
