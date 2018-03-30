import { Injectable } from '@angular/core';
import { User } from '../entities';

@Injectable()
export class AuthorizationService {
  private user: User = {
    id: 0,
    userName: 'NoName',
  };
  constructor() {
    console.log('### AuthorizationService constructor ###');
  }
  public login(payload: any) {// how do it right??
    // Login (stores fake user info and token to local storage)

    console.log(`name:${payload.login}, pass:${payload.password}`);
    // userId = verify(payload);
    this.user.userName = payload.login;
    this.user.id = Math.trunc(1 + Math.random() * 10);
  }
  public logout() {
    // Logout (wipes fake user info and token from local storage)
    this.user = {id: 0, userName: 'NoName', };
  }
  public isAuthenticated() {
    // IsAuthenticated (boolean)
    console.log('### AuthorizationService.isAuthenticated ###');
    return !!this.user.id;
  }
  public getUserInfo() {
    // GetUserInfo (returns user login)
    return {
      login: this.user.userName,
    };
  }

}
