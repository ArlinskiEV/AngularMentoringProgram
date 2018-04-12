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

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */

    IntroComponent,
  ],
  imports: [
    CommonModule,

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
