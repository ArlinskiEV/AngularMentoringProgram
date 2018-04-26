import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { CourseModule } from '../course';
import {
  OrderByPipeModule,
  FilterPipeModule,
} from '../core/pipes';
import { ToolbarModule } from '../toolbar';

@NgModule({
  declarations: [
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    CourseModule,
    OrderByPipeModule,
    FilterPipeModule,
    ToolbarModule
  ],
  exports: [
    CoursesComponent,
  ],
})
export class CoursesModule {}
