import { Injectable } from '@angular/core';

import { COURSES } from '../mocks';
import { Course } from '../entities';

// i think that it is all (or part??) logic for work with enity
// in this case entity = list of course

@Injectable()
export class CourseServices {
  private couresArr: Course[] = [];
  constructor() {
    console.log('### CourseServices constructor ###');
    this.couresArr = [...COURSES];
  }
  public getList(): Course[] {
    console.log('### CourseServices.getList ###');
    return this.couresArr;
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
    const currentID = this.couresArr.findIndex((item) => item.id === id);
    if (currentID >= 0) {
      this.couresArr.splice(currentID, 1);
    } else {
      console.log('### CourseServices.removeItem:ERROR: wrong ID###');
    }
  }
}
