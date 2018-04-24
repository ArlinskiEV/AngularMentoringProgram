import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorizationService } from '../core/services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPageComponent {
  public login: string = '';
  public password: string = '';
  public error: string = '';
  constructor(
    private authorizationService: AuthorizationService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public click() {
    const listener: Subscription = this.authorizationService
      .login({login: this.login, password: this.password})
      .subscribe(
        (error) => {
          this.error = error;
          this.changeDetectorRef.markForCheck();
        },
        null,
        () => listener.unsubscribe()
      )
    ;
  }
}
