import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {  ToolbarComponent  } from './toolbar.component';

console.log('`Tools` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ToolbarComponent,
  ],
})
export class ToolbarModule {}
