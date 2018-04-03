import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { UserInfoModule } from '../userinfo';

console.log('`Header` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
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
