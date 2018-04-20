import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { UserInfoModule } from '../userinfo';
import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
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
