import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { CourseServices } from '../core';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  protected text = 'Courses TEXT';
  protected couresArr = [];

  constructor(private courseServices: CourseServices) {
    console.log('courses-constructor, Arr:');
    console.log(this.couresArr);
  }
  public ngOnInit() {
    console.log('courses.component OnInit');
    this.couresArr = this.courseServices.getList();
    console.log(this.couresArr);
  }
  get count() {
    console.log('recalculate count');
    return this.couresArr
      .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

  protected handler(emit: any) {
    console.log(`courses.handler emit.type=${emit.type}`);
    switch (emit.type) {
      case 'deletter': {
        console.log(`courses.deletter id=${emit.value}`);
        this.courseServices.removeItem(emit.value);
        break;
      }
    }
  }

}
