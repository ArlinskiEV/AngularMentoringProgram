import { Component } from '@angular/core';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  protected text = 'Courses TEXT';
  constructor() {
    console.log('courses-constructor');
  }
}
