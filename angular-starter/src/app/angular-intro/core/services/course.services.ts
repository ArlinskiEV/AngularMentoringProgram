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
  private coursesArr: Course[] = [];
  private sourceList: BehaviorSubject<Course[]>;
  constructor(
    // private _loaderBlockServices: LoaderBlockServices
  ) {
    this.coursesArr = [];
    this.sourceList = new BehaviorSubject(this.coursesArr);
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
    this.coursesArr.push(newCourse);
    this.sourceList.next([...this.coursesArr]);
  }
  public getItemById(id: number): Course {
    return this.coursesArr.find((item) => item.id === id);
  }

  // obj: {id: updateCourseId[, updateField: newValue,] }
  public updateItem(obj): void {
    let current = this.getItemById(obj.id);
    current = {
      ...current,
      ...obj,
    };
    this.sourceList.next([...this.coursesArr]);
  }

  public removeItem(id: number): void {
    // this._loaderBlockServices.Show();
    const currentID = this.coursesArr.findIndex((item) => item.id === id);
    if (currentID >= 0) {
      this.coursesArr.splice(currentID, 1);
      this.sourceList.next(this.coursesArr);
    } else {
      console.warn('### CourseServices.removeItem:ERROR: wrong ID###');
    }
    // settimeout(() =>this._loaderBlockServices.Hide(), 1000);
  }
}
