import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { CourseModule } from '../course';
import {
  OrderByPipeModule,
  FilterPipeModule,
} from '../core/pipes';

console.log('`Courses` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    CourseModule,
    OrderByPipeModule,
    FilterPipeModule,
  ],
  exports: [
    CoursesComponent,
  ],
})
export class CoursesModule {}
