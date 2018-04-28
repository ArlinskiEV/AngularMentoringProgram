import { Action } from '@ngrx/store';

import { User } from '../entities';

export enum UserActionTypes {
  LOGIN = '[User] USER_LOGIN',
  LOGOUT = '[User] USER_LOGOUT',
}

/* tslint:disable:max-classes-per-file */

export class LogIn implements Action {
  public readonly type = UserActionTypes.LOGIN;
  constructor(public payload: User) {}
}

export class LogOut implements Action {
  public readonly type = UserActionTypes.LOGOUT;
}

/* tslint:enable */

export type UserActionsUnion =
  | LogIn
  | LogOut
  ;
