import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {  LoginFormComponent  } from './loginform.component';

console.log('`loginform` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoginFormComponent,
  ],
})
export class LoginFormModule {}
