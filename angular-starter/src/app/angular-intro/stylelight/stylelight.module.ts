import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StylelightDirective } from './stylelight.directive';

console.log('`StyleLight` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
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
