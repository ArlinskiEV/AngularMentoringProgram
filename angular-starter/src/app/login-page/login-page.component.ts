import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AuthorizationService } from '../core/services';
import 'rxjs/add/operator/finally';
import { Subscription } from 'rxjs/Subscription';

import { UserLoginModel } from '../core/entities';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPageComponent {
  public model: UserLoginModel = {
    login: '',
    password: ''
  };
  public alert = {
    message: '',
    class: '',
  };

  constructor(
    private authorizationService: AuthorizationService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public submit(form: FormGroup) {
    const listener: Subscription = this.authorizationService
      .login(form.value)
      .finally(() => listener.unsubscribe())
      .subscribe(
        (result) => this.showAlert('RESULT: ' + result, 'alert-success'),
        (error) => this.showAlert('ERROR: ' + error, 'alert-danger')
      )
    ;
  }

  private showAlert(message: string, alertClass: string) {
    this.alert.message = message;
    this.alert.class = alertClass;
    this.changeDetectorRef.markForCheck();
  }
}
