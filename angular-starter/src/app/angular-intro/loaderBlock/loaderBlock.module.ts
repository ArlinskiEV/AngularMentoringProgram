import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderBlockComponent } from './loaderBlock.component';

@NgModule({
  declarations: [
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
