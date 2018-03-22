import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Course } from '../core';

@Component({
  selector: 'cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {
  @Input() protected coursItem: Course = {
    id: 0,
    name: 'NoName',
    duration: { hours: -1, minuts: -1,  seconds: -1 },
    tags: ['error'],
    isAccept: false,
  };

  @Output('handler') protected handler = new  EventEmitter();

  constructor() {
    console.log('cours-constructor');
  }

  protected localAccept(id: number)  {
    console.log(`cours-local method from id=${id}; this.coursItem=`);
    console.log(this.coursItem);
    this.handler.emit({
      value: id,
    });
  }
}
