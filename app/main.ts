import {
  NgModule
} from '@angular/core';
import {
  RouterOutlet
} from '@angular/router';
import {
  Http
} from '@angular/http';
import {
  BrowserModule
}  from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms';

/* Components */
import {
  AppComponent
} from './app.component';
import {
  PageNotFoundComponent
} from '../app/components/404/page.not.found.component';
import {
  SharedModule
} from '../app/components/commons/shared.component';

/* Shared */
import {
   LocalStorage
 } from './shared/local.storage.service';

 /* routing */
 import {
   rootRouting
 } from './components/root.route.component';


/* module */
import {
  IndexModule
} from './components/index/index.module.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    rootRouting,
    IndexModule
  ],
  exports: [],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [
    LocalStorage,
  ],
  bootstrap: [AppComponent]
})
export class mainModule {}
