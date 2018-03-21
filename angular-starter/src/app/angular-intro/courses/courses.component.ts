import { Component } from '@angular/core';

import { COURSES } from '../mock-courses';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  protected text = 'Courses TEXT';
  protected couresArr = COURSES;
  constructor() {
    console.log('courses-constructor');
  }
}
