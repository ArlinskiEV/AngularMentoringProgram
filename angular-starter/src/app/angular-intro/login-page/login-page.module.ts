import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page.component';

import { HeaderModule } from '../header';
import { FooterModule } from '../footer';

@NgModule({
  declarations: [
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
