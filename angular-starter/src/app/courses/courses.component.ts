import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';

import {
  CourseServices,
  LoaderBlockService,
  SearchService,
} from '../core/services';
import { FilterPipe } from '../core/pipes';
import { Course, FilterRule } from '../core/entities';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {
  protected coursesArr: Course[] = [];
  private fullCoursesArr: Course[] = [];
  private filterData: FilterRule[] = [];
  private listeners: Subscription[] = [];

  constructor(
    // private loaderBlockService: LoaderBlockService,
    @Inject('load-spinner') private loaderBlockService: LoaderBlockService,
    private courseServices: CourseServices,
    private filter: FilterPipe<Course>,
    private searchService: SearchService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    console.log('courses-constructor, Arr:');
    console.log(this.fullCoursesArr);
  }
  public ngOnInit() {
    // observable from CourseServices
    this.listeners.push(this.courseServices.getList()
      .subscribe((data) => {
        this.fullCoursesArr = data;
        this.coursesArr = this.filter.transform(this.fullCoursesArr, this.filterData);
        this.changeDetectorRef.markForCheck();
      })
    );

    // observable from SearchService
    this.listeners.push(this.searchService.getSearchData()
      .subscribe((item) => {
        this.filterData = item;
        this.coursesArr = this.filter.transform(this.fullCoursesArr, item);
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy() {
    this.listeners.forEach((item) => item.unsubscribe());
  }

  get count() {
    return this.coursesArr
      .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

  protected deletter(emit: {value: number}) {
    this.loaderBlockService.Show();
    this.courseServices.removeItem(emit.value);
    setTimeout( () => this.loaderBlockService.Hide(), 1500);
  }

  protected loadMore() {
    this.courseServices.loadMoreItem(3);
  }

}
