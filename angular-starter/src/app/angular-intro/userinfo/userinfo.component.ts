import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthorizationService } from '../core/services';

@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserInfoComponent  implements OnInit {
  private login = 'NoName';
  constructor(
    private _authorizationService: AuthorizationService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    // because info must be actual
    this._authorizationService.getUserInfo().subscribe(
      (payload) => {
        this.login = payload.login
            ? payload.login
            : 'NoAuth';
        this._changeDetectorRef.markForCheck();
      },
    );

  }

  public click() {
    this._authorizationService.logout();
  }
}
