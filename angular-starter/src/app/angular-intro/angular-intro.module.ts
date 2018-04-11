import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { HeaderModule } from './header';
import { FooterModule } from './footer';
import { ToolbarModule } from './toolbar';
import { CoursesModule } from './courses';
import { ModalWindowModule } from './modalWindow';
import { LoginPageModule } from './login-page';
import { LoaderBlockModule } from './loaderBlock';

import { IntroComponent } from './angular-intro.component';
import { CoursePageModule } from './course-page';

console.log('`INTRO` bundle loaded asynchronously');

import {
  CourseServices,
  ModalWindowServices,
  LoaderBlockServices,
  SearchService,
  AuthorizationService,
  AuthorizedHttpService,
} from './core/services';

// function toArray(obj) {
//   return Object.keys(obj).map((k) => obj[k]);
// }

import { FilterPipe } from './core';

import { HttpModule } from '@angular/http';

// --------------------------------------------------------------------
import { RequestOptions, Http, XHRBackend } from '@angular/http';
function AuthorizedHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new AuthorizedHttpService(xhrBackend, requestOptions);
}
// --------------------------------------------------------------------

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */

    IntroComponent,
  ],
  imports: [
    CommonModule,
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
  ],
  exports: [
    IntroComponent,
  ],
})

export class IntroModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: IntroModule,
      providers: [
        // --------------------------------------------------------------------
        // {provide: 'ext-http', useClass: AuthorizedHttpService},
        { provide: Http, useFactory: AuthorizedHttpFactory, deps: [XHRBackend, RequestOptions]},
        { provide: 'Ahttp', useExisting: Http},
        // --------------------------------------------------------------------
        AuthorizationService,

        ModalWindowServices,

        {provide: 'load-spinner', useClass: LoaderBlockServices},
        CourseServices,

        SearchService,
        // --------------------------------------------------------------------
        FilterPipe,
        // --------------------------------------------------------------------
      ],
    };
  }
}
