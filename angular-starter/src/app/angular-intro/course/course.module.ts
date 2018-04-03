import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseComponent } from './course.component';
import { StylelightModule } from '../stylelight';

console.log('`CoursE` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    CourseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StylelightModule
  ],
  exports: [
    CourseComponent,
  ],
})
export class CourseModule {}
