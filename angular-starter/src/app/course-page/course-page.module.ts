import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoursePageComponent } from './course-page.component';
import { DateComponent, DateValidatorDirective } from './date';
import { DurationComponent, DurationValidatorDirective } from './duration';
import { AuthorsComponent, AuthorsValidatorDirective } from './authors';

@NgModule({
  declarations: [
    CoursePageComponent,

    DateComponent,
    DateValidatorDirective,

    DurationComponent,
    DurationValidatorDirective,

    AuthorsComponent,
    AuthorsValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CoursePageComponent,
  ],
})
export class CoursePageModule {}
