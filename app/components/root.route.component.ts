import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  IndexComponent
} from './../components/index/index.component';
import {
  PageNotFoundComponent
} from '../components/404/page.not.found.component';

const appRoutes: Routes = [{
  path: '**',
  component: PageNotFoundComponent
}];

export const rootRouting = RouterModule.forRoot(appRoutes);
