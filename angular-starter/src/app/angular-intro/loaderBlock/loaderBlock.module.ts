import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderBlockComponent } from './loaderBlock.component';

console.log('`LoaderBlock` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    LoaderBlockComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoaderBlockComponent,
  ],
})
export class LoaderBlockModule {}
