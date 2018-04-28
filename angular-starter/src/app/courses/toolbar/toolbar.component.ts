import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tools',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToolbarComponent {
  constructor(private router: Router) {}

  public createNewCourse() {
    this.router.navigateByUrl('courses/new');
  }
}
