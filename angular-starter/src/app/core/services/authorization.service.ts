import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/first';

import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { LogIn, LogOut } from '../actions';

import {
  User,
  SharedUserInfo,
  UserFromServer,
  BASE_URL,
  UserLoginModel,
  SERVER_ERROR,
  STORAGE_USER_KEY
} from '../entities';

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

import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthorizationService {

  private baseUrl = BASE_URL;

  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private store: Store<AppState>
  ) {

    const listener: Subscription = this.store.map((state: AppState) => state.user)
      .finally(() => {if (listener) { listener.unsubscribe(); }})
      .first()
      .subscribe((newUser) => {
        if (!newUser.token) {
          const user = new User(JSON.parse(localStorage.getItem(STORAGE_USER_KEY)));
          // find in storage, but not in init-state
          if (user.token) {
            this.store.dispatch(new LogIn(user));
          }
        } else {
          this.setAllPreferences(newUser);
        }
      })
    ;

    // --------------------------------------------STABLE-UNSTABLE-TIMING
    let start = 0;
    const stable: Subscription = ngZone.onUnstable
      .finally(() => stable.unsubscribe())
      .subscribe(() => start = Date.now());
    const unstable: Subscription = ngZone.onStable
      .finally(() => unstable.unsubscribe())
      .subscribe(() => console.log(`ngZone Stable. time=${Date.now() - start}`));
    // --------------------------------------------
  }

  public login(payload: UserLoginModel): Observable<string> {
    const result = new Subject<string>();

    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/auth/login`,
      payload, // --------- !!!!!!!!!
      {
        responseType: 'json',
      }
    );
    // ----------------------------------------------------------------
    const listener = this.http.request(req)
      .filter((response: HttpResponse<any>) => !!response.type)
      .map((response: HttpResponse<any>) => response.body)
      .map((data: any) => this.getInfo(data.token))
      .switch()
      .finally(() => listener.unsubscribe())
      .subscribe((user: User) => {
        this.setAllPreferences(user);
        this.store.dispatch(new LogIn(user));
        result.next('Authorization success');
      },
      // ---------------------------------------------
      (serverError) => {
        console.error(`ERROR: ${serverError.error}`);
        switch (serverError.status) {
          case SERVER_ERROR.CONNECTION_ERROR: {
            result.error('Connection error');
            break;
          }
          case SERVER_ERROR.AUTHORIZATION_ERROR: {
            result.error(`Authorization error: ${serverError.error}`);
            break;
          }
          default: result.error(`Unknown error: ${serverError.error}`);
        }
      }
    );
    // ----------------------------------------------------------------

    return result.asObservable();
  }

  public logout(): void {
    this.dellAllPreferences();
    this.store.dispatch(new LogOut());
  }

  public isAuthenticated(): Observable<boolean> {
    return this.store
      .map((state: AppState) => !!state.user.token)
    ;
  }

  public getUserInfo(): Observable<SharedUserInfo> {
    return this.store
      .map((state: AppState) => state.user.sharedInfo());
  }

  // ------------------------------------------------------------------
  private setAllPreferences(user: User) {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  }
  private dellAllPreferences() {
    localStorage.removeItem(STORAGE_USER_KEY);
  }
  // ------------------------------------------------------------------

  private getInfo(token: string): Observable<User> {
    const result = new Subject<User>();

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/auth/userinfo`,
      null,
      {
        headers,
        responseType: 'json',
      }
    );
    // ----------------------------------------
    const listener = this.http.request(req)
      .finally(() => listener.unsubscribe())
      .filter((response: HttpResponse<any>) => !!response.type)
      .map((response: HttpResponse<any>) => response.body)
      .subscribe(
        (data: any) => {
          const obj: any = {
            ...data,
            token: data.fakeToken
          };
          result.next(new User(obj));
        },
        // -----------------------------------
        (error) => {
          console.error(`ERROR: ${error.error}`);
          result.error(error);
        }
      );
    // ----------------------------------------
    return result.asObservable();
  }

}
