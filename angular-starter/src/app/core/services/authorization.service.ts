import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { ReplaySubject } from 'rxjs/ReplaySubject';

import {
  User,
  SharedUserInfo,
  UserFromServer,
  BASE_URL
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

@Injectable()
export class AuthorizationService {
  public mySource: BehaviorSubject<SharedUserInfo>;
  private user: User;

  private baseUrl = BASE_URL;

  constructor(
    private ngZone: NgZone,
    private http: Http,
    @Inject('Ahttp') private Ahttp: AuthorizedHttpService,
  ) {
    console.log('### AuthorizationService constructor ###');
    this.user = new User();
    this.mySource = new BehaviorSubject(this.user.sharedInfo());

    // ----------------------------------------------------------------STABLE-UNSTABLE-TIMING
    let start = 0;
    const stable: Subscription = ngZone.onUnstable.subscribe(() => start = Date.now(), null,
      () => stable.unsubscribe()
    );
    const unstable: Subscription = ngZone.onStable.subscribe(() =>
      console.log(`ngZone Stable. unstable time=${Date.now() - start}`), null,
      () => unstable.unsubscribe()
    );
    // ----------------------------------------------------------------
  }

  public login(payload: {login: string, password: any}): void {// how do it right??
    // Login (stores fake user info and token to local storage)

    const headers = new Headers();
    const requestOptions = new RequestOptions();
    headers.set('My-Header', 'myValue');
    requestOptions.url = `${this.baseUrl}/auth/login`;
    requestOptions.method = RequestMethod.Post;
    requestOptions.headers = headers;
    requestOptions.body = payload;
    const request = new Request(requestOptions);
    // ----------------------------------------------------------------
    const listener = this.http.request(request)
      .map((res: Response) => res.json())
      .subscribe(
        (data: any) => {
          // console.warn(data);
          this.user.token = data.token;
          this.Ahttp.setHeaders([
            {name: 'Authorization', value: this.user.token}
          ]);
        },
        (error) => console.error(`ERROR: ${error._body}`),
        () => {
          listener.unsubscribe();
          this.getInfo();
        }
      );
  }

  public logout(): void {
    // Logout (wipes fake user info and token from local storage)
    this.user = new User();
    this.Ahttp.clearHeaders();
    this.mySource.next(this.user.sharedInfo());
  }
  public isAuthenticated(): boolean {
    // IsAuthenticated (boolean)
    return !!this.user.token;
    // or this.token ? case: recive token without info
  }
  public getUserInfo(): Observable<SharedUserInfo> {
    return this.mySource.asObservable();
  }

  private getInfo() {
    // const headers = new Headers();
    const requestOptions = new RequestOptions();

    // headers.set('Authorization', this.token);

    requestOptions.url = `${this.baseUrl}/auth/userinfo`;
    requestOptions.method = RequestMethod.Post;
    // requestOptions.headers = headers;

    const request = new Request(requestOptions);
    // ----------------------------------------------------------------
    const listener = this.http.request(request)
    .map((res: Response) => res.json())
    .map((data) => {console.warn(data); return data; })
    .subscribe(
      (data: any) => {
        // ----------------------------
        // transform
        const obj: any = {
          ...data,
          token: data.fakeToken
        };
        delete obj.fakeToken;
        // ----------------------------
        this.user = new User(obj);
        this.mySource.next(this.user.sharedInfo());
      },
      (error) => console.error(`ERROR: ${error.error}`),
      () => {
        listener.unsubscribe();
      }
    );
  }

}
