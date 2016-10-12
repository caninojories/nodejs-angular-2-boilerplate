import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  IndexMainComponent
} from './index.main.component';
import {
  IndexComponent
} from './index.component';


export const indexRoutes: Routes = [{
  path: '',
  component: IndexMainComponent,
  children: [{
    path: '',
    data: {
      queryParams: 'children'
    },
    component: IndexComponent
  }]
}];

export const lobbyRouting: ModuleWithProviders = RouterModule.forChild(indexRoutes);
