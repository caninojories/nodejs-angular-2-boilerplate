import {
  Routes,
  RouterModule
} from '@angular/router';
// import {
//   PreloadService
// } from '../components/index/index.preload.service';
import {
  IndexComponent
} from './../components/index/index.component';
// import {
//   CanDeactivateGuard
// } from '../shared/can.deactivate.service';

import {
  PageNotFoundComponent
} from '../components/404/page.not.found.component';

const appRoutes: Routes = [{
  path: '', component: IndexComponent
}, {
  path: '**',
  component: PageNotFoundComponent
}];

export const AppRoutingProviders: any[] = [
  // AuthProviders,
  // CanDeactivateGuard
];

export const rootRouting = RouterModule.forRoot(appRoutes);
