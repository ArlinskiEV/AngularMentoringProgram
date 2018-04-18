import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'tools',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToolbarComponent  implements OnInit {
  public ngOnInit() {
    console.log('hello `Toolbar` component');
  }
}
