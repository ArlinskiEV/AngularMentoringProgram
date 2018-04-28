import { Action } from '@ngrx/store';
import { Course } from '../entities';

export enum CourseActionTypes {
  NEW_DATA = '[Course] NEW_DATA',
  ADD_DATA = '[Course] ADD_DATA'
}

/* tslint:disable:max-classes-per-file */

export class NewData implements Action {
  public readonly type = CourseActionTypes.NEW_DATA;
  constructor(public payload: Course[]) {}
}

export class AddData implements Action {
  public readonly type = CourseActionTypes.ADD_DATA;
  constructor(public payload: Course[]) {}
}

/* tslint:enable */

export type CourseActionUnion =
  | NewData
  | AddData
  ;
