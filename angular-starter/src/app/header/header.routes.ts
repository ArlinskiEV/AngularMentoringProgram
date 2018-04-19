import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

const routes: Routes = [
  { path: '', component: HeaderComponent, data: {showBreadCrumbs: true} },
  { path: 'login', component: HeaderComponent, data: {showBreadCrumbs: false} },
];

export const Routing = RouterModule.forChild(routes);
