import {
  Component, ChangeDetectionStrategy, OnInit, OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switch';
import { Subscription } from 'rxjs/Subscription';
import { CourseService, Course } from '../core';

@Component({
  selector: 'course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursePageComponent implements OnInit, OnDestroy {
  // --------------------------------------
  // test content
  public test = 0;
  public test2 = 0;
  public disabledFlag: boolean = false;
  public testDate: number = Date.now();
  // --------------------------------------

  public course = new Course();
  private sourse: Observable<Course>;
  private idInfo: {new: boolean, id: any};
  private listeners: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {
    const sourceParams = this.activatedRoute.params
      .map((data: Params) => {
        return {new: false, id: data['id']};
      })
    ;

    const sourseData = this.activatedRoute.data
      .filter((data: Data) => !!Object.keys(data).length)
      .map((data: Data) => {
        return {new: data.new, id: null};
      })
    ;

    this.sourse = sourceParams
      .merge(sourseData)
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

  public save() {
    this.courseService.updateItem(this.course);
    this.router.navigateByUrl('courses');
  }
  public cancel() {
    this.router.navigateByUrl('courses');
  }

  public ngOnInit() {
    this.listeners.push(
      this.sourse.subscribe((data: Course) => {
        // -----------------------------------------
        // how check it right?
        if (+this.idInfo.id === data.id) {
          this.course = data;
          console.log(data);
        } else {
          this.router.navigateByUrl('notfound');
        }
        // -----------------------------------------
      })
    );
  }

  public ngOnDestroy() {
    this.listeners.forEach((item) => item.unsubscribe());
  }
}
