import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AuthorizationService } from '../core/services';
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
  public error: string = '';
  constructor(
    private authorizationService: AuthorizationService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public submit(form: FormGroup) {
    const listener: Subscription = this.authorizationService
      .login(form.value)
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
