import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './footer.component';

console.log('`Footer` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    FooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FooterComponent,
  ],
})
export class FooterModule {}
