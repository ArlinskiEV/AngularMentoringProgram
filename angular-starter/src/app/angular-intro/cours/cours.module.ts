import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {  CoursComponent  } from './cours.component';

console.log('`CourS` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    CoursComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CoursComponent,
  ],
})
export class CoursModule {}
