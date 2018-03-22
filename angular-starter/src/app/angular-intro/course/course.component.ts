import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Course } from '../core';

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
  };

  @Output('handler') protected handler = new  EventEmitter();

  constructor() {
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
}
