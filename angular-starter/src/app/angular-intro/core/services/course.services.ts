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
    this.couresArr = [...COURSES];
    this.sourceList = new BehaviorSubject([...COURSES]);
  }
  public getList(): Observable<Course[]> {
    console.log('### CourseServices.getList ###');
    return this.sourceList.asObservable();
  }
  public createCourse(newCourse: Course): void {
    this.couresArr.push(newCourse);
    this.sourceList.next([...this.couresArr]);
  }
  public getItemById(id: number): Course {
    return this.couresArr.find((item) => item.id === id);
  }

  // obj: {id: updateCourseId[, updateField: newValue,] }
  public updateItem(obj): void {
    let current = this.getItemById(obj.id);
    current = {
      ...current,
      ...obj,
    };
    this.sourceList.next([...this.couresArr]);
  }

  public removeItem(id: number): void {
    // this._loaderBlockServices.Show();
    const currentID = this.couresArr.findIndex((item) => item.id === id);
    if (currentID >= 0) {
      this.couresArr.splice(currentID, 1);
      this.sourceList.next(this.couresArr);
    } else {
      console.warn('### CourseServices.removeItem:ERROR: wrong ID###');
    }
    // settimeout(() =>this._loaderBlockServices.Hide(), 1000);
  }
}
