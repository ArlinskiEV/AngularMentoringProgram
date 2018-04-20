import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import {
  Course,
  CourseFromServer,
  UpdateCourseItem,
  BASE_URL,
  ServerQuery,
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

// import { LoaderBlockService } from '../services';

@Injectable()
export class CourseService {
  private sourceList: BehaviorSubject<Course[]>;
  private baseUrl = BASE_URL;
  private end = 0;
  constructor(
    // @Inject('load-spinner') private loaderBlockService: LoaderBlockService,
    private http: Http,
  ) {
    this.sourceList = new BehaviorSubject([]);
    // ------------------------------------------------
    // observable for server (with http)
    const listener: Subscription = this.server({start: 0, count: 3})
      // transfer data
      .subscribe((data) => {
        this.sourceList.next(data);
      }, null, () => listener.unsubscribe())
    ;
    // ------------------------------------------------
  }

  public getList(): Observable<Course[]> {
    return this.sourceList.asObservable();
  }

  public createCourse(newCourse: Course): void {
    this.sourceList.next([...this.sourceList.value, newCourse]);
  }

  public getItemById(id: number): Observable<Course> {
    const result = this.sourceList.value.find((item) => item.id === id);
    if (result) {
      return Observable.of(result);
    } else {
      return this.server({start: 0, count: 10, id})
        .map((data: Course[]) => data.length ? data[0] : new Course())
      ;
    }
  }

  public updateItem(obj: UpdateCourseItem): void {
    const arr = this.sourceList.value;
    const i = arr.findIndex((item) => item.id === obj.id);
    arr[i] = {
      ...arr[i],
      ...obj
    };
    this.sourceList.next([...arr]);
  }

  public removeItem(id: number): void {
    // this.loaderBlockService.Show();

    // const currentID = this.sourceList.value.findIndex((item) => item.id === id);
    // if (currentID >= 0) {
    //   const arr = this.sourceList.value;
    //   arr.splice(currentID, 1);
    //   this.sourceList.next([...arr]);
    // } else {
    //   console.warn(`### CourseServices.removeItem:ERROR: wrong ID=${id}###`);
    // }

    const headers = new Headers();
    const requestOptions = new RequestOptions();
    const urlParams: URLSearchParams = new URLSearchParams();

    urlParams.set('id', '' + id);
    headers.set('My-Header', 'myValue');

    requestOptions.url = `${this.baseUrl}/courses`;
    requestOptions.method = RequestMethod.Delete;
    requestOptions.headers = headers;
    requestOptions.search = urlParams;

    const request = new Request(requestOptions);
    // ----------------------------------------------------------------
    const listener = this.http.request(request)
      .map((res: Response) => res.json())
      .subscribe(
        (data) => {
          // confirm delete
          console.warn(`accept:${data}`);
        },
        null,
        () => {
          listener.unsubscribe();
          this.end = 0;
          // recall server
          const listener2 = this.server({start: this.end, count: 3})
            .subscribe(
              (data) => this.sourceList.next(data),
              null,
              () => listener2.unsubscribe()
            )
          ;
        }
      )
    ;
    // setTimeout(() => this.loaderBlockService.Hide(), 1000);
  }

  public loadMoreItem(count: number): void {
    const listener = this.server({start: this.end, count})
      .subscribe((data: Course[]) => {
        // this.sourceList.next(data);
        this.end += count;
        this.sourceList.next([
          ...this.sourceList.value,
          ...data
        ]);
      },
        null,
        () => listener.unsubscribe()
      )
    ;
  }

  public search(query: string) {
    const listener = this.server({start: 0, count: 10, query})
      .subscribe(
        (data: Course[]) => {
          this.sourceList.next(data);
        },
        null,
        () => {
          listener.unsubscribe();
        }
      )
    ;
  }

  private server(params: ServerQuery): Observable<Course[]> {
    const headers = new Headers();
    const requestOptions = new RequestOptions();
    const urlParams: URLSearchParams = new URLSearchParams();

    // const pageNumber = 2;
    // const pageNumber = 1;
    // const count = 3; // count courses on page
    // const start = (pageNumber - 1) * count; // from 0
    if (params.id) {
      urlParams.set('id', '' + params.id);
    } else {
      urlParams.set('start', '' + params.start);
      urlParams.set('count', '' + params.count);
      if (params.sort) {
        urlParams.set('sort', '' + params.sort);
      }
      if (params.query) {
        urlParams.set('query', '' + params.query);
      }
    }
    headers.set('My-Header', 'myValue');
    requestOptions.url = `${this.baseUrl}/courses`;
    requestOptions.method = RequestMethod.Get;
    requestOptions.headers = headers;
    requestOptions.search = urlParams;
    const request = new Request(requestOptions);
    // ----------------------------------------------------------------
    return this.http.request(request)
      .map((res: Response) => res.json())
      // ------------------------------------------------
      // transform
      .map((data: CourseFromServer[]) => {
        return data.map((item) => {
          const obj = {
            ...item,
            duration: + new Date(item.length * 60000),
            date: + new Date(item.date),
            tags: [],
            isAccept: false,
            text: item.description,
            topRated: item.isTopRated,
          };
          delete obj.description;
          delete obj.isTopRated;
          delete obj.authors;
          delete obj.length;
          return obj;
        });
      })
      ;
      // ------------------------------------------------
  }

}
