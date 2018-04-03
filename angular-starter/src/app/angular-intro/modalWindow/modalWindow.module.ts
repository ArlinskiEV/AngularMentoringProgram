import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalWindowComponent } from './modalWindow.component';

console.log('`ModalWindow` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    ModalWindowComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ModalWindowComponent,
  ],
})
export class ModalWindowModule {}
