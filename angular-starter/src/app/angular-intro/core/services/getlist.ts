import { Injectable } from '@angular/core';

import { COURSES } from '../mocks';
import { Course } from '../entities';

@Injectable()
export class GetList {
  protected couresArr: Course[] = [];
  constructor() {
    console.log('GetList constructor');
    this.couresArr = [...COURSES];
  }
  public getData(): Course[] {
    return this.couresArr;
  }
}
