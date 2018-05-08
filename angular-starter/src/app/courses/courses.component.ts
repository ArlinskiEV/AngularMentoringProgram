import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import {
  CourseService,
  LoaderBlockService,
  SearchService,
  BreadcrumbsService,
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
  public coursesArr: Course[] = [];
  // private fullCoursesArr: Course[] = [];
  private filterData: FilterRule[] = [];
  private listeners: Subscription[] = [];

  constructor(
    // private loaderBlockService: LoaderBlockService,
    @Inject('load-spinner') private loaderBlockService: LoaderBlockService,
    private courseService: CourseService,
    // private filter: FilterPipe<Course>, // no, it must be on the BE
    private searchService: SearchService,
    private changeDetectorRef: ChangeDetectorRef,
    private breadcrumbsService: BreadcrumbsService,
  ) {}
  public ngOnInit() {
    // observable from CourseServices
    this.listeners.push(this.courseService.getList()
      .subscribe((data) => {
        // this.fullCoursesArr = data;
        // this.coursesArr = this.filter.transform(this.fullCoursesArr, this.filterData);
        this.coursesArr = data;
        this.changeDetectorRef.markForCheck();
      })
    );

    // observable from SearchService
    // this.listeners.push(this.searchService.getSearchData()
    //   .subscribe((item) => {
    //     this.filterData = item;
    //     this.coursesArr = this.filter.transform(this.fullCoursesArr, item);
    //     this.changeDetectorRef.markForCheck();
    //   })
    // );

    this.breadcrumbsService.setSource(Observable.of('Home'));
  }

  public ngOnDestroy() {
    this.listeners.forEach((item) => item.unsubscribe());
  }

  public get count() {
    return this.coursesArr
      .reduce((prev, item) => item.isAccept ? prev + 1 : prev, 0);
  }

  public deletter(emit: {value: number}) {
    this.loaderBlockService.Show();
    this.courseService.removeItem(emit.value);
    setTimeout( () => this.loaderBlockService.Hide(), 1500);
  }

  public loadMore() {
    this.courseService.loadMoreItem(3);
  }

}
