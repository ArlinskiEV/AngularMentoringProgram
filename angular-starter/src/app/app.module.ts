// import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment'; // Angular CLI environemnt

import { appReducer, AppState } from './core/reducers';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizedHttpService } from './core/services';

import { ROUTES } from './app.routes';
import { APP_COMPONENTS, APP_PIPES, APP_DIRECTIVES } from './app.declarations';
import { APP_PRIVIDERS } from './app.providers';

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
    HttpClientModule,
    // --------------------------------------------------------------------
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot(ROUTES, {
      useHash: true,
      // enableTracing: true, // <- only for debugg
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizedHttpService,
      multi: true
    },
    [...APP_PRIVIDERS],
  ],
})

export class AppModule {}
