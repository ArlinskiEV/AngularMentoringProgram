import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, RouterLink, Event, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
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
   :host > div {
    display: flex;
    align-items: center;
   }
  `],
  template: `
    <div>
      <h3>{{course.name}}</h3>
      <a
        *ngFor=""
        (click)="goToCourse()"
      >Courses</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// It should show current course name
// (not clickable) and link to courses page.
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  // public source = new BehaviorSubject(new Course());
  public course: Course = new Course();
  private params: Params;
  // ...path from route root?
  private path;
  private listeners: Subscription[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private breadcrumbsService: BreadcrumbsService,
  ) {}

  public ngOnInit() {

    this.listeners.push(this.activatedRoute.params
      .subscribe((data: Params) => console.log(`params = ${JSON.stringify(data)}`))
    );

    this.listeners.push(
      this.router.events
        .filter((e: Event) => e instanceof NavigationEnd)
        .map((_) => {debugger; return this.activatedRoute.params; })
        .switch()
        .subscribe(
          // i don't accept params.... it's work only with right component??
          (data: Params) => console.log(`params2 = ${JSON.stringify(data)}`)
        )
    );

    this.listeners.push(
      this.breadcrumbsService.getSource()
        .subscribe(
          (course: Course) => {
            // this.source.next(course);
            this.course = course;
            this.changeDetectorRef.markForCheck();
          },
        )
    );
  }

  public goToCourse() {
    this.router.navigateByUrl('courses');
  }

  public ngOnDestroy() {
    this.listeners.forEach((item) => item.unsubscribe());
  }
}
