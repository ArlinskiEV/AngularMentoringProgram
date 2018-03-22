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
  protected count = 0;

  constructor() {
    console.log('courses-constructor');
    this.recalc();
  }

  public recalc() {
    console.log('recalculate count');
    this.count = this.couresArr
      .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

  public toggle(id: number) {
    console.log(`toggle by id=${id}`);
    const course = this.couresArr
      // .find((item) => item.id === id);
      // course.isAccept = !course.isAccept;
      .filter((item) => item.id <= id)
      .forEach((element) => {
        element.isAccept = true;
      });
    console.log('forcibly:');
    this.recalc();
    console.log('look this:');
    console.log(this.couresArr);
  }

}
