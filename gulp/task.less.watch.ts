import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';
import * as gulp  from '../gulp.config';

export class LessWatch {
  constructor() {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    let self = this;

    this._modules.gulp.task('less-watch', _ => {
      self._modules.$.watch(gulp.config().less, (buffer) => {
        let src       = buffer['history'][0];
        let position  = buffer['history'][0].lastIndexOf('/');
        let dest      = buffer['history'][0].substr(0, position + 1);

        new Logger('Compiling Less ---> Css');

        return self._modules
        .gulp.src(src)
        .pipe(self._modules.$.less({
          plugins: [self._modules.autoprefix]
        }))
        .on('error', Errors)
        .pipe(self._modules.$.autoprefixer({ browsers: [
          'Android >= 2.3',
          'BlackBerry >= 7',
          'Chrome >= 9',
          'IE >= 8',
          'Firefox >= 4',
          'Explorer >= 9',
          'iOS >= 5',
          'Opera >= 11',
          'Safari >= 5',
          'OperaMobile >= 11',
          'OperaMini >= 6',
          'ChromeAndroid >= 9',
          'FirefoxAndroid >= 4',
          'ExplorerMobile >= 9'
        ]}))
        .on('error', Errors)
        .pipe(self._modules.gulp.dest(dest))
        .pipe(self._modules.$.csslint({
        'font-sizes': false,
        'gradients': false,
        'important': false,
        'compatible-vendor-prefixes': false,
        'unqualified-attributes': false,
        'box-model': false,
        'display-property-grouping': false,
        'adjoining-classes': false
        }))
        .on('error', Errors)
      });
    });
  }
}
