import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})

export class LoginFormComponent  implements OnInit {
  public ngOnInit() {
    console.log('hello `loginform` component');
  }
}
