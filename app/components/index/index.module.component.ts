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
  IndexMainComponent
} from './index.main.component';
import {
  IndexComponent
} from './index.component';
import {
  SharedModule
} from '../commons/shared.component';

import {lobbyRouting } from './index.routing.component';

@NgModule({
  imports: [
    SharedModule,
    lobbyRouting
  ],
  declarations: [
    IndexMainComponent,
    IndexComponent
  ],
  providers: []
})
export class IndexModule {}
