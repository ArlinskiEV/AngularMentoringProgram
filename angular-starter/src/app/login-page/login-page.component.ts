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
  constructor(private authorizationService: AuthorizationService) {
    this.login = '';
    this.password = '';
  }

  public click() {
    this.authorizationService.login({login: this.login, password: this.password});
  }
}
