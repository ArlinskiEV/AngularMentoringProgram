import { Component, OnInit } from '@angular/core';

import { CourseServices } from '../core';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  protected text = 'Courses TEXT';
  protected couresArr = [];

  constructor(private courseServices: CourseServices) {
    console.log('courses-constructor, Arr:');
    console.log(this.couresArr);
  }
  public ngOnInit() {
    console.log('OnInit');
    this.couresArr = this.courseServices.getList();
    console.log(this.couresArr);
  }
  get count() {
    console.log('recalculate count');
    return this.couresArr
      .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

  protected handler(id: number) {
    console.log(`courses.handler id=${id}`);
  }

  protected deletter(id: number) {
    console.log(`courses.deletter id=${id}`);
    this.courseServices.removeItem(id);
  }

}
