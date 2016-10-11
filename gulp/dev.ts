import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';

let config = require('./../gulp.config')();

export class Dev {
  constructor() {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    this._modules
    .gulp.task('dev-compile', _ => {
      process.env.NODE_ENV = 'DEV';
      new Logger('Running Dev Environment');

      this._modules.gulp.start('settings', 'inject', 'wiredep', 'less-compile-and-minify');
    });
  }
}
