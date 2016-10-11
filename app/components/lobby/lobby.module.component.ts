import {
  NgModule
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
import {
  CommonModule
} from '@angular/common';
import {
  LobbyComponent
} from './lobby.component';
import {
  LobbyMainComponent
} from './lobby.main.component';
import {
  SharedModule
} from '../commons/shared.component';

import {lobbyRouting } from './lobby.routing.component';

@NgModule({
  imports: [
    SharedModule,
    lobbyRouting
  ],
  declarations: [
    LobbyComponent,
    LobbyMainComponent
  ],
  providers: []
})
export class LobbyModule {}
