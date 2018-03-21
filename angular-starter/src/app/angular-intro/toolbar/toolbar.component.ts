import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'tools',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent  implements OnInit {
  public ngOnInit() {
    console.log('hello `Detail` component');
  }
}
