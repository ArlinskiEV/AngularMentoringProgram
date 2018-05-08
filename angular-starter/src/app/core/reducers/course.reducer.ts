import { CourseActionUnion, CourseActionTypes } from '../actions';
import { Course } from '../entities';

export function courseReducer(state: Course[] = [], action: CourseActionUnion): Course[] {
  switch (action.type) {
    case CourseActionTypes.NEW_DATA: {
      return action.payload;
    }
    case CourseActionTypes.ADD_DATA: {
      return [...state, ...action.payload];
    }
    default: return state;
  }
}
