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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() protected owner: string;
  private listener: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  get isAuth() {
    return this.authorizationService.isAuthenticated();
  }

  public ngOnInit() {
    // because auth-info must be actual
    this.listener = this.authorizationService.getUserInfo().subscribe(
      () => this.changeDetectorRef.markForCheck(),
    );
  }

  public ngOnDestroy() {
    this.listener.unsubscribe();
  }

}
