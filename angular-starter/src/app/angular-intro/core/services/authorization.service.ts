import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { User, SharedUserInfo } from '../entities';

import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable()
export class AuthorizationService {
  // public mySource: BehaviorSubject<SharedUserInfo>;
  public mySource: ReplaySubject<SharedUserInfo>;
  private user: User | null = null;

  private baseUrl = 'http://localhost:3004';

  constructor(
    private _ngZone: NgZone,
    private http: HttpClient,
  ) {
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
    this.user = {
      id: Math.trunc(1 + Math.random() * 10),
      userName: payload.login,
      token: 'fakeToken',
    };
    // ----------------------------------------------------------------
    // const path = '/auth/login';
    // req.body.login (.toUpperCase) ===
    // req.body.password ===

    const url = `${this.baseUrl}/auth/login`;
    const method = 'POST';
    const headers = new HttpHeaders();
    const options = {
      fromObject: payload,
    };
    const req = new HttpRequest(
      method,
      url,
      payload,
      {
        headers,
        reportProgress: false,
        // params: new HttpParams(options),
        params: new HttpParams(),
        responseType: 'json',
        withCredentials: false
      }
    );
    // ----------------------------------------------------------------
    const listener = this.http.request(req)
      .subscribe(
        (data: HttpResponse<any>) => {
          if (data.type) {
            this.user.token = data.body.token;
          }
        },
        (error) => console.error(`ERROR: ${error.error}`),
        () => listener.unsubscribe()
      );
    // ----------------------------------------------------------------
    this.mySource.next({login: this.user.userName});
  }
  public logout(): void {
    // Logout (wipes fake user info and token from local storage)
    this.user = null;
    this.mySource.next({login: ''});
  }
  public isAuthenticated(): boolean {
    // IsAuthenticated (boolean)
    return !!this.user;
  }
  public getUserInfo(): Observable<SharedUserInfo> {
    return this.mySource.asObservable();
  }

}
