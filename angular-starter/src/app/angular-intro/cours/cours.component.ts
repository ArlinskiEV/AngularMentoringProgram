import {
  Component,
  Input,
} from '@angular/core';
import { Course } from '../course';

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
  constructor() {
    console.log('cours-constructor');
  }
}
