import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  CourseServices,
  LoaderBlockServices,
} from '../core/services';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  protected text = 'Courses TEXT';
  protected coursesArr = [];

  constructor(
    private _loaderBlockServices: LoaderBlockServices,
    private _courseServices: CourseServices,
  ) {
    console.log('courses-constructor, Arr:');
    console.log(this.coursesArr);
  }
  public ngOnInit() {
    console.log('courses.component OnInit');
    // this.coursesArr = this._courseServices.getList();
    this.coursesArr = [];
    console.log(this.coursesArr);
  }
  get count() {
    console.log('recalculate count');
    return this.coursesArr
      .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

  protected handler(emit: any) {
    console.log(`courses.handler emit.type=${emit.type}`);
    switch (emit.type) {
      case 'deletter': {
        this._loaderBlockServices.Show();
        console.log(`courses.deletter id=${emit.value}`);
        this._courseServices.removeItem(emit.value);
        // ...no service in service?
        setTimeout( () => this._loaderBlockServices.Hide(), 3000);
        break;
      }
    }
  }

}
