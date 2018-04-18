// import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { RouterModule } from '@angular/router';

import { HeaderModule } from './header';
import { FooterModule } from './footer';
import { ToolbarModule } from './toolbar';
import { CoursesModule } from './courses';
import { ModalWindowModule } from './modalWindow';
import { LoginPageModule } from './login-page';
import { LoaderBlockModule } from './loaderBlock';

import { AppComponent } from './app.component';
import { CoursePageModule } from './course-page';

console.log('`APP` old `INTRO` bundle loaded asynchronously');

import {
  CourseServices,
  ModalWindowService,
  LoaderBlockService,
  SearchService,
  AuthorizationService,
  AuthorizedHttpService,
} from './core/services';

import { FilterPipe } from './core';

import { HttpModule } from '@angular/http';

// --------------------------------------------------------------------
import { RequestOptions, Http, XHRBackend } from '@angular/http';
function AuthorizedHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new AuthorizedHttpService(xhrBackend, requestOptions);
}
// --------------------------------------------------------------------

import { ROUTES } from './app.routes';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
  ],
  imports: [
    // CommonModule,
    BrowserModule,
    // --------------------------------------------------------------------
    // for providers...
    HttpModule,
    // --------------------------------------------------------------------
    HeaderModule,
    FooterModule,
    ToolbarModule,
    CoursesModule,
    ModalWindowModule,
    LoginPageModule,
    CoursePageModule,
    LoaderBlockModule,

    RouterModule.forRoot(ROUTES, {useHash: true}),
  ],
  providers: [
    // --------------------------------------------------------------------
    // {provide: 'ext-http', useClass: AuthorizedHttpService},
    { provide: Http, useFactory: AuthorizedHttpFactory, deps: [XHRBackend, RequestOptions]},
    { provide: 'Ahttp', useExisting: Http},
    // --------------------------------------------------------------------
    AuthorizationService,

    ModalWindowService,

    {provide: 'load-spinner', useClass: LoaderBlockService},
    CourseServices,

    SearchService,
    // --------------------------------------------------------------------
    FilterPipe,
    // --------------------------------------------------------------------
  ],
})

export class AppModule {}
