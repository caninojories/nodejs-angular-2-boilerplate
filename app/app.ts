import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {mainModule} from './main';
import {
  CONFIG
} from './shared/config';

if (CONFIG.ENV === 'PRODUCTION') {
  enableProdMode();
};

platformBrowserDynamic().bootstrapModule(mainModule);
