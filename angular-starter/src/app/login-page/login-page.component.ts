import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthorizationService } from '../core/services';
import 'rxjs/add/operator/finally';
import { Subscription } from 'rxjs/Subscription';

import { UserLoginModel } from '../core/entities';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPageComponent {
  public loginForm: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  public alert = {
    message: '',
    class: '',
  };

  constructor(
    private authorizationService: AuthorizationService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  public submit(form: FormGroup) {
    const listener: Subscription = this.authorizationService
      .login(form.value)
      .finally(() => listener.unsubscribe())
      .subscribe(
        (result) => {
          this.showAlert('RESULT: ' + result, 'alert-success');
          // ----------------------------
          // redirect
          this.router.navigateByUrl('courses');
          // ----------------------------
        },
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
