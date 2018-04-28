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
import { Router } from '@angular/router';

@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserInfoComponent  implements OnInit, OnDestroy {
  public user: SharedUserInfo;
  private listener: Subscription;
  constructor(
    private authorizationService: AuthorizationService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  public ngOnInit() {
    // because info must be actual
    this.listener = this.authorizationService.getUserInfo().subscribe(
      (user: SharedUserInfo) => {
        this.user = user;
        this.changeDetectorRef.markForCheck();
      },
    );

  }

  public ngOnDestroy() {
    this.listener.unsubscribe();
  }

  public click() {
    this.authorizationService.logout();
    // ----------------------------
    // redirect
    this.router.navigateByUrl('login');
    // ----------------------------
  }
}
