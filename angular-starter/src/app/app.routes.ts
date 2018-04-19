import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page';
import { CoursePageComponent } from './course-page';
import { CoursesComponent } from './courses';
import { PageNotFoundComponent } from './page-not-found';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
  {path: 'courses', component: CoursesComponent},
  {path: 'courses/new', component: CoursePageComponent, data: {new: true}},
  {path: 'courses/:id', component: CoursePageComponent},

  {path: 'login', component: LoginPageComponent, data: { title: 'LoginPage' }},

  {path: '**', component: PageNotFoundComponent},
];
