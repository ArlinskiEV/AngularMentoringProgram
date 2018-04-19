import {
  Component, ChangeDetectionStrategy, OnInit, OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
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
  private listeners: Subscription[] = [];
  private sourse: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    const sourceParams = this.route.params
      .map((data: Params) => {
        return {new: false, id: data['id']};
      })
    ;

    const sourseData = this.route.data
      .map((data: Data) => {
        return {new: data.new, id: null};
      })
    ;

    // --------------------------
    // need fix
    this.sourse = sourceParams
      .merge(sourseData)
      .map((data: {new: boolean, id: any}) => {
        if (!data.new) {
          return this.courseService.getItemById(data.id);
        } else {
          return Observable.of(new Course());
        }
      })
    ;
    // --------------------------
  }

  public click(text: string) {
    console.warn(`it was click:${text}`);
  }
  public save() {
    this.click('save');
  }
  public cancel() {
    this.click('cancel');
  }

  public ngOnInit() {
    this.listeners.push(
      this.sourse.subscribe((data: Course) => {
        // this.course = data;
      })
    );
  }

  public ngOnDestroy() {
    this.listeners.forEach((item) => item.unsubscribe());
  }
}
