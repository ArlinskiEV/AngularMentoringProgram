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

export class AuthorizedHttp extends Http {
  private headers: Array<{ name: string, value: string | string[]}> = [];

  public setHeaders(arr: Array<{ name: string, value: string | string[]}>) {
    this.headers = [...arr];
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
