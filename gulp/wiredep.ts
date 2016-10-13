import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';
import * as gulp  from '../gulp.config';

export class Wiredep {
  constructor() {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    let self = this;
    let options = gulp.config.getWireDepDefaultOptions();
    this._modules.gulp.task('wiredep', function() {
      new Logger('Wire up our js css and app.js into our html');
      return self._modules.gulp
      .src(gulp.config.index)
      .pipe(self._modules.wiredep(options))
      .pipe(self._modules.gulp.dest(gulp.config.client));
    });
  }
}
