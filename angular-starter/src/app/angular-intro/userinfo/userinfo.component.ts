import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})

export class UserInfoComponent  implements OnInit {
  public ngOnInit() {
    console.log('hello `userinfo` component');
  }
}
