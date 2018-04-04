import { Injectable } from '@angular/core';

import { Course } from '../entities';
import { COURSES } from '../mocks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// import { LoaderBlockServices } from '../services';

// i think that it is all (or part??) logic for work with enity
// in this case entity = list of course

@Injectable()
export class CourseServices {
  private couresArr: Course[] = [];
  private sourceList: BehaviorSubject<Course[]>;
  constructor(
    // private _loaderBlockServices: LoaderBlockServices
  ) {
    console.log('### CourseServices constructor ###');
    // this.couresArr = [...COURSES];
    this.sourceList = new BehaviorSubject([...COURSES]);
  }
  public getList(): Observable<Course[]> {
    console.log('### CourseServices.getList ###');
    // return this.couresArr;
    return this.sourceList.asObservable();
  }
  public createCourse(): number {
    console.log('### CourseServices.createCourse ###');
    return this.couresArr
      .reduce((prev, item) => item.id > prev ? item.id : prev, 0)
      + 1;
  }
  public getItemById(id: number): Course {
    console.log('### CourseServices.getItemById ###');
    return this.couresArr.find((item) => item.id === id);
  }
  // obj: {id: updateCourseId[, updateField: newValue,] }
  public updateItem(obj): void {
    console.log('### CourseServices.updateItem ###');
    let current = this.getItemById(obj.id);
    current = {
      ...current,
      ...obj,
    };
  }
  public removeItem(id: number): void {
    console.log(`### CourseServices.removeItem id=${id}###`);

    // this._loaderBlockServices.Show();

    const currentID = this.couresArr.findIndex((item) => item.id === id);
    if (currentID >= 0) {
      this.couresArr.splice(currentID, 1);
    } else {
      console.log('### CourseServices.removeItem:ERROR: wrong ID###');
    }

    // settimeout(() =>this._loaderBlockServices.Hide(), 1000);
  }
}
