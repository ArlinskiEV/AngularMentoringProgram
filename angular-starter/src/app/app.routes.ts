import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page';
import { CoursePageComponent } from './course-page';
import { CoursesComponent } from './courses';

export const ROUTES: Routes = [
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: CoursesComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'course', component: CoursePageComponent},
];
