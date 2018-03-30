import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  // ChangeDetectorRef,
} from '@angular/core';
import { AuthorizationService } from '../core';

@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserInfoComponent  implements OnInit {
  constructor(
    private authorizationService: AuthorizationService,
    // private changeDetectorRef: ChangeDetectorRef,
  ) {
    console.log('UserInfoComponent constructor');
  }

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
    // this.changeDetectorRef.markForCheck();
  }
}
