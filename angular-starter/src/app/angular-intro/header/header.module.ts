import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { LoginFormModule } from '../loginform';

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
    LoginFormModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule {}
