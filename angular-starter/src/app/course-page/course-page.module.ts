import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoursePageComponent } from './course-page.component';
import { DateComponent, DateValidatorDirective } from './date';
import { DurationComponent, DurationValidatorDirective } from './duration';

@NgModule({
  declarations: [
    CoursePageComponent,
    DateComponent,
    DateValidatorDirective,
    DurationComponent,
    DurationValidatorDirective,
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
