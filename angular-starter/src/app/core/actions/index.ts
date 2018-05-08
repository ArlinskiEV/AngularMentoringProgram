import { UserActionsUnion } from './user.actions';
import { CourseActionUnion } from './course.action';

export * from './user.actions';
export * from './course.action';

export type ActionsUnion =
  | UserActionsUnion
  | CourseActionUnion
  ;
