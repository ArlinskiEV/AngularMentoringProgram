import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { UserInfoModule } from '../userinfo';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    UserInfoModule
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule {}
