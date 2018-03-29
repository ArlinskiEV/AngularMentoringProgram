import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from '../core';
import { MyDate } from '../core/entities/date';
import { ModalWindowServices } from '../core/services/modalWindow.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent {
  @Input() protected courseItem: Course = {
    id: 0,
    name: 'NoName',
    duration: { hours: -1, minuts: -1,  seconds: -1 },
    tags: ['error'],
    isAccept: false,
    text: 'error: it is an empty text',
    date: new MyDate (-1, '$$$', 1111),
  };

  @Output('handler') protected handler = new  EventEmitter();

  constructor(private modalWindowService: ModalWindowServices) {
    console.log('course-constructor');
  }

  protected del() {
    console.log(`del from child, id:${this.courseItem.id}`);

    // using modalWindow via modalWindowService
    // this.modalWindowService.show(`HEY! are you shure? id=${this.courseItem.id}`,
    //   // callback
    //   (message: string) => {
    //     switch (message) {
    //       case 'Yes': { // only in this case need call parent
    //         this.handler.emit({type: 'deletter', value: this.courseItem.id});
    //         break;
    //       }
    //       case 'No': {
    //         console.log('modal was declined');
    //         break;
    //       }
    //       case 'Close': {
    //         console.log('courseComponent: modal was closed without answer');
    //         break;
    //       }
    //       default: console.log(`unknown modal message:${message}`);
    //     }
    //   }
    //   // --------
    // );
    // });
    // ----------------

    // using modalWindow via modalWindowService
    const listener = this.modalWindowService.show(`HEY! are you shure? id=${this.courseItem.id}`)
      .subscribe(
        // callback ... o_O
        (message: string) => {
          console.warn('!!!!!!!!!!!!!!!!!!!');
          switch (message) {
            case 'Yes': { // only in this case need call parent
              console.warn('!!!!!!!!!!!!!!YEAAAAAAH!!!!!');
              this.handler.emit({type: 'deletter', value: this.courseItem.id});
              break;
            }
            case 'No': {
              console.log('modal was declined');
              break;
            }
            case 'Close': {
              console.log('courseComponent: modal was closed without answer');
              break;
            }
            default: console.log(`unknown modal message:${message}`);
          }
        },
        (error) => console.error(`error in course.component:${error}`),
        () => {
          console.log('---------------------------course, done');
          // listener.unsubscribe();
        }
        // --------
      );
    // console.log('---------------------------course, end, unsubsribe');
    // listener.unsubscribe();
    // console.log('---------------------------course, end, unsubsribe-done');
    // ----------------

  }
}
