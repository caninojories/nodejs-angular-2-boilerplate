import {
  NgModule,
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
import {
  TranslateModule, TranslateService, TranslateLoader, TranslateStaticLoader
} from 'ng2-translate/ng2-translate';

/* Components */
import {
  AppComponent
} from './app.component';
import {
  IndexComponent
} from '../app/components/index/index.component';
import {
  PageNotFoundComponent
} from '../app/components/404/page.not.found.component';

/* Shared */
import {
   LocalStorage
 } from './shared/local.storage.service';

 /* routing */
 import {
   rootRouting
 } from './components/root.route.component';

/*module*/
import {
  LobbyModule
} from './components/lobby/lobby.module.component';

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    FormsModule,
    rootRouting,
    LobbyModule
  ],
  exports: [TranslateModule],
  declarations: [
    AppComponent,
    IndexComponent,
    PageNotFoundComponent
  ],
  providers: [
    LocalStorage,
  ],
  bootstrap: [AppComponent]
})
export class mainModule {
}
