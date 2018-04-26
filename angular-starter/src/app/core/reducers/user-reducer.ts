import { User } from '../entities';
import { UserActionsUnion, UserActionTypes } from '../actions';
// import { Action } from '@ngrx/store';

// export function userReducer(state: User = new User(), action: Action) {
export function userReducer(state: User = new User(), action: UserActionsUnion): State {
  const change = {};

  switch (action.type) {
    case UserActionTypes.USER_LOGIN: {
      Object.assign(change, action.payload);
      break;
    }
    case UserActionTypes.USER_LOGOUT: {
      break;
    }
    default: return state;
  }

  return {...state, ...change};
}
