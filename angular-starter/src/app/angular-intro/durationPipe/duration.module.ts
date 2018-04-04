import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DurationPipe } from './duration.pipe';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    DurationPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DurationPipe,
  ],
})
export class DurationPipeModule {}
