import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';

let config = require('./../gulp.config')();

/**
 * gulp less-compile-and-minify --env=[DEV | PRODUCTION]
 * --env is optional
 * default is DEV
 */
export class LessCompileAndMinify {
  constructor() {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    let self = this;
    this._modules.gulp.task('less-compile-and-minify'/*minify using cleancss*/, _ => {

      return new Promise<any>((resolve, reject) => {
        config.less.forEach(function(file) {
          new Logger('Compiling Less ---> Css for the glob ' + file);

          self._modules
          .glob(file, {}, function (er, files) {
            let length  = files.length;
            let counter = 0;
            files.forEach(function(item) {
              let lastOccurence = item.lastIndexOf('/');
              let pathPosition  = item.substr(0, lastOccurence);
              let name          = item.substr(lastOccurence + 1, file.length);

              let position = item.lastIndexOf('/');
              let dest     = item.substr(0, position + 1);

              return self._modules.gulp.src(item)
              .pipe(self._modules.$.less({
                plugins: [self._modules.autoprefix]
              }))
              .on('error', Errors)
              .pipe(self._modules.$.autoprefixer({ browsers: [
                'Android >= 2.3',
                'BlackBerry >= 7',
                'Chrome >= 9',
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
              .pipe((self._modules.args.env === 'DEV' || !self._modules.args.env) && process.env !== 'PRODUCTION' ? self._modules.$.sourcemaps.init() : self._modules.$.cleanCss({compatibility: 'ie8'}))
              .on('error', Errors)
              .pipe(self._modules.$.rename((self._modules.args.env === 'DEV' || !self._modules.args.env) && process.env !== 'PRODUCTION' ? name.replace('less', 'css') : 'min.' + name.replace('less', 'css')))
              .pipe(self._modules.gulp.dest(dest))
              .on('end', _ => {
                counter++;

                if (length === counter) {
                  resolve();
                }
              });
            });
          })
        });
      });
    });
  }
}
