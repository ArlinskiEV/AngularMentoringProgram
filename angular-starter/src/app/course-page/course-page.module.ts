import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoursePageComponent } from './course-page.component';
import { DateComponent } from './date.component';
import { TestComponent } from './test.component';
import { DateValidatorDirective } from './date';

@NgModule({
  declarations: [
    CoursePageComponent,
    DateComponent,
    TestComponent,
    DateValidatorDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CoursePageComponent,
  ],
})
export class CoursePageModule {}
