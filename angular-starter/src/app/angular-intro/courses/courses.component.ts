import { Component } from '@angular/core';

import { COURSES } from '../core/mocks';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  protected text = 'Courses TEXT';
  protected couresArr = COURSES;

  constructor() {
    console.log('courses-constructor, Arr:');
    console.log(this.couresArr);
  }
  get count() {
    console.log('recalculate count');
    return this.couresArr
      .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

}
