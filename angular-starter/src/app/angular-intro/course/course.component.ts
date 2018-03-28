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
  @Output('deletter') protected deletter = new EventEmitter();

  constructor(private modalWindowService: ModalWindowServices) {
    console.log('course-constructor');
  }

  protected localAccept(id: number)  {
    this.courseItem.isAccept = !this.courseItem.isAccept;
    console.log(`course-local method from id=${id}; this.courseItem=`);
    console.log(this.courseItem);
    this.handler.emit({
      value: id,
    });
  }

  protected del() {
    console.log(`del from child, id:${this.courseItem.id}`);

    // using modalWindow via modalWindowService
    this.modalWindowService.show(`HEY! are you shure? id=${this.courseItem.id}`,
      // callback
      (message: string) => {
        switch (message) {
          case 'Yes': {
            this.deletter.emit({value: this.courseItem.id});
            break;
          }
          case 'No': {
            console.log('modal was declined');
            break;
          }
          default: console.log(`unknown modal message:${message}`);
        }
      }
      // --------
    );
    // ----------------

  }
}
