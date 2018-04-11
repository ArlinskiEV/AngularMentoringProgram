import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from './header';
import { FooterModule } from './footer';
import { ToolbarModule } from './toolbar';
import { CoursesModule } from './courses';
import { CourseModule } from './course';
import { ModalWindowModule } from './modalWindow';
import { LoginPageModule } from './login-page';
import { LoaderBlockModule } from './loaderBlock';

import { IntroComponent } from './angular-intro.component';
import { StylelightModule } from './stylelight';
import { DurationPipeModule } from './core/pipes';
import { CoursePageModule } from './course-page';

console.log('`INTRO` bundle loaded asynchronously');

import {
  CourseServices,
  ModalWindowServices,
  AuthorizationService,
  LoaderBlockServices,
  SearchService,
  AuthorizedHttpService,
} from './core/services';
// } from './angular-intro/core/services';
// import * as INTRO_SERVICES from './angular-intro/core/services';

import { FilterPipe } from './core';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */

    IntroComponent,
  ],
  providers: [
    // --------------------------------------------------------------------
    // ...toArray(INTRO_SERVICES),
    AuthorizedHttpService,

    ModalWindowServices,
    LoaderBlockServices,

    CourseServices,

    AuthorizationService,
    SearchService,
    // --------------------------------------------------------------------
    FilterPipe,
    // --------------------------------------------------------------------
  ],
  imports: [
    CommonModule,
    // --------------------------------------------------------------------
    HttpModule,
    // --------------------------------------------------------------------
    HeaderModule,
    FooterModule,
    ToolbarModule,
    CoursesModule,
    CourseModule,
    ModalWindowModule,
    LoginPageModule,
    CoursePageModule,
    LoaderBlockModule,

    DurationPipeModule,

    // what? i foget about this, but it was worked
    StylelightModule, // need import only for itself?

  ],
  exports: [
    IntroComponent,
  ],
})
export class IntroModule {}
