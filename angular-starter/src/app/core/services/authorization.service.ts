import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
    this.user = new User();
    this.mySource = new BehaviorSubject(this.user.sharedInfo());

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

  public login(payload: {login: string, password: any}): Observable<string> {// how do it right??

    const headers = new Headers();
    const requestOptions = new RequestOptions();
    headers.set('My-Header', 'myValue');
    requestOptions.url = `${this.baseUrl}/auth/login`;
    requestOptions.method = RequestMethod.Post;
    requestOptions.headers = headers;
    requestOptions.body = payload;
    const request = new Request(requestOptions);
    // ----------------------------------------------------------------
    const error = new Subject<string>();
    const listener = this.http.request(request)
      .map((res: Response) => res.json())
      .subscribe(
        (data: any) => {
          this.user.token = data.token;
          this.Ahttp.setHeaders([
            {name: 'Authorization', value: this.user.token}
          ]);
          this.getInfo();
        },
        (serverError) => {
          switch (serverError.status) {
            case 0: {
              error.next('Connection error');
              break;
            }
            case 401: {
              error.next(`Authorization error: ${serverError._body}`);
              break;
            }
            default: error.next(`Unknown error: ${serverError._body}`);
          }
          console.error(`ERROR:${JSON.stringify(serverError)}`);
        },
        () => listener.unsubscribe()
      )
    ;

    return error.asObservable();
  }

  public logout(): void {
    this.user = new User();
    this.Ahttp.clearHeaders();
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
        // ----------------------------
        // redirect
        this.router.navigateByUrl('courses');
        // ----------------------------
      },
      (error) => console.error(`ERROR: ${error.error}`),
      () => {
        listener.unsubscribe();
      }
    );
  }

}
