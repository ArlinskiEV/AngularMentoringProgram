import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {
  private userId = 0;
  constructor() {
    console.log('### AuthorizationService constructor ###');
  }
  public login() {
    // Login (stores fake user info and token to local storage)
  }
  public logout() {
    // Logout (wipes fake user info and token from local storage)
  }
  public isAuthenticated() {
    // IsAuthenticated (boolean)
    console.log('### AuthorizationService.isAuthenticated ###');
    return !!this.userId;
  }
  public getUserInfo() {
    // GetUserInfo (returns user login)
  }

}
