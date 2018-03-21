import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'intro',
  templateUrl: './angular-intro.component.html',
  styleUrls: ['./angular-intro.component.css']
})

export class IntroComponent  implements OnInit {
  public ngOnInit() {
    console.log('hello `INTRO` component');
  }
}
