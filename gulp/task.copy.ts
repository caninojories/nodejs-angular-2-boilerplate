import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';
import * as gulp  from '../gulp.config';

export class Copy {
  constructor() {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    this._modules
    .gulp.task('copy', _ => {
      new Logger('Running Copy');

      return this._modules.gulp
      .src(gulp.config().copy.files)
      .pipe(this._modules.gulp.dest('dist/assets/img/'))
    });
  }
}
