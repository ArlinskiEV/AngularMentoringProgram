import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoursePageComponent } from './course-page.component';

import { HeaderModule } from '../header';
import { FooterModule } from '../footer';

@NgModule({
  declarations: [
    CoursePageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    HeaderModule,
    FooterModule,
  ],
  exports: [
    CoursePageComponent,
  ],
})
export class CoursePageModule {}
