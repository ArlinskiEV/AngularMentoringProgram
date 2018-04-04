import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseComponent } from './course.component';
import { StylelightModule } from '../stylelight';
import { DurationPipeModule } from '../durationPipe';

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
    StylelightModule,
    DurationPipeModule
  ],
  exports: [
    CourseComponent,
  ],
})
export class CourseModule {}
