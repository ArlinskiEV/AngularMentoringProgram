import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import {
  Course,
  CourseFromServer,
  UpdateCourseItem,
  BASE_URL
} from '../entities';

import { COURSES } from '../mocks';

import {
  Http,
  Response,
  Request,
  RequestOptions,
  Headers,
  URLSearchParams,
  RequestMethod
} from '@angular/http';

// import { LoaderBlockServices } from '../services';

@Injectable()
export class CourseServices {
  private sourceList: BehaviorSubject<Course[]>;
  private baseUrl = BASE_URL;
  private end = 0;
  constructor(
    // private _loaderBlockServices: LoaderBlockServices,
    private http: Http,
  ) {
    console.log('### CourseService constructor ###');
    this.sourceList = new BehaviorSubject([]);
    // ------------------------------------------------
    // observable for fake-server (without http)
    const listener: Subscription = new Observable<any>( (observer) => {
      // call server
      // recive data
      // observer.next([...COURSES]);
      // observer.next(this.server(0, 3));
      const listener2 = this.server(0, 3).subscribe(
        (data) => observer.next(data),
        null,
        () => listener2.unsubscribe()
      );

    }) // transform server-map -> client-map
      .map((data: any) => {
        return [].concat(...data.map((item) => {
          const obj = {
            ...item,
            date: item.createdDate,
          };
          delete obj.createdDate;
          return obj;
        }));
      })
      // transfer data
      .subscribe((data) => {
        this.sourceList.next(data);
      }, null, () => listener.unsubscribe())
    ;
    // ------------------------------------------------
  }

  public getList(): Observable<Course[]> {
    console.log('### CourseServices.getList ###');
    return this.sourceList.asObservable();
  }

  public createCourse(newCourse: Course): void {
    this.sourceList.next([...this.sourceList.value, newCourse]);
  }

  public getItemById(id: number): Course {
    return this.sourceList.value.find((item) => item.id === id);
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
    // this._loaderBlockServices.Show();
    const currentID = this.sourceList.value.findIndex((item) => item.id === id);
    if (currentID >= 0) {
      const arr = this.sourceList.value;
      arr.splice(currentID, 1);
      this.sourceList.next([...arr]);
    } else {
      console.warn(`### CourseServices.removeItem:ERROR: wrong ID=${id}###`);
    }
    // settimeout(() =>this._loaderBlockServices.Hide(), 1000);
  }

  public loadMoreItem(count: number) {
    const listener = this.server(this.end, count)
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
      );
  }

  private server(start: number, count: number): Observable<Course[]> {
    const headers = new Headers();
    const requestOptions = new RequestOptions();
    const urlParams: URLSearchParams = new URLSearchParams();

    // const pageNumber = 2;
    // const pageNumber = 1;
    // const count = 3; // count courses on page
    // const start = (pageNumber - 1) * count; // from 0
    urlParams.set('start', '' + start);
    urlParams.set('count', '' + count);
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
            duration: 0,
            date: +new Date(item.date),
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
