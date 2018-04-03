import {
  Component, ChangeDetectionStrategy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorizationService } from '../core/services';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPageComponent {
  protected login: string;
  protected password: string;
  constructor(private _authorizationService: AuthorizationService) {
    console.log('login-page-constructor');
    this.login = '';
    this.password = '';
  }

  public click() {
    // console.log(`name:${this.login}, pass:${this.password}`);
    this._authorizationService.login({login: this.login, password: this.password});
  }
}
