import { ActionReducer, combineReducers } from '@ngrx/store';

// import { authenticatedUserReducer } from './authenticatedUser.reducer';
// import { selectedUserReducer } from './selectedUser.reducer';
// import { userListReducer } from './userList.reducer';
// import { userSearchReducer } from './userSearch.reducer';

import { userReducer } from './user-reducer';
import { User } from '../entities';

import { ActionsUnion } from '../actions';

const reducers = {
  user: userReducer
  // authenticated: authenticatedUserReducer,
  // selected: selectedUserReducer,
  // list: userListReducer,
  // search: userSearchReducer
};

export interface AppState {
  user: User;
  // authenticated: User,
  // selected: User,
  // list: User[],
  // search: string
}

// const reducer: ActionReducer<AppState> = combineReducers(reducers);
const reducer = combineReducers(reducers);

export function appReducer(state: AppState, action: ActionsUnion) {
  return reducer(state, action);
}
