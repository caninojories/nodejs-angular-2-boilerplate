import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  LobbyMainComponent
} from './lobby.main.component';
import {
  LobbyComponent
} from './lobby.component';


export const lobbyRoutes: Routes = [{
  path: 'game-lobby',
  component: LobbyMainComponent,
  children: [{
    path: '',
    data: {
      queryParams: 'children'
    },
    component: LobbyComponent
  }]
}];

export const lobbyRouting: ModuleWithProviders = RouterModule.forChild(lobbyRoutes);
