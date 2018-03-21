import { Component } from '@angular/core';

@Component({
  selector: 'cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {
  protected text = 'CourS TEXT';
  constructor() {
    console.log('cours-constructor');
  }
}
