import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StylelightDirective } from './stylelight.directive';

@NgModule({
  declarations: [
    StylelightDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    StylelightDirective,
  ],
})
export class StylelightModule {}
