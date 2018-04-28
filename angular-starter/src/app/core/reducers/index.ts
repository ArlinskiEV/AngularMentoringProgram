import { combineReducers, ActionReducerMap, ActionReducer } from '@ngrx/store';

import { userReducer } from './user.reducer';
import { User, Course } from '../entities';

import { ActionsUnion } from '../actions';
import { courseReducer } from './course.reducer';

export interface AppState {
  user: User;
  course: Course[];
}

export const appReducer: ActionReducerMap<AppState> = {
  user: userReducer,
  course: courseReducer,
};
