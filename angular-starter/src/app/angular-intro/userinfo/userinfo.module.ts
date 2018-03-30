import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {  UserInfoComponent  } from './userinfo.component';

console.log('`userinfo` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UserInfoComponent,
  ],
})
export class UserInfoModule {}
