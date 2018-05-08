import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable()
export class AuthorizedHttpService implements HttpInterceptor {
  private token: string = '';

  constructor(private store: Store<AppState>) {
    store
      .map((state: AppState) => state.user.token)
      .subscribe((token) => this.token = token);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: this.token
        }
      });
    }
    return next.handle(request);
  }
}
