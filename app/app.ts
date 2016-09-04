import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {mainModule} from './main';

// enableProdMode();
platformBrowserDynamic().bootstrapModule(mainModule);
