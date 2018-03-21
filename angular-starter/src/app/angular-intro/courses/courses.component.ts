import { Component } from '@angular/core';

import { COURSES } from '../mock-courses';

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
    this.count = this.couresArr
      .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

  public recalc(): number {
    console.log('recalculate count');
    return this.count = this.couresArr
    .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

  public toggle(id: number): void {
    console.log(`toggle by id=${id}`);
    const cours = this.couresArr.find((item) => item.id === id);
    cours.isAccept = !cours.isAccept;
    this.recalc();
  }

}
