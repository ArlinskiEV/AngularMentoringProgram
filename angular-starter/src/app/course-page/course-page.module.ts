import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoursePageComponent } from './course-page.component';
import { DateComponent, DateValidatorDirective } from './date';

@NgModule({
  declarations: [
    CoursePageComponent,
    DateComponent,
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
