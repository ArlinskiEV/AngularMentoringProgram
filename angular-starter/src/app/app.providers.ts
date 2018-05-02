import {
  BreadcrumbsService,
  ModalWindowService,
  LoaderBlockService,
  SearchService,
  AuthorizationService,
  CanActivateGuard,
  CourseService,
  FilterPipe
} from './core';
export const APP_PRIVIDERS = [
  // --------------------------------------------------------------------
  BreadcrumbsService,
  ModalWindowService,
  {provide: 'load-spinner', useClass: LoaderBlockService},
  SearchService,

  AuthorizationService,
  CanActivateGuard,

  CourseService,

  // --------------------------------------------------------------------
  FilterPipe,
  // --------------------------------------------------------------------
];
