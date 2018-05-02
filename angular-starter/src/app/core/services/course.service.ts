import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import {
  Course,
  CourseFromServer,
  UpdateCourseItemById,
  BASE_URL,
  ServerQuery,
  Author,
  AuthorFromServer,
  Name,
  ServerTypes,
  ServerInfo,
  ServerId,
} from '../entities';

// import { COURSES } from '../mocks';

import {
  Http,
  Response,
  Request,
  RequestOptions,
  Headers,
  URLSearchParams,
  RequestMethod
} from '@angular/http';

import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { NewData, AddData } from '../actions';

// import { LoaderBlockService } from '../services';

@Injectable()
export class CourseService {
  private baseUrl = BASE_URL;
  private end = 0;
  constructor(
    // @Inject('load-spinner') private loaderBlockService: LoaderBlockService,
    private http: Http,
    private store: Store<AppState>
  ) {
    const listener: Subscription = this.server(new ServerInfo(0, 3))
      .finally(() => listener.unsubscribe())
      .subscribe((data) => {
        this.store.dispatch(new NewData(data));
        this.end += 3;
      })
    ;
  }

  public getList(): Observable<Course[]> {
    return this.store.map((state: AppState) => state.course);
  }

  public getAuthorsList(): Observable<Author[]> {
    const headers = new Headers();
    const requestOptions = new RequestOptions();
    const urlParams: URLSearchParams = new URLSearchParams();

    requestOptions.url = `${this.baseUrl}/courses/authors`;
    requestOptions.method = RequestMethod.Get;
    requestOptions.headers = headers;
    requestOptions.search = urlParams;
    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => res.json())
      // ------------------------------
      // transform
      .map((data: AuthorFromServer[]) => // just type
        data.map((item) => Author.fromServer(item))
      )
      // ------------------------------
    ;
  }

  public createItem(newCourse: Course): void {
    console.warn('new course:');
    console.warn(newCourse);
    // call server
    // .finally(() => {
    //   listener.unsubscribe();
    //   this.refresh();
    // })
  }

  public getItemById(id: number): Observable<Course> {
    return this.server(new ServerId(id))
      .map((data: Course[]) => data.length ? data[0] : new Course())
    ;
  }

  public updateItem(obj: UpdateCourseItemById): void {
    console.warn('update course:');
    console.warn(obj);
    // call server
    // .finally(() => {
    //   listener.unsubscribe();
    //   this.refresh();
    // })
  }

  public removeItem(id: number): void {
    // this.loaderBlockService.Show();

    const headers = new Headers();
    const requestOptions = new RequestOptions();
    const urlParams: URLSearchParams = new URLSearchParams();

    urlParams.set('id', '' + id);

    requestOptions.url = `${this.baseUrl}/courses`;
    requestOptions.method = RequestMethod.Delete;
    requestOptions.headers = headers;
    requestOptions.search = urlParams;

    const request = new Request(requestOptions);
    // ----------------------------------------------------------------
    const listener = this.http.request(request)
      .map((res: Response) => res.json())
      .finally(() => {
        listener.unsubscribe();
        this.refresh();
      })
      .subscribe((data) => console.warn(`accept:${data}`)) // confirm delete
    ;
    // setTimeout(() => this.loaderBlockService.Hide(), 1000);
  }

  public loadMoreItem(count: number): void {
    const info = new ServerInfo(this.end, count);
    const listener = this.server(info)
      .finally(() => listener.unsubscribe())
      .subscribe((data: Course[]) => {
        this.end += count;
        this.store.dispatch(new AddData(data));
      })
    ;
  }

  public search(query: string) {
    const info = new ServerInfo(0, this.end);
    info.query = query;
    const listener = this.server(info)
      .finally(() => listener.unsubscribe())
      .subscribe((data: Course[]) => {
        this.end = 10;
        this.store.dispatch(new NewData(data));
      })
    ;
  }

  private refresh() {
    const info = new ServerInfo(0, this.end);
    const listener = this.server(info)
      .finally(() => listener.unsubscribe())
      .subscribe((data) => this.store.dispatch(new NewData(data)))
    ;
  }

  private server(params: ServerQuery): Observable<Course[]> {
    const headers = new Headers();
    const requestOptions = new RequestOptions();
    const urlParams: URLSearchParams = new URLSearchParams();

    switch (params.type) {
      case ServerTypes.ID: {
        urlParams.set('id', '' + params.id);
        break;
      }
      case ServerTypes.GENERALL: {
        urlParams.set('start', '' + params.start);
        urlParams.set('count', '' + params.count);
        if (params.sort) {
          urlParams.set('sort', '' + params.sort);
        }
        if (params.query) {
          urlParams.set('query', '' + params.query);
        }
        break;
      }
    }

    requestOptions.url = `${this.baseUrl}/courses`;
    requestOptions.method = RequestMethod.Get;
    requestOptions.headers = headers;
    requestOptions.search = urlParams;
    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => res.json())
      // ------------------------------
      // transform
      .map((data: CourseFromServer[]) => // just type
        data.map((item) => Course.fromServer(item))
      )
      // ------------------------------
    ;
  }

}
