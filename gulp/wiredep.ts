import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';

let config = require('./../gulp.config')();
export class Wiredep {
  constructor() {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    let self = this;
    let options = config.getWireDepDefaultOptions();
    this._modules.gulp.task('wiredep', function() {
      new Logger('Wire up our js css and app.js into our html');
      return self._modules.gulp
      .src(config.index)
      .pipe(self._modules.wiredep(options))
      .pipe(self._modules.gulp.dest(config.client));
    });
  }
}
