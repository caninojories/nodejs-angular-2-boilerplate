import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';

export class Prod {
  constructor() {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    this._modules
    .gulp.task('prod-compile', _ => {
      process.env.NODE_ENV = 'PRODUCTION';

      this._modules
      .runsequence(
        'settings',
        'inject',
        'wiredep',
        'uglify',
        'html-min',
        'useref',
        'less-compile-and-minify', function() {
          new Logger('Finished...');
      });
    });
  }
}
