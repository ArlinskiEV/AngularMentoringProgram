import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorlightDirective } from './colorlight.directive';

console.log('`ColorLight` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    ColorlightDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ColorlightDirective,
  ],
})
export class ColorlightModule {}
