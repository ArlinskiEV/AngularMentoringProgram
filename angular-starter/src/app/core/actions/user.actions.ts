import { Action } from '@ngrx/store';

import { User } from '../entities';

export enum UserActionTypes {
  USER_LOGIN = '[User] USER_LOGIN',
  USER_LOGOUT = '[User] USER_LOGOUT',
}

export function userLogin(user: User) {
  return {type: UserActionTypes.USER_LOGIN, payload: user};
}

export function userLogOut() {
  return {type: UserActionTypes.USER_LOGOUT, payload: null};
}

// ------------------------------- ???????
/* tslint:disable */

export class LogIn implements Action {
  readonly type = UserActionTypes.USER_LOGIN;

  constructor(public payload: User) {}
}

export class LogOut implements Action {
  readonly type = UserActionTypes.USER_LOGOUT;
}

export type UserActionsUnion =
  | LogIn
  | LogOut;

/* tslint:enable */
