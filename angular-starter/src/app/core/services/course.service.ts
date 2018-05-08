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
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';

import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { NewData, AddData } from '../actions';

import { SearchService } from './search.service';

// import { LoaderBlockService } from '../services';

@Injectable()
export class CourseService {
  private baseUrl = BASE_URL;
  private end = 0;
  private queryFromService = '';
  constructor(
    // @Inject('load-spinner') private loaderBlockService: LoaderBlockService,
    private searchService: SearchService,
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    const listener: Subscription = this.server(new ServerInfo(0, 3))
      .first()
      .finally(() => listener.unsubscribe())
      .subscribe((data) => {
        this.store.dispatch(new NewData(data));
        this.end += 3;
      })
    ;
    const listener2 = this.searchService.getSearchData()
      .finally(() => listener2.unsubscribe())
      .subscribe((data) => {
        this.queryFromService = data;
      })
    ;
  }

  public getList(): Observable<Course[]> {
    return this.store.map((state: AppState) => state.course);
  }

  public getAuthorsList(): Observable<Author[]> {
    const req = new HttpRequest(
      'GET',
      `${this.baseUrl}/courses/authors`,
      {responseType: 'json'}
    );

    return this.http.request(req)
      .filter((response: HttpResponse<any>) => !!response.type)
      .map((response: HttpResponse<any>) => response.body)
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
    const req = new HttpRequest(
      'PUT',
      `${this.baseUrl}/courses`,
      Course.toServer(newCourse),
      {
        responseType: 'json',
      }
    );
    // ----------------------------------------------------------------
    const listener = this.http.request(req)
      .finally(() => {
        listener.unsubscribe();
        this.refresh();
      })
      .filter((response: HttpResponse<any>) => !!response.type)
      .map((response: HttpResponse<any>) => response.body)
      .subscribe((data) => console.warn(`accept:${data}`)) // confirm create
    ;
  }

  public updateItem(obj: UpdateCourseItemById): void {
    console.warn('update course:');
    console.warn(obj);
    let params: HttpParams = new HttpParams();
    params = params.set('id', '' + obj.id);
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/courses`,
      Course.toServer(new Course(obj)),
      {
        params,
        responseType: 'json',
      }
    );
    // ----------------------------------------------------------------
    const listener = this.http.request(req)
      .finally(() => {
        listener.unsubscribe();
        this.refresh();
      })
      .filter((response: HttpResponse<any>) => !!response.type)
      .map((response: HttpResponse<any>) => response.body)
      .subscribe((data) => console.warn(`accept:${data}`)) // confirm update
    ;
  }

  public removeItem(id: number): void {
    // this.loaderBlockService.Show();

    let params: HttpParams = new HttpParams();
    params = params.set('id', '' + id);

    const req = new HttpRequest(
      'DELETE',
      `${this.baseUrl}/courses`,
      {
        params,
        responseType: 'json',
      }
    );
    // ----------------------------------------------------------------
    const listener = this.http.request(req)
      .finally(() => {
        listener.unsubscribe();
        this.refresh();
      })
      .filter((response: HttpResponse<any>) => !!response.type)
      .map((response: HttpResponse<any>) => response.body)
      .subscribe((data) => console.warn(`accept:${data}`)) // confirm delete
    ;
    // setTimeout(() => this.loaderBlockService.Hide(), 1000);
  }

  public loadMoreItem(count: number): void {
    const info = new ServerInfo(this.end, count);
    info.query = this.queryFromService;
    const listener = this.server(info)
      .finally(() => listener.unsubscribe())
      .subscribe((data: Course[]) => {
        this.end += count;
        this.store.dispatch(new AddData(data));
      })
    ;
  }

  public getItemById(id: number): Observable<Course> {
    return this.server(new ServerId(id))
      .map((data: Course[]) => data.length ? data[0] : new Course())
    ;
  }

  public search(query: string) {
    const info = new ServerInfo(0, 10);
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

  private server(queryParams: ServerQuery): Observable<Course[]> {
    let params: HttpParams = new HttpParams();

    switch (queryParams.type) {
      case ServerTypes.ID: {
        params = params.set('id', '' + queryParams.id);
        break;
      }
      case ServerTypes.GENERALL: {
        params = params.set('start', '' + queryParams.start);
        params = params.set('count', '' + queryParams.count);
        if (queryParams.sort) {
          params = params.set('sort', '' + queryParams.sort);
        }
        if (queryParams.query) {
          params = params.set('query', '' + queryParams.query);
        }
        break;
      }
    }

    const req = new HttpRequest(
      'GET',
      `${this.baseUrl}/courses`,
      {
        params,
        responseType: 'json',
      }
    );

    return this.http.request(req)
      .filter((response: HttpResponse<any>) => !!response.type)
      .map((response: HttpResponse<any>) => response.body)
      // ------------------------------
      // transform
      .map((data: CourseFromServer[]) => // just type
        data.map((item) => Course.fromServer(item))
      )
      // ------------------------------
    ;
  }

}
