import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

/* shared */
import {
  CONFIG
} from './config';

declare let oboe;
export class PropertyFinderApi {
  constructor() {}

  getOne() {
    return Observable
    .of((response ?: any) => {
      return oboe({
        url:  'https://www.propertyfinder.ae/en/find-broker/ajax/search?page=1',
        method: 'GET'
      })
    })
    .delay(0)
    .do(response => response);
  }
}
