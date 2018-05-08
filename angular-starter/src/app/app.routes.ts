import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page';
import { CoursePageComponent } from './course-page';
import { CoursesComponent } from './courses';
import { PageNotFoundComponent } from './page-not-found';
import { CanActivateGuard } from './core';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: 'courses/new',
    component: CoursePageComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: 'courses/:id',
    component: CoursePageComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'LoginPage' }
  },
  {
    path: 'notfound',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'notfound'
  },
];
