import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CoursePageComponent } from '../course-page';
import { Course } from '../core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'breadcrumbs-component',
  styles: [`
  `],
  template: `
    <div>
      <p routerLink="./courses">breadcrumbs</p>
      <p>{{source | async | json}}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// It should show current course name
// (not clickable) and link to courses page.
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public source = new BehaviorSubject(new Course());
  private listener: Subscription;
  private sourceData;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    // ---------------------------------------------------
    /// way 1 (router)
    this.sourceData = this.router.events
      .filter((e: Event) => e instanceof NavigationEnd)
      .map((e: Event) => {
        const t = this.router.routerState.root.firstChild;
        const t2: any = t.component;

        // debugger;
        // if (t2 instanceof CoursePageComponent) return  t2;
        if (t2 && t2.name === 'CoursePageComponent') {
          return t2;
        }
      })
      .map((component: CoursePageComponent) => {
        debugger;
        return component.iWantYourData();
      })
      .switch();
    // ---------------------------------------------------
  }

  public ngOnInit() {
    // ---------------------------------------------------
    // way 1 (router)
    this.listener = this.sourceData
      .subscribe(
        (course: Course) => {
          this.source.next(course);
          this.changeDetectorRef.markForCheck();
        },
      )
    ;
    // ---------------------------------------------------

    // ---------------------------------------------------
    // way 2 (activatedRoute)
    // const component: any = this.activatedRoute.component;
    // if (!component) {
    //   debugger;
    // }
    // if (component && component.name === 'CoursePageComponent') {
    //   const t3: CoursePageComponent = component;
    //   this.listener = t3.iWantYourData().subscribe(
    //     (data: Course) => {
    //       this.source.next(data);
    //       this.changeDetectorRef.markForCheck();
    //       debugger;
    //     }
    //   );
    // }
    // ---------------------------------------------------
  }
  public ngOnDestroy() {
    this.listener.unsubscribe();
  }
}
