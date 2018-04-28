import { User } from '../entities';
import { UserActionsUnion, UserActionTypes } from '../actions';
import { State } from '@ngrx/store';

export function userReducer(state: User = new User(), action: UserActionsUnion): User {
  const change = {};

  console.log(`userReducer: state:${JSON.stringify(state)}`);
  console.log(`action: ${action.type}`);
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
