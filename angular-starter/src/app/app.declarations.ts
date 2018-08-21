import { HeaderComponent, BreadcrumbsComponent, UserInfoComponent } from './header';
import { FooterComponent } from './footer';
import { ModalWindowComponent } from './modalWindow';
import { LoginPageComponent } from './login-page';
import { LoaderBlockComponent } from './loaderBlock';
import { PageNotFoundComponent } from './page-not-found';

import {
  CoursesComponent,
  CourseComponent,
  ToolbarComponent,
  SearchComponent
} from './courses';
import {
  CoursePageComponent,
  DateComponent,
  DateValidatorDirective,
  DurationComponent,
  DurationValidatorDirective,
  AuthorsComponent,
  AuthorsValidatorDirective,
  EditorComponent,
} from './course-page';

import {
  OrderByPipe,
  FilterPipe,
  DurationPipe,
  StylelightDirective
} from './core';

export const APP_COMPONENTS = [

  HeaderComponent,
  BreadcrumbsComponent,
  UserInfoComponent,

  FooterComponent,

  ModalWindowComponent,
  LoginPageComponent,
  LoaderBlockComponent,
  PageNotFoundComponent,

  CoursesComponent,
  ToolbarComponent,
  SearchComponent,
  CourseComponent,

  CoursePageComponent,
  DateComponent,
  DurationComponent,
  AuthorsComponent,

  EditorComponent,
];

export const APP_DIRECTIVES = [
  StylelightDirective,
  DateValidatorDirective,
  DurationValidatorDirective,
  AuthorsValidatorDirective,
];

export const APP_PIPES = [
  OrderByPipe,
  FilterPipe,
  DurationPipe,
];
