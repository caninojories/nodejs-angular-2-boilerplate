import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

/* shared */
import {
  CONFIG
} from '../config';

declare let oboe;
export class SampleApi {
  constructor() {}

  getOne(email) {
    return Observable
    .of(_ => {
      return oboe({
        url:  CONFIG.HOSTNAME + CONFIG.HOSTNAMEPORT + CONFIG.HOSTNAMEVERSION + 'sampleapi',
        method: 'GET'
      })
    })
    .delay(0)
    .do(response => response);
  }
}
