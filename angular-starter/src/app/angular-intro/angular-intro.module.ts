import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header';
import { ToolbarModule } from './toolbar';
import { CoursesModule } from './courses';
import { CourseModule } from './course';
import { FooterComponent } from './footer';

import { IntroComponent } from './angular-intro.component';

console.log('`INTRO` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */

    HeaderComponent,
    FooterComponent,

    IntroComponent,
  ],
  imports: [
    CommonModule,

    ToolbarModule,
    CoursesModule,
    CourseModule,
  ],
  exports: [
    IntroComponent
  ],
})
export class IntroModule {}
