import { Injectable } from '@angular/core';

import { Course } from '../entities';
import { COURSES } from '../mocks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

// import { LoaderBlockServices } from '../services';

// i think that it is all (or part??) logic for work with enity
// in this case entity = list of course

@Injectable()
export class CourseServices {
  private sourceList: BehaviorSubject<Course[]>;
  constructor(
    // private _loaderBlockServices: LoaderBlockServices
  ) {
    this.sourceList = new BehaviorSubject([]);
    // ------------------------------------------------
    // task 6: 3) map
    const represent = map<any[], Course[]>( (data: any) => {
      return [].concat(...data.map((item) => {
        const obj = {
          ...item,
          date: item.createdDate,
        };
        delete obj.createdDate;
        return obj;
      }));
    });

    const response = represent(
      new Observable<any>( (observer) => {
      // call server
      // recive data
      observer.next([...COURSES]);
      // timer?
      })
    )
    .subscribe((data) => {
      this.sourceList.next(data);
    })
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

  // obj: {id: updateCourseId[, updateField: newValue,] }
  public updateItem(obj): void {
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
}
