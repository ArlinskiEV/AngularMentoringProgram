import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseComponent } from './course.component';
import { ColorlightModule } from '../colorlight';

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
    ColorlightModule,
  ],
  exports: [
    CourseComponent,
  ],
})
export class CourseModule {}
