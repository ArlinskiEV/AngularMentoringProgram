import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalWindowComponent } from './modalWindow.component';

@NgModule({
  declarations: [
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
