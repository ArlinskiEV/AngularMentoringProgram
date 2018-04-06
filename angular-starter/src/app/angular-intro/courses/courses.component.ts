import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import {
  CourseServices,
  LoaderBlockServices,
  SearchService,
} from '../core/services';
import { FilterPipe, Course } from '../core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {
  protected text = 'Courses TEXT';
  protected coursesArr: Course[] = [];

  private fullCoursesArr: Course[] = [];
  private filterData = [];

  private listeners: Subscription[];

  constructor(
    private _loaderBlockServices: LoaderBlockServices,
    private _courseServices: CourseServices,
    private _filter: FilterPipe<Course>,
    private _searchService: SearchService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    console.log('courses-constructor, Arr:');
    console.log(this.fullCoursesArr);
  }
  public ngOnInit() {
    this.listeners.push(this._courseServices.getList().subscribe(
      (data) => {
        this.fullCoursesArr = data;
        this.coursesArr = this._filter.transform(this.fullCoursesArr, this.filterData);
        this._changeDetectorRef.markForCheck();
      }
    ));

    // observable from service
    this.listeners.push(this._searchService.getSearchData().subscribe((item) => {
      this.filterData = item;
      this.coursesArr = this._filter.transform(this.fullCoursesArr, item);
      this._changeDetectorRef.markForCheck();
    }));

    console.log(this.coursesArr);
  }

  public ngOnDestroy() {
    this.listeners.forEach((item) => item.unsubscribe());
  }

  get count() {
    return this.coursesArr
      .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

  protected handler(emit: any) {
    console.log(`courses.handler emit.type=${emit.type}`);
    switch (emit.type) {
      case 'deletter': {
        this._loaderBlockServices.Show();
        this._courseServices.removeItem(emit.value);
        // ...no service in service?
        setTimeout( () => this._loaderBlockServices.Hide(), 1500);
        break;
      }
    }
  }

}
