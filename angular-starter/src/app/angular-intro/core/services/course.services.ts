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
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';

import { HttpParamsOptions } from '@angular/common/http/src/params';
import { URLSearchParams } from 'url';

// import { LoaderBlockServices } from '../services';

@Injectable()
export class CourseServices {
  private sourceList: BehaviorSubject<Course[]>;
  private baseUrl = BASE_URL;
  constructor(
    // private _loaderBlockServices: LoaderBlockServices,
    private http: HttpClient,
  ) {
    console.log('### CourseService constructor ###');
    this.sourceList = new BehaviorSubject([]);
    // ------------------------------------------------
    const listener: Subscription = new Observable<any>( (observer) => {
      // call server
      // recive data
      observer.next([...COURSES]);
      // observer.next(this.server());

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

  private server(): void {
    const url = `${this.baseUrl}/courses`;
    const method = 'GET';
  }

}
