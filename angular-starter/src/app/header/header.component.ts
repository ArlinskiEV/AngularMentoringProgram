import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthorizationService } from '../core/services';
import { Subscription } from 'rxjs/Subscription';
import { LoginPageComponent } from '../login-page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  private showBreadCrumbs: boolean = true;
  private listener: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  get isAuth() {
    return this.authorizationService.isAuthenticated();
  }

  public ngOnInit() {
    // because auth-info must be actual
    this.listener = this.authorizationService.getUserInfo().subscribe(
      () => this.changeDetectorRef.markForCheck(),
    );

    console.error(this.route);
    // ???
    // setTimeout(() =>
    // this.showBreadCrumbs = this.route.firstChild.component.name === 'LoginPageComponent', 1000);
  }

  public ngOnDestroy() {
    this.listener.unsubscribe();
  }

}
