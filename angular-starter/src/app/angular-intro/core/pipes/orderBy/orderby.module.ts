import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrderByPipe } from './orderby.pipe';

@NgModule({
  declarations: [
    OrderByPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    OrderByPipe,
  ],
})
export class OrderByPipeModule {}
