import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { ReplaySubject } from 'rxjs/ReplaySubject';

import { User, SharedUserInfo, UserFromServer } from '../entities';

import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';

import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable()
export class AuthorizationService {
  public mySource: BehaviorSubject<SharedUserInfo>;
  // public mySource: ReplaySubject<SharedUserInfo>;
  private user: User | null = null;
  private token: string;

  private baseUrl = 'http://localhost:3004';

  constructor(
    private _ngZone: NgZone,
    private http: HttpClient,
  ) {
    this.mySource = new BehaviorSubject(null);
    // this.mySource = new ReplaySubject(1);
    // this.mySource.next({login: ''});
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
      payload, // --------- !!!!!!!!!
      {
        headers,
        reportProgress: false,
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
            this.token = data.body.token;
          }
        },
        (error) => console.error(`ERROR: ${error.error}`),
        () => {
          listener.unsubscribe();
          this.getInfo();
        }
      );
    // ----------------------------------------------------------------
    // this.mySource.next({login: this.user.userName});
  }
  public logout(): void {
    // Logout (wipes fake user info and token from local storage)
    this.token = null;
    this.user = null;
    this.mySource.next({login: '', name: {first: 'noName', last: 'noName'}});
  }
  public isAuthenticated(): boolean {
    // IsAuthenticated (boolean)
    return !!this.user;
    // or this.token ? case: recive token without info
  }
  public getUserInfo(): Observable<SharedUserInfo> {
    return this.mySource.asObservable();
  }

  private getInfo() {
    const url = `${this.baseUrl}/auth/userinfo`;
    const method = 'POST';
    // ----------------- !!!!!!!!!!!!!!!!!!!!
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);

    const req = new HttpRequest(
      method,
      url,
      {payload: 'I_WANT_INFO'},
      {
        headers,
        reportProgress: false,
        params: new HttpParams(),
        responseType: 'json',
        withCredentials: false
      }
    );
    // ----------------------------------------
    const listener = this.http.request(req)
      .subscribe(
        (data: HttpResponse<any>) => {
          if (data.type) {
            const obj: any = {
              ...data.body,
              token: data.body.fakeToken
            };
            delete obj.fakeToken;
            this.user = obj;
            this.mySource.next({login: this.user.login, name: this.user.name});
          }
        },
        (error) => console.error(`ERROR: ${error.error}`),
        () => listener.unsubscribe()
      );
    // ----------------------------------------
  }

}
