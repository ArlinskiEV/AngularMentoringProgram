import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthorizationService } from '../core/services';
import { Subscription } from 'rxjs/Subscription';
import { SharedUserInfo } from '../core';

@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserInfoComponent  implements OnInit, OnDestroy {
  private user: SharedUserInfo;
  private listener: Subscription;
  constructor(
    private _authorizationService: AuthorizationService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    // because info must be actual
    this.listener = this._authorizationService.getUserInfo().subscribe(
      (payload) => {
        this.user = payload;
        this._changeDetectorRef.markForCheck();
      },
    );

  }

  public ngOnDestroy() {
    this.listener.unsubscribe();
  }

  public click() {
    this._authorizationService.logout();
  }
}
