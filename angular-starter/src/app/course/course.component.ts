import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
// ---------------
import { Course, Answer } from '../core/entities';
// ---------------
import { ModalWindowService } from '../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CourseComponent {
  public currentDate = Date.now();
  public infinityDate = Infinity;
  @Input() protected courseItem: Course = new Course();
  @Output('handler') protected handler = new  EventEmitter();

  constructor(
    private modalWindowService: ModalWindowService,
    private router: Router
  ) {}

  protected edit(id: number) {
    this.router.navigateByUrl(`courses/${id}`);
  }

  protected del() {
    console.log(`del from child, id:${this.courseItem.id}`);

    // using modalWindow via modalWindowService
    const listener = this.modalWindowService
    .show({
      message: `HEY! are you sure? id=${this.courseItem.id}`,
      default: {title: 'Cancel', value: -1},
      answerArr: [
        {title: 'Yes', value: 0},
        {title: 'No', value: 1}
      ]
    })
    .subscribe(
      // callback ... o_O
      (message: Answer) => {
        switch (message.value) {
          case 0: { // only in this case need call parent
            this.handler.emit({value: this.courseItem.id});
            break;
          }
          case 1: {
            console.log('modal was declined');
            break;
          }
          case -1: {
            console.log('courseComponent: modal was closed without answer');
            break;
          }
          default: console.warn(`unknown modal message:${message}`);
        }
        listener.unsubscribe();
      },
      (error) => console.error(`error in course.component:${error}`),
    );

  }
}
