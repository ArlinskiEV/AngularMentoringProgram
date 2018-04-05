import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
// ---------------
import { Course } from '../core/entities';
// ---------------
import { ModalWindowServices } from '../core/services';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CourseComponent {
  public currentDate = Date.now();
  public infinityDate = Infinity;
  @Input() protected courseItem: Course = {
    id: 0,
    name: 'NoName',
    duration: +new Date(),
    createdDate: +new Date(),
    tags: ['error'],
    isAccept: false,
    text: 'error: it is an empty text',
    topRated: false,
  };

  @Output('handler') protected handler = new  EventEmitter();

  constructor(private _modalWindowService: ModalWindowServices, ) {}

  protected del() {
    console.log(`del from child, id:${this.courseItem.id}`);

    // using modalWindow via modalWindowService
    const listener = this._modalWindowService.show(`HEY! are you sure? id=${this.courseItem.id}`)
      .subscribe(
        // callback ... o_O
        (message: string) => {
          switch (message) {
            case 'Yes': { // only in this case need call parent
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
            default: console.warn(`unknown modal message:${message}`);
          }
        },
        (error) => console.error(`error in course.component:${error}`),
      );

  }
}
