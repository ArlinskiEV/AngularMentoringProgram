import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, RouterLink, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Course, BreadcrumbsService } from '../core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'breadcrumbs-component',
  styles: [`
   a {
     text-decoration: underline;
   }
  `],
  template: `
    <div>
      <h3>{{course.name}}</h3>
      <a (click)="goToCourse()">Courses</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// It should show current course name
// (not clickable) and link to courses page.
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  // public source = new BehaviorSubject(new Course());
  public course: Course = new Course();
  private listener: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private breadcrumbsService: BreadcrumbsService,
  ) {}

  public ngOnInit() {
    this.listener = this.breadcrumbsService.getSource()
      .subscribe(
        (course: Course) => {
          // this.source.next(course);
          this.course = course;
          this.changeDetectorRef.markForCheck();
        },
      )
    ;
  }

  public goToCourse() {
    this.router.navigateByUrl('courses');
  }

  public ngOnDestroy() {
    this.listener.unsubscribe();
  }
}
