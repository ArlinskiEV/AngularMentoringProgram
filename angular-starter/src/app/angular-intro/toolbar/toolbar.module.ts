import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search';
import {  ToolbarComponent  } from './toolbar.component';

@NgModule({
  declarations: [
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
