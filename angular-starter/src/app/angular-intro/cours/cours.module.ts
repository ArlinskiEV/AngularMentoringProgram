import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
  ],
  exports: [
    CoursComponent,
  ],
})
export class CoursModule {}
