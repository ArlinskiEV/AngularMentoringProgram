import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { CoursModule } from '../cours';

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
    CoursModule,
  ],
  exports: [
    CoursesComponent,
  ],
})
export class CoursesModule {}
