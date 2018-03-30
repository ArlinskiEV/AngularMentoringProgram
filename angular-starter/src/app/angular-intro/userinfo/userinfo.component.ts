import {
  Component,
  OnInit,
} from '@angular/core';
import { AuthorizationService } from '../core';

@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})

export class UserInfoComponent  implements OnInit {
  constructor(private authorizationService: AuthorizationService) {}

  public ngOnInit() {
    console.log('hello `userinfo` component');
  }
  get login() {
    return this.authorizationService.isAuthenticated
      ? this.authorizationService.getUserInfo().login
      : 'NoAuth';
  }
  public click() {
    this.authorizationService.logout();
  }
}
