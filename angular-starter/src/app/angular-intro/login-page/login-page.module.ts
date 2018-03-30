import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page.component';

import { HeaderModule } from '../header';
import { FooterModule } from '../footer';

console.log('`login-page` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    HeaderModule,
    FooterModule,
  ],
  exports: [
    LoginPageComponent,
  ],
})
export class LoginPageModule {}
