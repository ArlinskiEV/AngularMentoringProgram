import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tools',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToolbarComponent  implements OnInit {
  constructor(private router: Router) {}
  public ngOnInit() {
    console.log('hello `Toolbar` component');
  }
  public createNewCourse() {
    this.router.navigateByUrl('courses/new');
  }
}
