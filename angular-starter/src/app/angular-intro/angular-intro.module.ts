import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from './header';
import { ToolbarModule } from './toolbar';
import { CoursesModule } from './courses';
import { CourseModule } from './course';
import { FooterComponent } from './footer';
import { IntroComponent } from './angular-intro.component';
import { ModalWindowModule } from './modalWindow';

console.log('`INTRO` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */

    FooterComponent,

    IntroComponent,
  ],
  imports: [
    CommonModule,

    HeaderModule,
    ToolbarModule,
    CoursesModule,
    CourseModule,
    ModalWindowModule,
  ],
  exports: [
    IntroComponent
  ],
})
export class IntroModule {}
