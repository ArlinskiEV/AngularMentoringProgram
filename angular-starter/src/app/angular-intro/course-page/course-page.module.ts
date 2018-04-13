import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoursePageComponent } from './course-page.component';
import { DateComponent } from './date.component';
import { TestComponent } from './test.component';

import { HeaderModule } from '../header';
import { FooterModule } from '../footer';

@NgModule({
  declarations: [
    CoursePageComponent,
    DateComponent,
    TestComponent,
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
