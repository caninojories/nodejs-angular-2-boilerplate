import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';

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

      this._modules
      .runsequence(
        'settings',
        'inject',
        'wiredep',
        'less-compile-and-minify', function() {
          new Logger('Finished...');
      });
    });
  }
}
