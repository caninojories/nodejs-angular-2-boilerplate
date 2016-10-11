import {
  Modules
} from '../modules'

export class Logger {
  constructor(private _msg : any) {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    if(typeof(this._msg) === 'object') {
      for (let item in this._msg ) {
        if(this._msg.hasOwnProperty(item)) {
          this._modules.$.util.log(this._modules.$.util.colors.blue(this._msg[item]));
        }
      }
    } else {
      this._modules.$.util.log(this._modules.$.util.colors.blue(this._msg));
    }
  }
}
