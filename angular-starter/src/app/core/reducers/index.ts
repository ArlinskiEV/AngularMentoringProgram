import { combineReducers, ActionReducerMap, ActionReducer } from '@ngrx/store';

import { userReducer } from './user-reducer';
import { User } from '../entities';

import { ActionsUnion } from '../actions';

export interface AppState {
  user: User;
  // authenticated: User,
  // selected: User,
  // list: User[],
  // search: string
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer
  // authenticated: authenticatedUserReducer,
  // selected: selectedUserReducer,
  // list: userListReducer,
  // search: userSearchReducer
};

// const reducer = combineReducers(reducers);
// export function appReducer(state: AppState, action: ActionsUnion) {
//   return reducer(state, action);
// }

export { reducers as appReducer };
