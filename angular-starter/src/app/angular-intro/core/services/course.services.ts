import { Injectable } from '@angular/core';

import { COURSES } from '../mocks';
import { Course } from '../entities';

@Injectable()
export class CourseServices {
  protected couresArr: Course[] = [];
  constructor() {
    console.log('GetList constructor');
    this.couresArr = [...COURSES];
  }
  public getList(): Course[] {
    return this.couresArr;
  }
}
