import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';

let config = require('./../gulp.config')();

export class Prod {
  constructor() {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    this._modules
    .gulp.task('prod-compile', _ => {
      process.env.NODE_ENV = 'PRODUCTION';
      new Logger('Running Prod Environment');

      this._modules
      .runsequence(
        'settings',
        'uglify', function() {
          new Logger('Finished...');
      });

      // this._modules.gulp.start('settings', 'inject', 'wiredep', 'less-compile-and-minify', 'uglify', 'html-min', 'useref');
    });
  }
}
