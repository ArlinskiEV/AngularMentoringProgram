import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search';
import {  ToolbarComponent  } from './toolbar.component';

console.log('`Tools` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    ToolbarComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ToolbarComponent,
  ],
})
export class ToolbarModule {}
