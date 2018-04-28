// import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment'; // Angular CLI environemnt

import { appReducer, AppState } from './core/reducers';

import {
  CourseService,
  ModalWindowService,
  LoaderBlockService,
  SearchService,
  AuthorizationService,
  AuthorizedHttpService,
  BreadcrumbsService,
  CanActivateGuard,
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
import { APP_COMPONENTS, APP_PIPES, APP_DIRECTIVES } from './app.declarations';

import { appInitialState } from './core/mocks';
import { ActionsUnion } from './core/actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    [...APP_COMPONENTS],
    [...APP_PIPES],
    [...APP_DIRECTIVES],
    AppComponent,
  ],
  imports: [
    // CommonModule,
    BrowserModule,
    StoreModule.forRoot(appReducer),
    // StoreModule.forRoot(appReducer, { initialState: appInitialState }),

    // StoreDevtoolsModule.instrumentOnlyWithExtension({
    //   maxAge: 25, // Retains last 25 states
    //   // logOnly: environment.production, // Restrict extension to log-only mode
    // }),
    // --------------------------------------------------------------------
    // for providers...
    HttpModule,
    // --------------------------------------------------------------------
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot(ROUTES, {
      useHash: true,
      // enableTracing: true, // <- only for debugg
    }),
  ],
  providers: [
    // --------------------------------------------------------------------
    // {provide: 'ext-http', useClass: AuthorizedHttpService},
    { provide: Http, useFactory: AuthorizedHttpFactory, deps: [XHRBackend, RequestOptions]},
    { provide: 'Ahttp', useExisting: Http},
    // --------------------------------------------------------------------
    BreadcrumbsService,
    ModalWindowService,
    {provide: 'load-spinner', useClass: LoaderBlockService},
    SearchService,

    AuthorizationService,
    CanActivateGuard,

    CourseService,

    // --------------------------------------------------------------------
    FilterPipe,
    // --------------------------------------------------------------------
  ],
})

export class AppModule {}
