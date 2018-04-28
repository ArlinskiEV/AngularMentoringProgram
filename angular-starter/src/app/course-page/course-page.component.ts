import {
  Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef,
} from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switch';
import { Subscription } from 'rxjs/Subscription';
import { CourseService, BreadcrumbsService } from '../core';
import { Course, Author } from '../core/entities';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursePageComponent implements OnInit, OnDestroy {
  public course = new BehaviorSubject(new Course());
  public authorsList = new BehaviorSubject<Author[]>([]);
  private source: Observable<Course>;
  private idInfo: {new: boolean, id: any};
  private listeners: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private changeDetectorRef: ChangeDetectorRef,
    private breadcrumbsService: BreadcrumbsService,
  ) {
    const sourceParams = this.activatedRoute.params
      .map((data: Params) => {
        return {new: false, id: data['id']};
      })
    ;

    const sourceData = this.activatedRoute.data
      .filter((data: Data) => !!Object.keys(data).length)
      .map((data: Data) => {
        return {new: data.new, id: null};
      })
    ;

    this.source = sourceParams
      .merge(sourceData)
      .map((data: {new: boolean, id: any}) => {
        this.idInfo = data;
        if (!data.new) {
          return this.courseService.getItemById(data.id);
        } else {
          return Observable.of(new Course());
        }
      }).switch()
    ;

  }

  public submit(form: FormGroup) {
    this.courseService.updateItem({id: this.course.value.id, ...form.value});
    this.router.navigateByUrl('courses');
  }
  public cancel() {
    this.router.navigateByUrl('courses');
  }

  public ngOnInit() {
    this.listeners.push(
      this.source.subscribe((data: Course) => {
        // -----------------------------------------
        // how check it right?
        if (+this.idInfo.id === data.id) {
          this.course.next(data);
          this.changeDetectorRef.markForCheck();
          console.log(data);
        } else {
          this.router.navigateByUrl('notfound');
        }
        // -----------------------------------------
      })
    );

    this.listeners.push(
      this.courseService.getAuthorsList().subscribe((data: Author[]) => {
        this.authorsList.next([...data]);
        this.changeDetectorRef.markForCheck();
      })
    );

    this.breadcrumbsService.setSource(
      this.course.asObservable().map((item) => item.name ? item.name : 'New Course')
    );
  }

  public ngOnDestroy() {
    this.listeners.forEach((item) => item.unsubscribe());
  }
}
