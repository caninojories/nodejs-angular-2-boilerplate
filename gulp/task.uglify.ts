import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';
import * as gulp  from '../gulp.config';

export class Uglify {
  constructor() {
    this.assetsJs();
    this.appJs();
    this.init();
  }

  private _modules = Modules.get();

  init() {
    this._modules
    .gulp.task('uglify', _ => {
      return new Promise<any>((resolve, reject) => {
        this._modules
        .runsequence(
          'uglify-assetsJs',
          'uglify-appJs', function() {
            new Logger('Finished...');
            resolve();
        });
      });
    });
  }

  assetsJs() {
    let self = this;
    this._modules
    .gulp.task('uglify-assetsJs', function () {
      gulp.config().assetsJS.files.forEach((file) => {
        new Logger('Uglifying Assets ---> JS ' + file);

        self._modules.glob(file, {}, function (er, files) {
          files.forEach(function(item) {
            if (item.indexOf('min') !== -1) {
              return;
            }

            let lastOccurence = item.lastIndexOf('/');
            let pathPosition  = item.substr(0, lastOccurence);
            let name          = item.substr(lastOccurence + 1, file.length);

            return self._modules.gulp.src(item)
            .pipe(self._modules.$.uglify({
              mangle: false,
              output: {
                bracketize: true
              },
              compressor: {
                properties: false,
                booleans: false
              }
            }))
            .pipe(self._modules.$.rename('min.' + name))
            .pipe(self._modules.gulp.dest(pathPosition));
          });
        });
      });
    });
  }

  appJs() {
    let self = this;
    this._modules
    .gulp.task('uglify-appJs', function() {

      gulp.config().assetsAppTS.forEach(function(file) {
        new Logger('Uglifying  Assets-App-TS ---> JS ' + file);

        self._modules.glob(file, {}, function (er, files) {
          files.forEach(function(item) {
            let position = item.lastIndexOf('/');
            let dest     = item.substr(0, position + 1);

            return self._modules.gulp.src(item)
            .pipe(self._modules.$.uglify({
              mangle: false,
              output: {
                bracketize: true
              },
              compressor: {
                properties: false,
                booleans: false
              }
            }))
            .on('error', Errors)
            .pipe(self._modules.gulp.dest(dest));
          });
        });
      });
    });
  }
}
