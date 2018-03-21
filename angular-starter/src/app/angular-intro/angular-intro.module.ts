import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header';
import { ToolbarModule } from './toolbar';
import { CoursesComponent } from './courses';
import { FooterComponent } from './footer';

import { IntroComponent } from './angular-intro.component';

console.log('`INTRO` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */

    HeaderComponent,
    CoursesComponent,
    FooterComponent,

    IntroComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
  ],
  exports: [
    IntroComponent
  ],
})
export class IntroModule {}
