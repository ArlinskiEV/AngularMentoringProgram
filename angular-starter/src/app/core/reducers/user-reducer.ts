import { State } from '@ngrx/store';
import { User } from '../entities';
import { UserActionsUnion, UserActionTypes } from '../actions';

export function userReducer(state: User = new User(), action: UserActionsUnion): User {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN: {
      return action.payload;
    }
    case UserActionTypes.USER_LOGOUT: {
      return new User();
    }
    default: return state;
  }
}
