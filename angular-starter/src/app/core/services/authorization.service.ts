import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
  Http,
  Response,
  Request,
  RequestOptions,
  Headers,
  URLSearchParams,
  RequestMethod
} from '@angular/http';

import { AuthorizedHttpService } from '../services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthorizationService {
  public mySource: BehaviorSubject<SharedUserInfo>;
  private user: User;

  private baseUrl = BASE_URL;

  constructor(
    private ngZone: NgZone,
    private http: Http,
    @Inject('Ahttp') private Ahttp: AuthorizedHttpService,
    private router: Router,
  ) {

    this.user = new User(
      JSON.parse(localStorage.getItem(STORAGE_USER_KEY))
    );
    this.mySource = new BehaviorSubject(this.user.sharedInfo());
    if (this.isAuthenticated()) {
      this.Ahttp.setHeaders([
        {name: 'Authorization', value: this.user.token}
      ]);
    }

    // --------------------------------------------STABLE-UNSTABLE-TIMING
    let start = 0;
    const stable: Subscription = ngZone.onUnstable.subscribe(() => start = Date.now(), null,
      () => stable.unsubscribe()
    );
    const unstable: Subscription = ngZone.onStable.subscribe(() =>
      console.log(`ngZone Stable. unstable time=${Date.now() - start}`), null,
      () => unstable.unsubscribe()
    );
    // --------------------------------------------
  }

  public login(payload: UserLoginModel): Observable<string> {
    const headers = new Headers();
    const requestOptions = new RequestOptions();
    // headers.set('My-Header', 'myValue');
    requestOptions.url = `${this.baseUrl}/auth/login`;
    requestOptions.method = RequestMethod.Post;
    requestOptions.headers = headers;
    requestOptions.body = payload;
    const request = new Request(requestOptions);
    // ----------------------------------------------------------------
    const result = new Subject<string>();
    const listener = this.http.request(request)
      .map((res: Response) => res.json())
      .map((data: any) => {
        const token = data.token;
        return this.getInfo(token);
      })
      .switch()
      .finally(() => listener.unsubscribe())
      .subscribe(
        (_) => {
          this.Ahttp.setHeaders([
            {name: 'Authorization', value: this.user.token}
          ]);
          localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(this.user));
          result.next('Authorization success');
        },
        (serverError) => {
          switch (serverError.status) {
            case SERVER_ERROR.CONNECTION_ERROR: {
              result.error('Connection error');
              break;
            }
            case SERVER_ERROR.AUTHORIZATION_ERROR: {
              result.error(`Authorization error: ${serverError._body}`);
              break;
            }
            default: result.error(`Unknown error: ${serverError._body}`);
          }
        }
      )
    ;

    return result.asObservable();
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_USER_KEY);
    this.Ahttp.clearHeaders();
    this.user = new User();
    this.mySource.next(this.user.sharedInfo());
    // ----------------------------
    // redirect
    this.router.navigateByUrl('login');
    // ----------------------------
  }
  public isAuthenticated(): boolean {
    return !!this.user.token;
  }
  public getUserInfo(): Observable<SharedUserInfo> {
    return this.mySource.asObservable();
  }

  private getInfo(token: string): Observable<boolean> {
    const result = new Subject<boolean>();
    const headers = new Headers();
    const requestOptions = new RequestOptions();

    headers.set('Authorization', token);

    requestOptions.url = `${this.baseUrl}/auth/userinfo`;
    requestOptions.method = RequestMethod.Post;
    requestOptions.headers = headers;

    const request = new Request(requestOptions);
    // ----------------------------------------------------------------
    const listener = this.http.request(request)
    .map((res: Response) => res.json())
    .map((data) => {console.warn(data); return data; })
    .finally(() => listener.unsubscribe())
    .subscribe(
      (data: any) => {
        // ----------------------------
        // transform
        const obj: any = {
          ...data,
          token: data.fakeToken
        };
        // ----------------------------
        this.user = new User(obj);
        this.mySource.next(this.user.sharedInfo());
        result.next(true);
        // ----------------------------
        // redirect
        this.router.navigateByUrl('courses');
        // ----------------------------
      },
      (error) => {
        console.error(`ERROR: ${error.error}`);
        result.error(error);
      }
    );
    return result.asObservable();
  }

}
