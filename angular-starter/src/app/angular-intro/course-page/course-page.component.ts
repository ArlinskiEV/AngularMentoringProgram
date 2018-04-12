import {
  Component, ChangeDetectionStrategy,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursePageComponent {

  public click(text: string) {
    console.warn(`it was click:${text}`);
  }
  public save() {
    this.click('save');
  }
  public cancel() {
    this.click('cancel');
  }
}
