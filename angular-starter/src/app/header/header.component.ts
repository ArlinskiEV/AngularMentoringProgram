import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
// import { Router, RouterState, ActivatedRoute } from '@angular/router';

import { AuthorizationService } from '../core/services';
import { Subscription } from 'rxjs/Subscription';
import { LoginPageComponent } from '../login-page';
import { Router, Event, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  private showBreadCrumbs: boolean = true;
  private listeners: Subscription[] = [];
  constructor(
    private authorizationService: AuthorizationService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  get isAuth() {
    return this.authorizationService.isAuthenticated();
  }

  public ngOnInit() {
    // because auth-info must be actual
    this.listeners.push(
      this.authorizationService.getUserInfo().subscribe(
        () => this.changeDetectorRef.markForCheck(),
      )
    );

    // --------------------------------------------------------
    // show/don't breadcrumbs
    this.listeners.push(
      this.router.events
        .filter((e: Event) => e instanceof NavigationEnd)
        .subscribe(
          (e: Event) => {
            const t = this.router.routerState.root.firstChild;
            const t2: any = t.component;
            // this.showBreadCrumbs = !(t2 instanceof LoginPageComponent);
            this.showBreadCrumbs = !(t2 &&
              t2.name === 'LoginPageComponent');
          },
        )
    );
    // --------------------------------------------------------
  }

  public ngOnDestroy() {
    this.listeners.forEach((item) => item.unsubscribe());
  }

}
