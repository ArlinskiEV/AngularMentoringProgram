import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ConnectionBackend, RequestOptionsArgs } from '@angular/http/src/interfaces';

import {
  Http,
  Response,
  Request,
  RequestOptions,
  Headers,
  URLSearchParams,
  RequestMethod
} from '@angular/http';

console.log('### AuthorizedHttpService loaded ###');

@Injectable()
export class AuthorizedHttpService extends Http {
  private headers: Array<{ name: string, value: string | string[]}> = [];
  // constructor(
  //   protected _backend: ConnectionBackend,
  //   protected _defaultOptions: RequestOptions,
  // ) {
  //   super(_backend, _defaultOptions);
  //   console.log('### AuthorizedHttpService constructor ###');
  // }

  public setHeaders(arr: Array<{ name: string, value: string | string[]}>) {
    this.headers = [...arr];
  }
  public clearHeaders() {
    this.headers = [];
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let newHeaders = new Headers();
    const arr = this.headers;
    if (options && options.headers) {
      newHeaders = new Headers(options.headers);
    }
    if (typeof url !== 'string') {
      url.headers.keys()
        .forEach((key) => arr.push(
          {name: key, value: url.headers.getAll(key)}
        ))
      ;
    }

    arr.forEach((item) => {
      newHeaders.set(item.name, item.value);
    });

    if (typeof url !== 'string') {
      url.headers = newHeaders;
    }
    if (options && options.headers) {
      options.headers = newHeaders;
    }

    return super.request(url, options);
  }
}
